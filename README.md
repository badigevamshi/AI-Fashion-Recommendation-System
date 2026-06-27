# 👗 AI Fashion Recommendation System

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-black?style=for-the-badge&logo=flask)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green?style=for-the-badge&logo=opencv)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **AI-powered Fashion Recommendation Web Application built using Flask, OpenCV, and Groq Llama 3.3. It analyzes user images, generates personalized outfit recommendations, and provides direct shopping integration with Amazon, Myntra, and Flipkart.**

---

# 📑 Table of Contents

- Overview
- Features
- Shopping Platform Integration
- Project Screenshots
- System Workflow
- Tech Stack
- Project Structure
- Installation
- Future Enhancements
- Key Highlights
- Contributing
- Author
- License

---

# 📖 Overview

The **AI Fashion Recommendation System** is an intelligent web application that combines **Computer Vision**, **Artificial Intelligence**, and **Large Language Models (LLMs)** to provide personalized fashion recommendations.

Users simply upload a photo, choose their preferences, and the system analyzes:

- 🎨 Skin Tone
- 👤 Gender
- 👕 Body Type
- 🌦 Preferred Season

Using **Groq Llama 3.3**, the application generates intelligent fashion recommendations including:

- 👕 Shirts
- 👖 Bottom Wear
- 👟 Footwear
- ⌚ Accessories
- 💇 Hairstyles

After the recommendations are generated, users can instantly browse similar products on **Amazon**, **Myntra**, and **Flipkart**.

---

# ✨ Features

- 📸 Upload user image
- 🤖 AI-powered fashion recommendations
- 👤 Human face verification
- 🎨 Automatic skin tone detection
- 👕 Personalized outfit suggestions
- 👟 Footwear recommendations
- ⌚ Accessories recommendations
- 💇 Hairstyle suggestions
- 🌦 Season-based fashion recommendations
- 🛍 Shopping integration
- ⚡ Beautiful animations
- 🎨 Modern Glassmorphism UI
- 📱 Responsive design
- 🚀 Fast AI responses using Groq API

---

# 🛍 Shopping Platform Integration

The application allows users to instantly browse similar fashion products on their preferred shopping platform.

| Platform | Description |
|----------|-------------|
| 🛒 Amazon | Browse a wide range of fashion products |
| 👗 Myntra | Explore trending branded fashion |
| 🛍 Flipkart | Browse affordable clothing collections |

The application automatically redirects users to the selected shopping platform with relevant fashion search results.

---
# 📸 Project Screenshots

## 🏠 Home Page

The modern landing page introduces the AI Fashion Recommendation System with a clean Glassmorphism-inspired interface.

![Home Page](assets/home-page.png)

---

## 📤 Upload Image

Users can upload their image and choose preferences such as gender, body type, and preferred season.

![Upload Page](assets/upload-page.png)

---

## 🤖 AI Fashion Analysis

The AI analyzes the uploaded image and generates personalized fashion recommendations based on skin tone, body type, and season.

![Style Analysis](assets/style-analysis.png)

---

## 🛒 Shopping Platform Selection

After receiving recommendations, users can choose their preferred shopping platform.

Supported platforms:

- 🛒 Amazon
- 👗 Myntra
- 🛍 Flipkart

![Shopping Platforms](assets/shopping-platforms.png)

---

## 🛒 Amazon Search Results

Users are redirected to Amazon with relevant fashion search results.

![Amazon Results](assets/amazon-results.png)

---

## 👗 Myntra Search Results

Users can explore trending fashion products directly on Myntra.

![Myntra Results](assets/myntra-results.png)

---

## 🛍 Flipkart Search Results

Users can browse affordable fashion collections on Flipkart.

![Flipkart Results](assets/flipkart-results.png)

---

# 🔄 System Workflow

```text
                User Uploads Image
                        │
                        ▼
         Human Face Detection (OpenCV)
                        │
                        ▼
            Skin Tone Detection
                        │
                        ▼
        User Preference Selection
     (Gender • Body Type • Season)
                        │
                        ▼
          Groq Llama 3.3 AI Model
                        │
                        ▼
   Personalized Fashion Recommendations
                        │
                        ▼
        Display Outfit Suggestions
                        │
                        ▼
  Redirect to Amazon / Myntra / Flipkart
```

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python
- Flask
- Flask-CORS

## Artificial Intelligence

- Groq API
- Llama 3.3 70B
- OpenCV
- NumPy

## Other Libraries

- python-dotenv

---

# 📂 Project Structure

```text
AI-Fashion-Recommendation-System
│
├── app.py
├── requirements.txt
├── runtime.txt
├── Procfile
├── README.md
├── .gitignore
│
├── assets
│   ├── home-page.png
│   ├── upload-page.png
│   ├── style-analysis.png
│   ├── shopping-platforms.png
│   ├── amazon-results.png
│   ├── myntra-results.png
│   └── flipkart-results.png
│
├── static
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── script.js
│   ├── images
│   ├── dresses
│   └── uploads
│
└── templates
    └── index.html
```

---
# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/badigevamshi/AI-Fashion-Recommendation-System.git
```

Move into the project directory:

```bash
cd AI-Fashion-Recommendation-System
```

---

## 2️⃣ Create a Virtual Environment (Recommended)

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the project root directory.

```env
GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual Groq API key.

---

## 5️⃣ Run the Application

```bash
python app.py
```

---

## 6️⃣ Open Your Browser

Visit:

```
http://127.0.0.1:5000
```

Your AI Fashion Recommendation System is now ready to use.

---

# 🚀 Future Enhancements

- 👔 AI Face Shape Detection
- 🧍 AI Body Shape Detection
- 👕 Virtual Try-On
- 🧥 AI Outfit Generation
- ❤️ Save Favorite Outfits
- 📈 AI Fashion Trend Prediction
- 📦 Personal Wardrobe Management
- 📱 Android & iOS Mobile Application
- 🌍 Multi-language Support
- 🎙️ Voice-Based Fashion Assistant

---

# 🎯 Key Highlights

- ✅ Human Face Verification
- ✅ AI-Powered Fashion Recommendations
- ✅ Computer Vision Integration
- ✅ Skin Tone Analysis
- ✅ Personalized Outfit Suggestions
- ✅ Shopping Platform Integration
- ✅ Responsive Web Design
- ✅ Modern Glassmorphism UI
- ✅ Interactive User Experience
- ✅ Fast AI Responses using Groq Llama 3.3

---

# 💡 Use Cases

- 👔 Personal Styling Assistant
- 🛍 Online Fashion Shopping
- 👗 Outfit Inspiration
- 🎓 AI & Computer Vision Learning Project
- 💼 Portfolio Project for Students & Developers

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 👨‍💻 Author

## **B. Vamshi**

**B.Tech – Computer Science (Data Science)**

📧 Email: your-email@example.com

🔗 GitHub: https://github.com/badigevamshi

🔗 LinkedIn: https://www.linkedin.com/in/vamshi-badige

---

# 📄 License

This project is intended for educational, learning, and portfolio purposes.

---

# 🙏 Acknowledgements

Special thanks to the following technologies that made this project possible:

- Groq API
- Llama 3.3
- OpenCV
- Flask
- NumPy
- Python
- HTML5
- CSS3
- JavaScript

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

<p align="center">
Made with ❤️ by <b>B. Vamshi</b>
</p>