// --- 1. Spider-Web Canvas Hover Effect for Tech Cards ---
function initWebCanvas(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const canvas = card.querySelector('.web-canvas');
    const ctx = canvas.getContext('2d');
    let isHovered = false;

    function resizeCanvas() {
        canvas.width = card.clientWidth;
        canvas.height = card.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawSpiderWeb(cx, cy) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!isHovered) return;

        ctx.strokeStyle = 'rgba(0, 210, 255, 0.7)';
        ctx.lineWidth = 1.5;

        const numRays = 8;
        const numRings = 4;
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;

        // Draw Web Rays
        for (let i = 0; i < numRays; i++) {
            const angle = (Math.PI * 2 / numRays) * i;
            const rx = cx + Math.cos(angle) * maxRadius;
            const ry = cy + Math.sin(angle) * maxRadius;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(rx, ry);
            ctx.stroke();
        }

        // Draw Web Rings
        for (let r = 1; r <= numRings; r++) {
            const radius = (maxRadius / numRings) * r;
            ctx.beginPath();
            for (let i = 0; i <= numRays; i++) {
                const angle = (Math.PI * 2 / numRays) * i;
                const rx = cx + Math.cos(angle) * radius;
                const ry = cy + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(rx, ry);
                else ctx.lineTo(rx, ry);
            }
            ctx.stroke();
        }
    }

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovered = true;
        drawSpiderWeb(x, y);
    });

    card.addEventListener('mouseleave', () => {
        isHovered = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

// Initialize Web Canvas on Cards
for (let i = 1; i <= 8; i++) {
    initWebCanvas(`tech-card-${i}`);
}

// --- 2. Comic Action Sound Pop-ups on Click ---
const soundBadges = ['THWIP!', 'POW!', 'BAM!', 'ZAP!', 'BOOM!'];
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const pop = document.createElement('div');
    pop.className = 'comic-sound-effect';
    pop.innerText = soundBadges[Math.floor(Math.random() * soundBadges.length)];
    pop.style.left = `${e.pageX - 30}px`;
    pop.style.top = `${e.pageY - 30}px`;

    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
});

// --- 3. Projects Category Filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('btn-comic-primary', 'active');
            b.classList.add('btn-comic-secondary');
        });
        btn.classList.remove('btn-comic-secondary');
        btn.classList.add('btn-comic-primary', 'active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- 4. Back To Top Button & Web Line Effect ---
const backToTopBtn = document.getElementById('btn-back-to-top');
const webLine = document.getElementById('web-line');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
        webLine.style.opacity = '0';
    }
});

backToTopBtn.addEventListener('click', () => {
    webLine.style.height = `${window.scrollY}px`;
    webLine.style.top = '0';
    webLine.style.opacity = '1';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        webLine.style.opacity = '0';
    }, 600);
});

// --- 5. Form Handling Mock ---
function handleFormSubmit(e) {
    e.preventDefault();
    const msgBox = document.getElementById('form-response-msg');
    msgBox.classList.remove('d-none');
    msgBox.innerHTML = `
        <div class="speech-bubble bg-warning text-dark fs-5 text-center">
            ¡MENSAJE RECIBIDO! 🕸️ Wisler Espinales (24-EISN-8-013) responderá a tu solicitud en breve.
        </div>
    `;
    document.getElementById('spider-contact-form').reset();
}
