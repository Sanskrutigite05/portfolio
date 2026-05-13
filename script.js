    /* ══════════════════════════════════════
    SANSKRUTI GITE — PORTFOLIO · script.js
    ══════════════════════════════════════ */

    /* ── NAVBAR: scroll shadow + active link ── */
    (function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section');

    window.addEventListener('scroll', () => {
        // Shadow on scroll
        if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        } else {
        navbar.classList.remove('scrolled');
        }

        // Active nav link highlight
        let current = '';
        sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
        });

        navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
        });
    }, { passive: true });
    })();


    /* ── HAMBURGER MENU ── */
    (function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        });
    });
    })();


    /* ── TYPED ANIMATION ── */
    (function initTyped() {
    const el = document.getElementById('typed');
    if (!el) return;

    const phrases = [
        'CS & Design Student ✦',
        'Full Stack Developer 🚀',
        'ML Enthusiast 🤖',
        'UI/UX Explorer 🎨',
        'Problem Solver 💡',
        'Open to Internships 🌸',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;

    function type() {
        if (paused) return;

        const current = phrases[phraseIdx];

        if (!deleting) {
        el.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            paused = true;
            setTimeout(() => { deleting = true; paused = false; tick(); }, 1800);
            return;
        }
        } else {
        el.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting  = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
        }

        tick();
    }

    function tick() {
        const delay = deleting ? 45 : 90;
        setTimeout(type, delay);
    }

    tick();
    })();


    /* ── SCROLL REVEAL ── */
    (function initReveal() {
    // Add reveal class to key elements
    const targets = [
        '.hero-tag', '.hero-name', '.hero-typed', '.hero-desc', '.hero-btns',
        '.photo-frame', '.hero-stats', '.open-badge',
        '.section-label', '.sec-title', '.sec-body',
        '.edu-card', '.exp-item', '.tool-chip',
        '.bar-item', '.proj-card', '.cert-item',
        '.achieve-card', '.contact-chip', '.contact-form',
    ];

    targets.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger siblings
        if (i > 0 && i < 4) el.classList.add(`reveal-delay-${i}`);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    })();

    /* ── SKILL BARS ANIMATION ── */
    (function initSkillBars() {
    const bars = document.querySelectorAll('.fill[data-w]');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const target = bar.getAttribute('data-w');
            bar.style.width = target + '%';
            observer.unobserve(bar);
        }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
    })();


    /* ── CONTACT FORM: sendEmail ── */
    function sendEmail() {
    const name  = document.getElementById('fname')?.value.trim();
    const email = document.getElementById('femail')?.value.trim();
    const msg   = document.getElementById('fmsg')?.value.trim();

    if (!name || !email || !msg) {
        showToast('Please fill in all fields 🌸', 'warn');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address ✦', 'warn');
        return;
    }

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Hi Sanskruti,\n\n${msg}\n\nBest,\n${name}\n${email}`);
    window.location.href = `mailto:sanskrutigite6532@gmail.com?subject=${subject}&body=${body}`;

    showToast('Opening your email client… 💌', 'success');

    // Clear form
    document.getElementById('fname').value  = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value   = '';
    }

    function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    /* ── TOAST NOTIFICATION ── */
    function showToast(message, type = 'success') {
    // Remove any existing toast
    const existing = document.querySelector('.sg-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'sg-toast';
    toast.textContent = message;

    const colors = {
        success: { bg: '#7caa8c', border: '#5e9474' },
        warn:    { bg: '#e8758a', border: '#c24d66' },
        info:    { bg: '#9b7eb8', border: '#7a5da0' },
    };
    const c = colors[type] || colors.success;

    Object.assign(toast.style, {
        position:     'fixed',
        bottom:       '32px',
        right:        '32px',
        background:   c.bg,
        border:       `1px solid ${c.border}`,
        color:        '#fff',
        padding:      '14px 22px',
        borderRadius: '999px',
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     '0.95rem',
        fontWeight:   '600',
        boxShadow:    '0 8px 32px rgba(0,0,0,0.18)',
        zIndex:       '9999',
        opacity:      '0',
        transform:    'translateY(16px)',
        transition:   'opacity 0.3s, transform 0.3s',
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        toast.style.opacity   = '1';
        toast.style.transform = 'translateY(0)';
        });
    });

    setTimeout(() => {
        toast.style.opacity   = '0';
        toast.style.transform = 'translateY(16px)';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
    }


    /* ── SMOOTH ANCHOR SCROLLING (offset for fixed navbar) ── */
    (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
        });
    });
    })();


    /* ── TAG CLOUD: random subtle tilt on hover ── */
    (function initTagHover() {
    document.querySelectorAll('.tag-cloud span').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
        const tilt = (Math.random() - 0.5) * 6;
        tag.style.transform = `translateY(-2px) rotate(${tilt}deg)`;
        });
        tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
        });
    });
    })();

    /* ── LEETCODE LIVE STATS ── */
(function fetchLeetCode() {
    const username = 'Sanskruti005';
    const TOTAL_QUESTIONS = 3500; // approx total on LeetCode

    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
        .then(r => r.json())
        .then(data => {
            if (data.status === 'error') return;

            const total  = data.totalSolved  || 0;
            const easy   = data.easySolved   || 0;
            const medium = data.mediumSolved  || 0;
            const hard   = data.hardSolved   || 0;
            const pct    = Math.round((total / TOTAL_QUESTIONS) * 100);

            // Animated counter
            animateCount('lc-total', total);

            // Progress bar + percentage
            setTimeout(() => {
                const bar = document.getElementById('lc-bar');
                const pctEl = document.getElementById('lc-pct');
                if (bar) bar.style.width = Math.min(pct, 100) + '%';
                if (pctEl) pctEl.textContent = pct + '%';
            }, 400);

            // Breakdown
            document.getElementById('lc-easy').textContent   = easy;
            document.getElementById('lc-medium').textContent = medium;
            document.getElementById('lc-hard').textContent   = hard;
        })
        .catch(() => {
            // silently fail — dashes stay
        });

    function animateCount(id, target) {
        const el = document.getElementById(id);
        if (!el) return;
        const duration = 1800;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }
})();

/* ── CURSOR TRAILING GLOW ── */
(function initCursorGlow() {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: '9998',
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    let trail = [];
    const MAX = 22;

    window.addEventListener('resize', () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        if (trail.length > MAX) trail.shift();
    });

    function animate() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 1; i < trail.length; i++) {
            const t = i / trail.length;
            const p = trail[i - 1];
            const c = trail[i];

            const grad = ctx.createLinearGradient(p.x, p.y, c.x, c.y);
            grad.addColorStop(0, `rgba(232,117,138,${t * 0.35})`);
            grad.addColorStop(1, `rgba(155,126,184,${t * 0.35})`);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = t * 12;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }

        // Fade trail over time
        if (trail.length > 0) {
            trail.shift();
        }

        requestAnimationFrame(animate);
    }

    animate();
})();