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


    /* ── TYPED ANIMATION — handled by patchTyped() below ── */


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

/* ══════════════════════════════════════
   🎮 GAMER MODE — toggle on G click / ESC to exit
   ══════════════════════════════════════ */
(function initGamerMode() {
    const trigger = document.getElementById('gamer-trigger');
    const splash  = document.getElementById('gamer-splash');
    const body    = document.body;

    const GAMER_PHRASES = [
        'LVL 3 CS Student 🎮',
        'Full Stack Dev ⚔️',
        'ML Dungeon Explorer 🤖',
        'UI/UX Pixel Artist 🎨',
        'Boss Fight: Internship 🏆',
        'GPA: 9.23 — S RANK ⭐',
    ];
    const NORMAL_PHRASES = [
        'CS & Design Student ✦',
        'Full Stack Developer 🚀',
        'ML Enthusiast 🤖',
        'UI/UX Explorer 🎨',
        'Problem Solver 💡',
        'Open to Internships 🌸',
    ];

    let isGamer = false;

    function enterGamerMode() {
        isGamer = true;
        // Show splash
        splash.classList.add('show');
        setTimeout(() => {
            splash.classList.remove('show');
            body.classList.add('gamer-mode');
            // Swap typed phrases
            window.__gamerPhrases = GAMER_PHRASES;
        }, 1800);
    }

    function exitGamerMode() {
        isGamer = false;
        body.classList.remove('gamer-mode');
        window.__gamerPhrases = null;
    }

    // Click the G
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isGamer) enterGamerMode();
            else exitGamerMode();
        });
    }

    // Keyboard: G to enter, ESC to exit
    document.addEventListener('keydown', (e) => {
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        if (e.key === 'g' || e.key === 'G') {
            if (!isGamer) enterGamerMode();
        }
        if (e.key === 'Escape') {
            if (isGamer) exitGamerMode();
        }
    });
})();

/* Patch typed animation to support gamer phrases */
(function patchTyped() {
    const el = document.getElementById('typed');
    if (!el) return;

    const normalPhrases = [
        'CS & Design Student ✦',
        'Full Stack Developer 🚀',
        'ML Enthusiast 🤖',
        'UI/UX Explorer 🎨',
        'Problem Solver 💡',
        'Open to Internships 🌸',
    ];
    const gamerPhrases = [
        'LVL 3 CS Student 🎮',
        'Full Stack Dev ⚔️',
        'ML Dungeon Explorer 🤖',
        'UI/UX Pixel Artist 🎨',
        'Boss Fight: Internship 🏆',
        'GPA: 9.23 — S RANK ⭐',
    ];

    // Stop existing typed loop and restart with right phrases on mode change
    let phraseIdx = 0, charIdx = 0, deleting = false, paused = false, timer = null;

    function getPhrases() {
        return document.body.classList.contains('gamer-mode') ? gamerPhrases : normalPhrases;
    }

    function type() {
        if (paused) return;
        const phrases = getPhrases();
        const current = phrases[phraseIdx % phrases.length];

        if (!deleting) {
            el.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                paused = true;
                timer = setTimeout(() => { deleting = true; paused = false; tick(); }, 1800);
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
        timer = setTimeout(type, delay);
    }

    // Restart when gamer mode toggles — smooth phrase switch
    const observer = new MutationObserver(() => {
        clearTimeout(timer);
        charIdx = 0; deleting = false; paused = false; phraseIdx = 0;
        el.textContent = '';
        tick();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    tick();
})();


/* ══════════════════════════════════════
   🎀 CLAW MACHINE — pastel pixel edition
   ══════════════════════════════════════ */
(function initClawMachine() {
    const toggleBtn  = document.getElementById('claw-toggle');
    const widget     = document.getElementById('claw-widget');
    const closeBtn   = document.getElementById('claw-wclose');
    const canvas     = document.getElementById('claw-canvas');
    const scoreboxEl = document.getElementById('claw-wscorebox');
    const bannerEl   = document.getElementById('claw-win-banner');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = 480, H = 340;

    const PAL = {
        backWall:    '#ddd0f5',
        glass:       'rgba(180,142,224,0.13)',
        glassBorder: '#b48ee0',
        rail:        '#cc5577',
        railTop:     '#ff85a1',
        claw:        '#ff85a1',
        clawDark:    '#cc5577',
        wire:        '#cc5577',
        floor:       '#c5b8e0',
        floorSh:     '#b3a6d8',
        chute:       '#c5b8e0',
        chuteDark:   '#b3a6d8',
        panel:       '#b48ee0',
        frame:       '#9370cc',
    };

    const TOYS = [
        { emoji: '🐻', name: 'BEAR',    color: '#ffb3c6' },
        { emoji: '🐱', name: 'KITTY',   color: '#ffd6e7' },
        { emoji: '🐰', name: 'BUNNY',   color: '#fff0f5' },
        { emoji: '🦄', name: 'UNICORN', color: '#e8d5ff' },
        { emoji: '🐸', name: 'FROGGY',  color: '#c8f0d0' },
        { emoji: '🦊', name: 'FOX',     color: '#ffd6b0' },
        { emoji: '🐼', name: 'PANDA',   color: '#f0f0f0' },
        { emoji: '🐨', name: 'KOALA',   color: '#d8e8f0' },
        { emoji: '🌟', name: 'STAR',    color: '#fff5b0' },
        { emoji: '🍄', name: 'SHROOM',  color: '#ffccd5' },
    ];

    function makeToys() {
        const positions = [
            {x:75,row:0},{x:150,row:0},{x:225,row:0},{x:300,row:0},{x:375,row:0},
            {x:112,row:1},{x:190,row:1},{x:268,row:1},{x:346,row:1},
            {x:80, row:2},{x:165,row:2},{x:248,row:2},{x:330,row:2},{x:400,row:2},
        ];
        const shuffled = [...TOYS].sort(() => Math.random() - 0.5);
        return positions.map((p, i) => ({
            x: p.x, y: 196 + p.row * 34,
            size: 18,
            toy: shuffled[i % shuffled.length],
            swayOffset: Math.random() * Math.PI * 2,
            grabbed: false, collected: false,
        }));
    }

    let toys, clawX, clawDropY, clawState, grabbed, plays, wins, particles, frame, keys;

    function resetGame() {
        toys = makeToys(); clawX = 240; clawDropY = 63;
        clawState = 'idle'; grabbed = null;
        plays = 3; wins = 0; particles = []; frame = 0; keys = {};
        bannerEl.style.display = 'none';
        updateScorebox();
    }
    resetGame();

    function spawnParticles(x, y, color, n) {
        for (let i = 0; i < n; i++) {
            particles.push({
                x, y, vx: (Math.random()-0.5)*5,
                vy: -(Math.random()*4+2), life: 1,
                color, size: Math.random()*5+3,
            });
        }
    }

    function drawMachine() {
        ctx.fillStyle = PAL.backWall;
        ctx.fillRect(30, 56, 420, 254);
        // pixel grid on back wall
        ctx.fillStyle = 'rgba(180,142,224,0.16)';
        for (let px = 50; px < 440; px += 32)
            for (let py = 72; py < 300; py += 32)
                ctx.fillRect(px, py, 12, 12);
        // glass tint
        ctx.fillStyle = PAL.glass;
        ctx.fillRect(38, 56, 404, 254);
        // side walls
        ctx.fillStyle = PAL.glassBorder;
        ctx.fillRect(30, 56, 8, 254);
        ctx.fillRect(442, 56, 8, 254);
        // floor
        ctx.fillStyle = PAL.floor;
        ctx.fillRect(30, 305, 420, 6);
        ctx.fillStyle = PAL.floorSh;
        ctx.fillRect(30, 309, 420, 2);
        // chute
        ctx.fillStyle = PAL.chute;
        ctx.fillRect(392, 248, 56, 59);
        ctx.fillStyle = PAL.chuteDark;
        ctx.fillRect(392, 304, 58, 7);
        ctx.fillStyle = '#9988bb';
        ctx.font = '5px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CHUTE', 420, 284);
        // rail
        ctx.fillStyle = PAL.railTop;
        ctx.fillRect(30, 56, 420, 13);
        ctx.fillStyle = PAL.rail;
        ctx.fillRect(30, 56, 420, 5);
        // outer frame
        ctx.strokeStyle = PAL.frame;
        ctx.lineWidth = 4;
        ctx.strokeRect(28, 54, 424, 258);
        // top housing
        ctx.fillStyle = '#ff85a1';
        ctx.fillRect(24, 28, 432, 28);
        ctx.fillStyle = '#cc5577';
        ctx.fillRect(24, 28, 432, 6);
        ctx.fillRect(24, 50, 432, 4);
        // title
        ctx.fillStyle = '#fff';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✦  PRIZE CORNER  ✦', 240, 42);
        // bottom panel
        ctx.fillStyle = PAL.panel;
        ctx.fillRect(24, 315, 432, 25);
        ctx.fillStyle = '#ff85a1';
        for (let bx = 44; bx < 450; bx += 36) {
            ctx.fillRect(bx, 320, 22, 14);
            ctx.fillStyle = '#cc5577';
            ctx.fillRect(bx, 320, 22, 4);
            ctx.fillStyle = '#ff85a1';
        }
        ctx.textAlign = 'left';
    }

    function drawWire() {
        ctx.strokeStyle = PAL.wire;
        ctx.lineWidth = 2;
        ctx.setLineDash([4,3]);
        ctx.beginPath();
        ctx.moveTo(clawX, 62);
        ctx.lineTo(clawX, clawDropY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawClaw(cx, cy, open) {
        const o = open ? 14 : 5;
        ctx.strokeStyle = PAL.clawDark;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-o,cy+13); ctx.lineTo(cx-o-5,cy+24); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+o,cy+13); ctx.lineTo(cx+o+5,cy+24); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy+15); ctx.stroke();
        ctx.fillStyle = PAL.claw;
        ctx.strokeStyle = PAL.clawDark;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath(); ctx.arc(cx-3, cy-3, 3.5, 0, Math.PI*2); ctx.fill();
    }

    function drawToys() {
        const t = frame * 0.04;
        toys.forEach(toy => {
            if (toy.collected) return;
            const sway = Math.sin(t + toy.swayOffset) * 1.8;
            const ty = toy.grabbed ? clawDropY + 24 : toy.y + sway;
            const tx = toy.grabbed ? clawX : toy.x + sway * 0.4;
            // shadow
            ctx.fillStyle = 'rgba(147,112,204,0.18)';
            ctx.beginPath(); ctx.ellipse(tx, toy.y+toy.size+2, toy.size*0.8, 4, 0, 0, Math.PI*2); ctx.fill();
            // body
            ctx.fillStyle = toy.toy.color;
            ctx.strokeStyle = '#cc5577'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(tx, ty, toy.size, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            // emoji
            ctx.font = `${toy.size*1.15}px serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(toy.toy.emoji, tx, ty);
            ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        });
    }

    function drawParticles() {
        particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x-p.size/2, p.y-p.size/2, p.size, p.size);
        });
        ctx.globalAlpha = 1;
    }

    function drawHUD() {
        ctx.fillStyle = '#cc5577';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('♥'.repeat(plays) + '♡'.repeat(Math.max(0,3-plays)), 36, 20);
    }

    function update() {
        frame++;
        if (clawState === 'idle' && plays > 0) {
            if (keys['ArrowLeft']  && clawX > 60)  clawX -= 3;
            if (keys['ArrowRight'] && clawX < 415) clawX += 3;
            if ((keys[' '] || keys['Space']) && !keys._used) {
                keys._used = true; clawState = 'dropping'; plays--; updateScorebox();
            }
        }
        if (clawState === 'dropping') {
            clawDropY += 4.5;
            let hit = null;
            toys.forEach(toy => {
                if (!toy.collected && !toy.grabbed)
                    if (Math.hypot(clawX-toy.x, clawDropY+24-toy.y) < toy.size+9) hit = toy;
            });
            if (hit) { hit.grabbed = true; grabbed = hit; clawState = 'rising'; }
            else if (clawDropY > 292) clawState = 'rising';
        }
        if (clawState === 'rising') {
            clawDropY -= 4.5;
            if (clawDropY <= 63) {
                clawDropY = 63;
                clawState = grabbed ? 'sliding' : 'idle';
                if (!grabbed && plays <= 0) setTimeout(endGame, 400);
            }
        }
        if (clawState === 'sliding') {
            clawX += clawX < 415 ? 4 : -4;
            if (Math.abs(clawX - 415) < 5) { clawX = 415; clawState = 'dropping2'; }
        }
        if (clawState === 'dropping2') {
            if (grabbed) {
                const name = grabbed.toy.name;
                grabbed.collected = true; grabbed.grabbed = false; grabbed = null;
                wins++; clawState = 'idle';
                spawnParticles(425, 270, '#ff85a1', 16);
                spawnParticles(425, 270, '#b48ee0', 10);
                showBanner(`GOT ONE! ✦\n${name} COLLECTED!`, 1800);
                updateScorebox();
                if (plays <= 0) setTimeout(endGame, 2000);
            }
        }
        particles.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=0.18; p.life-=0.04; });
        particles = particles.filter(p => p.life > 0);
    }

    function endGame() {
        if (plays > 0) return;
        showBanner(`GAME OVER\nWINS: ${wins}   PRESS R`, 0);
    }

    function showBanner(text, duration) {
        const lines = text.split('\n');
        bannerEl.innerHTML = lines.map((l,i) =>
            `<span style="display:block;font-size:${i===0?'0.55rem':'0.38rem'};opacity:${i===0?1:0.88}">${l}</span>`
        ).join('');
        bannerEl.style.display = 'block';
        if (duration > 0) setTimeout(() => bannerEl.style.display = 'none', duration);
    }

    function updateScorebox() {
        scoreboxEl.textContent = `WINS: ${wins}  |  PLAYS: ${plays}`;
    }

    let raf = null;
    function loop() {
        update();
        ctx.clearRect(0, 0, W, H);
        drawMachine(); drawWire(); drawToys();
        drawClaw(clawX, clawDropY, clawState==='idle'||clawState==='rising');
        drawParticles(); drawHUD();
        raf = requestAnimationFrame(loop);
    }

    function onKeyDown(e) {
        if (!document.body.classList.contains('gamer-mode')) return;
        if (!widget.classList.contains('open')) return;
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        keys[e.key] = true;
        if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
        if ((e.key === 'r' || e.key === 'R') && (clawState === 'idle' || plays <= 0)) resetGame();
    }
    function onKeyUp(e) {
        keys[e.key] = false;
        if (e.key === ' ') keys._used = false;
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup',   onKeyUp);

    toggleBtn.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open') && !raf) loop();
    });
    closeBtn.addEventListener('click', () => widget.classList.remove('open'));

    new MutationObserver(() => {
        const gamer = document.body.classList.contains('gamer-mode');
        if (!gamer) {
            widget.classList.remove('open');
            if (raf) { cancelAnimationFrame(raf); raf = null; }
        } else {
            if (!raf) loop();
        }
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    loop();
})();