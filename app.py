from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import json
from groq import Groq
from dotenv import load_dotenv

# ================= SETUP =================
load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Load OpenCV face detector
FACE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# ================= HUMAN FACE CHECK =================
def is_human_face(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return False

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = FACE_CASCADE.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5,
        minSize=(60, 60)
    )

    return len(faces) > 0


# ================= SKIN TONE DETECTION =================
def detect_skin_tone(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return "Medium"

    img = cv2.resize(img, (300, 300))
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_skin = np.array([0, 20, 60], dtype=np.uint8)
    upper_skin = np.array([25, 180, 255], dtype=np.uint8)

    mask = cv2.inRange(hsv, lower_skin, upper_skin)

    v_channel = hsv[:, :, 2]
    skin_pixels = v_channel[mask > 0]

    if len(skin_pixels) < 80:
        return "Medium"

    avg_brightness = np.mean(skin_pixels)

    if avg_brightness > 170:
        return "Light"
    elif avg_brightness > 120:
        return "Medium"
    else:
        return "Dark"


# ================= AI RECOMMENDATION =================
def ai_recommendation(skin, gender, body_type, season):
    prompt = f"""
You are a professional fashion stylist.

Skin Tone: {skin}
Gender: {gender}
Body Type: {body_type}
Season: {season}

Return ONLY valid JSON with this EXACT structure:
{{
  "recommended_colors": ["Color1", "Color2", "Color3"],
  "fashion_tips": ["Tip 1", "Tip 2", "Tip 3"],
  "recommendation": {{
    "shirts": "Specific suggestion",
    "bottoms": "Specific suggestion",
    "footwear": "Specific suggestion",
    "accessories": "Specific suggestion",
    "hairstyle": "Specific suggestion"
  }}
}}
No explanations. No markdown.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=400,
        temperature=0.4
    )

    return response.choices[0].message.content


# ================= ROUTES =================
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify({
            "invalid": True,
            "message": "No image uploaded"
        })

    image = request.files["image"]
    gender = request.form.get("gender", "Male")
    body_type = request.form.get("body_type", "Average")
    season = request.form.get("season", "All")

    path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(path)

    if not is_human_face(path):
        return jsonify({
            "invalid": True,
            "message": "Invalid photo. Please upload a clear human face photo."
        })

    skin_tone = detect_skin_tone(path)
    face_shape = "Oval"

    try:
        ai_response = ai_recommendation(
            skin_tone,
            gender,
            body_type,
            season
        )

        if "```json" in ai_response:
            ai_response = ai_response.split("```json")[1].split("```")[0].strip()
        elif "```" in ai_response:
            ai_response = ai_response.split("```")[1].strip()

        data = json.loads(ai_response)

        recommendation = data.get("recommendation", {})
        recommended_colors = data.get("recommended_colors", ["Neutral", "Black", "White"])
        fashion_tips = data.get("fashion_tips", ["Wear what makes you comfortable."])

    except Exception as e:
        print(f"AI Error: {e}")
        recommendation = {
            "shirts": "Neutral tones suitable for your body type",
            "bottoms": "Well-fitted jeans or trousers",
            "footwear": "Comfortable everyday shoes",
            "accessories": "Minimal accessories",
            "hairstyle": "Clean and natural style"
        }
        recommended_colors = ["Navy", "Grey", "White"]
        fashion_tips = ["Focus on fit and comfort.", "Experiment with layers."]

    return jsonify({
        "invalid": False,
        "gender": gender.capitalize(),
        "skin_tone": skin_tone,
        "face_shape": face_shape,
        "body_type": body_type,
        "season": season,
        "recommended_colors": recommended_colors,
        "fashion_tips": fashion_tips,
        "recommendation": recommendation
    })


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)