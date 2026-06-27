/* ================= HERO ANIMATIONS ================= */
// Typewriter Effect
const heroHeading = document.getElementById('hero-heading');
const text = 'Your Personal AI Fashion Stylist';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        heroHeading.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typewriter on load
if (heroHeading) {
    typeWriter();
}

// Floating Particles
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 107, 157, ${Math.random() * 0.5 + 0.3})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ================= FORM ELEMENTS ================= */
const form = document.getElementById("styleForm")
const imageInput = document.getElementById("imageUpload")
const dropArea = document.getElementById("uploadArea")

const getStartedBtn = document.getElementById("startStylingBtn")
const homeLink = document.getElementById("homeLink")
const tryLink = document.getElementById("tryLink")

const homeSection = document.getElementById("home")
const trySection = document.getElementById("try")

const result = document.getElementById("result")
const styleOptions = document.getElementById("styleOptions")

let detectedGender = ""

/* ================= NAVIGATION ================= */
getStartedBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    trySection.classList.remove("hidden")
    trySection.scrollIntoView({ behavior: "smooth" })
})

homeLink?.addEventListener("click", e => {
    e.preventDefault()
    homeSection.scrollIntoView({ behavior: "smooth" })
})

tryLink?.addEventListener("click", e => {
    e.preventDefault()
    trySection.classList.remove("hidden")
    trySection.scrollIntoView({ behavior: "smooth" })
})

/* ================= DRAG & DROP & CLICK ================= */
dropArea?.addEventListener("click", () => imageInput.click())

dropArea?.addEventListener("dragover", e => {
    e.preventDefault()
    dropArea.classList.add("dragover")
})

dropArea?.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover")
})

dropArea?.addEventListener("drop", e => {
    e.preventDefault()
    dropArea.classList.remove("dragover")
    if (e.dataTransfer.files.length > 0) {
        imageInput.files = e.dataTransfer.files
        showImagePreview(e.dataTransfer.files[0])
    }
})

/* ================= IMAGE PREVIEW ================= */
function showImagePreview(file) {
    const preview = document.getElementById('imagePreview');
    const container = document.getElementById('imagePreviewContainer');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            container.classList.add('show');
        }
        reader.readAsDataURL(file);
    }
}

imageInput?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        showImagePreview(e.target.files[0]);
    }
});

/* ================= LOADING PROGRESS ================= */
function simulateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 95) progress = 95;

        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';

        if (progress >= 95) {
            clearInterval(interval);
        }
    }, 300);

    return interval;
}

function completeProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = '100%';
    progressText.textContent = '100%';
}

/* ================= FORM SUBMIT (with progress animation) ================= */
form?.addEventListener("submit", async e => {
    e.preventDefault()

    if (!imageInput.files.length) {
        alert("Please upload a photo")
        return
    }

    styleOptions.classList.add("hidden")
    result.classList.remove("hidden")

    // Show loading animation
    result.innerHTML = `
        <div class="loading-animation">
            <div class="brain-scanner">
                <div class="brain-icon">🧠</div>
                <div class="scan-line"></div>
            </div>
            <h3>Analyzing Your Style...</h3>
            <div class="progress-bar-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>
            <p class="progress-text" id="progressText">0%</p>
        </div>
    `;

    const progressInterval = simulateProgress();

    // Update global detectedGender
    detectedGender = document.querySelector("input[name='gender']:checked").value.toLowerCase()
    const bodyType = document.querySelector("input[name='body_type']:checked")?.value || "average"
    const season = document.querySelector("input[name='season']:checked")?.value || "summer"

    const formData = new FormData()
    formData.append("image", imageInput.files[0])
    formData.append("gender", detectedGender)
    formData.append("body_type", bodyType)
    formData.append("season", season)

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        clearInterval(progressInterval);
        completeProgress();

        // Wait a moment to show 100%
        await new Promise(resolve => setTimeout(resolve, 500));

        if (data.error) {
            result.innerHTML = `<p style="color:red">Error: ${data.error}</p>`
            return
        }


        // Display Result
        result.innerHTML = `
            <div class="analysis-header" style="text-align: center;">
                <h3 class="gradient-text">✨ Style Analysis Complete</h3>
            </div>

            
            <div class="tag-row">
                <span class="tag-label">Skin Tone</span>
                <span class="tag-value">${data.skin_tone}</span>
            </div>
            <div class="tag-row">
                <span class="tag-label">Body Type</span>
                <span class="tag-value">${data.body_type}</span>
            </div>
            <div class="tag-row">
                <span class="tag-label">Season</span>
                <span class="tag-value">${data.season}</span>
            </div>

            <div class="recommendation-box">
                ${Object.entries(data.recommendation).map(([key, val]) => {
            const icon = {
                shirts: '👕', bottoms: '👖', footwear: '👟',
                accessories: '🕶', hairstyle: '💇'
            }[key] || '✨';
            const title = key.charAt(0).toUpperCase() + key.slice(1);

            return `
                        <div class="rec-item tilt-card">
                            <div class="tilt-content">
                                <h4>${icon} ${title}</h4>
                                <p>${val}</p>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `

        // Trigger animations
        setTimeout(() => {
            // Stagger animations
            const tagRows = result.querySelectorAll('.tag-row');
            tagRows.forEach(row => row.classList.add('animate-in'));

            const recItems = result.querySelectorAll('.rec-item');
            recItems.forEach(item => {
                item.classList.add('animate-in');
                initTilt(item); // Initialize tilt on each card
            });
        }, 100);

        // Show Style Options
        styleOptions.classList.remove("hidden")
        styleOptions.scrollIntoView({ behavior: "smooth", block: "start" })

    } catch (error) {
        console.error(error)
        result.innerHTML = "<p style='color:red'>Something went wrong. Please try again.</p>"
    }
})

/* ================= SHOP REDIRECT (Amazon/Flipkart/Myntra) ================= */
function goToShop(style) {
    // Ensure gender is set if jumping straight to this
    if (!detectedGender) {
        detectedGender = document.querySelector("input[name='gender']:checked")?.value.toLowerCase() || 'male';
    }

    const genderTerm = detectedGender === 'female' ? 'women' : 'men';
    const platform = document.querySelector("input[name='platform']:checked")?.value || 'amazon';

    let url = '';

    if (platform === 'amazon') {
        const searchQuery = `${genderTerm} ${style} wear`;
        url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
    }
    else if (platform === 'flipkart') {
        const searchQuery = `${genderTerm} ${style} wear`;
        url = `https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
    else if (platform === 'myntra') {
        // Myntra has category-specific URLs
        if (detectedGender === 'male') {
            if (style === 'casual') url = 'https://www.myntra.com/men-casual-shirts';
            else if (style === 'formal') url = 'https://www.myntra.com/men-formal-shirts';
            else if (style === 'party') url = 'https://www.myntra.com/men-party-wear';
            else if (style === 'traditional') url = 'https://www.myntra.com/men-kurtas';
            else if (style === 'sports') url = 'https://www.myntra.com/men-sports-wear';
            else if (style === 'comfort') url = 'https://www.myntra.com/men-loungewear';
        } else {
            if (style === 'casual') url = 'https://www.myntra.com/women-casual-wear';
            else if (style === 'formal') url = 'https://www.myntra.com/women-formal-wear';
            else if (style === 'party') url = 'https://www.myntra.com/women-party-wear';
            else if (style === 'traditional') url = 'https://www.myntra.com/women-ethnic-wear';
            else if (style === 'sports') url = 'https://www.myntra.com/women-sports-wear';
            else if (style === 'comfort') url = 'https://www.myntra.com/women-loungewear';
        }
    }

    if (url) {
        window.open(url, '_blank');
    }
}

/* ================= 3D TILT EFFECT ================= */
function initTilt(element) {
    const content = element.querySelector('.tilt-content');

    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    element.addEventListener('mouseleave', () => {
        content.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

