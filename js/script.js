/* ============================================================
   KOVA CAFÉ - FULL INTERACTIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 KOVA Script Loaded');

    /* ==================== SCROLL PROGRESS BAR ==================== */
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }

    /* ==================== PRELOADER ==================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.classList.add('hidden');
        }, 1500);
    });

    /* ==================== HEADER SCROLL ==================== */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* ==================== MOBILE MENU ==================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    /* ==================== MENU TABS ==================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            menuPanels.forEach(panel => panel.classList.remove('active'));
            const targetId = button.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    /* ==================== SCROLL REVEAL ==================== */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==================== TIME-BASED GREETING ==================== */
    const timeGreeting = document.getElementById('timeGreeting');
    let currentLang = 'en';

    function updateGreeting(lang = 'en') {
        if (!timeGreeting) return;
        const hour = new Date().getHours();
        let greetingEn = 'GOOD EVENING';
        let greetingAr = 'مساء الخير';
        
        if (hour >= 5 && hour < 12) {
            greetingEn = 'GOOD MORNING';
            greetingAr = 'صباح الخير';
        } else if (hour >= 12 && hour < 17) {
            greetingEn = 'GOOD AFTERNOON';
            greetingAr = 'مساء الخير';
        } else if (hour >= 17 && hour < 24) {
            greetingEn = 'GOOD EVENING';
            greetingAr = 'مساء الخير';
        } else {
            greetingEn = 'LATE NIGHTS';
            greetingAr = 'سهرة';
        }
        
        if (lang === 'ar') {
            timeGreeting.textContent = `${greetingAr} · كوفا`;
            timeGreeting.style.fontFamily = 'var(--font-arabic)';
            timeGreeting.style.letterSpacing = '0';
        } else {
            timeGreeting.textContent = `${greetingEn} · KOVA`;
            timeGreeting.style.fontFamily = '';
            timeGreeting.style.letterSpacing = '';
        }
    }

    /* ==================== OPEN NOW INDICATOR ==================== */
    const openStatus = document.getElementById('openStatus');
    const statusText = document.getElementById('statusText');
    const statusDot = openStatus ? openStatus.querySelector('.status-dot') : null;

    function updateOpenStatus(lang = 'en') {
        if (!statusText || !statusDot) return;
        const now = new Date();
        const hour = now.getHours();
        const isOpen = hour >= 8 && hour < 24;
        
        if (lang === 'ar') {
            if (isOpen) {
                statusText.textContent = 'مفتوح الآن';
                statusDot.classList.remove('closed');
            } else {
                statusText.textContent = 'مغلق';
                statusDot.classList.add('closed');
            }
        } else {
            if (isOpen) {
                statusText.textContent = 'Open Now';
                statusDot.classList.remove('closed');
            } else {
                statusText.textContent = 'Closed';
                statusDot.classList.add('closed');
            }
        }
    }

    /* ==================== LANGUAGE TOGGLE ==================== */
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const langEn = langToggle ? langToggle.querySelector('.lang-en') : null;
    const langAr = langToggle ? langToggle.querySelector('.lang-ar') : null;
    const langEnMobile = langToggleMobile ? langToggleMobile.querySelector('.lang-en') : null;
    const langArMobile = langToggleMobile ? langToggleMobile.querySelector('.lang-ar') : null;

    const translations = {
        en: {
            headlineLine1: 'Good Coffee',
            headlineLine2: 'Better Days',
            subheadline: "More than coffee. It's a feeling you'll want to come back to.",
            subheadlineMobile: "More than coffee. It's a feeling.",
            btnPrimary: 'Reserve a Table',
            btnSecondary: 'Discover KOVA',
            scrollIndicator: 'Scroll to Explore',
            widgetTonight: 'Tonight',
            widgetGuests: '2 Guests',
            widgetTime: '8:00 PM',
            widgetBtn: 'Check Availability →',
            reserve: 'Reserve',
            experienceTitle: 'The KOVA Experience',
            sipMoment: 'Sip The Moment',
            goodFood: 'Good Food<br>Great Company',
            signatureDrinks: 'Signature Drinks',
            kovaFeeling: 'The Kova Feeling',
            desserts: 'DESSERTS',
            ourMenu: 'Our Menu',
            coffee: 'COFFEE',
            nonCoffee: 'NON COFFEE',
            menuCoffee: 'COFFEE',
            menuNonCoffee: 'NON COFFEE',
            menuDesserts: 'DESSERTS',
            moreThanCoffee: 'More Than Coffee.<br>It\'s a Feeling.',
            kovaMeaning: 'KOVA — Kick, Open, Vibe, Atmosphere.'
        },
        ar: {
            headlineLine1: 'قهوة ممتازة',
            headlineLine2: 'أيام أفضل',
            subheadline: 'أكثر من مجرد قهوة. إنه إحساس ستعود إليه دائماً.',
            subheadlineMobile: 'أكثر من قهوة. إنه إحساس.',
            btnPrimary: 'احجز طاولة',
            btnSecondary: 'اكتشف كوفا',
            scrollIndicator: 'مرر للأسفل',
            widgetTonight: 'الليلة',
            widgetGuests: '٢ أفراد',
            widgetTime: '٨:٠٠ م',
            widgetBtn: 'تحقق من التوفر ←',
            reserve: 'احجز',
            experienceTitle: 'تجربة كوفا',
            sipMoment: 'ارتشف اللحظة',
            goodFood: 'أكل لذيذ<br>وصحبة حلوة',
            signatureDrinks: 'مشروباتنا المميزة',
            kovaFeeling: 'إحساس كوفا',
            desserts: 'الحلويات',
            ourMenu: 'قائمتنا',
            coffee: 'قهوة',
            nonCoffee: 'مش قهوة',
            menuCoffee: 'قهوة',
            menuNonCoffee: 'مش قهوة',
            menuDesserts: 'حلويات',
            moreThanCoffee: 'أكثر من قهوة.<br>إنه إحساس.',
            kovaMeaning: 'كوفا — انطلق، افتح، استمتع، أجواء.'
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        // RTL/LTR Switch
        if (lang === 'ar') {
            document.body.classList.add('rtl');
            document.documentElement.setAttribute('lang', 'ar');
            document.documentElement.setAttribute('dir', 'rtl');
            if (langAr) langAr.classList.add('active');
            if (langEn) langEn.classList.remove('active');
            if (langArMobile) langArMobile.classList.add('active');
            if (langEnMobile) langEnMobile.classList.remove('active');
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
            if (langEn) langEn.classList.add('active');
            if (langAr) langAr.classList.remove('active');
            if (langEnMobile) langEnMobile.classList.add('active');
            if (langArMobile) langArMobile.classList.remove('active');
        }

        // Hero Headline
        const headline = document.getElementById('splitHeadline');
        if (headline) {
            const lines = headline.querySelectorAll('.line');
            if (lines.length >= 2) {
                lines[0].textContent = t.headlineLine1;
                lines[1].textContent = t.headlineLine2;
            }
            splitTextReveal();
        }

        // Hero Subheadlines
        const subheadlineDesktop = document.querySelector('.hero-subheadline.desktop-only');
        if (subheadlineDesktop) subheadlineDesktop.textContent = t.subheadline;
        const subheadlineMobile = document.querySelector('.hero-subheadline.mobile-only');
        if (subheadlineMobile) subheadlineMobile.textContent = t.subheadlineMobile;

        // Hero CTAs
        const btnPrimary = document.querySelector('.btn-primary');
        const btnSecondaryDesktop = document.querySelector('.btn-secondary.desktop-only');
        const btnSecondaryMobile = document.querySelector('.btn-text-link.mobile-only');
        if (btnPrimary) btnPrimary.textContent = t.btnPrimary;
        if (btnSecondaryDesktop) btnSecondaryDesktop.textContent = t.btnSecondary;
        if (btnSecondaryMobile) btnSecondaryMobile.textContent = t.btnSecondary + ' →';

        // Scroll Indicator
        const scrollSpan = document.querySelector('.scroll-indicator span');
        if (scrollSpan) scrollSpan.textContent = t.scrollIndicator;

        // Widget
        const widgetLabel = document.querySelector('.widget-label');
        const widgetValues = document.querySelectorAll('.widget-value');
        const widgetBtn = document.querySelector('.widget-btn');
        if (widgetLabel) widgetLabel.textContent = t.widgetTonight;
        if (widgetValues[0]) widgetValues[0].textContent = t.widgetGuests;
        if (widgetValues[1]) widgetValues[1].textContent = t.widgetTime;
        if (widgetBtn) widgetBtn.textContent = t.widgetBtn;

        // Reserve Buttons
        const reserveBtns = document.querySelectorAll('.btn-reserve');
        reserveBtns.forEach(btn => btn.textContent = t.reserve);

        const stickyBtn = document.querySelector('.sticky-reserve');
        if (stickyBtn) stickyBtn.textContent = t.reserve;

        // ============ SECTIONS TRANSLATION ============
        
        // Features Section
        const featuresTitle = document.querySelector('.features .section-title');
        if (featuresTitle) featuresTitle.textContent = t.experienceTitle;

        const cardTitles = document.querySelectorAll('.features .card-title');
        if (cardTitles[0]) cardTitles[0].innerHTML = t.sipMoment;
        if (cardTitles[1]) cardTitles[1].innerHTML = t.goodFood;
        if (cardTitles[2]) cardTitles[2].innerHTML = t.signatureDrinks;
        if (cardTitles[3]) cardTitles[3].innerHTML = t.kovaFeeling;

        const cardBrands = document.querySelectorAll('.features .card-brand');
        if (cardBrands[3]) cardBrands[3].textContent = t.desserts;

        // Menu Section
        const menuTitle = document.querySelector('.menu-section .section-title');
        if (menuTitle) menuTitle.textContent = t.ourMenu;

        const tabBtns = document.querySelectorAll('.tab-btn');
        if (tabBtns[0]) tabBtns[0].textContent = t.coffee;
        if (tabBtns[1]) tabBtns[1].textContent = t.nonCoffee;
        if (tabBtns[2]) tabBtns[2].textContent = t.desserts;

        const menuCatTitles = document.querySelectorAll('.menu-category h3');
        if (menuCatTitles[0]) menuCatTitles[0].textContent = t.menuCoffee;
        if (menuCatTitles[1]) menuCatTitles[1].textContent = t.menuNonCoffee;
        if (menuCatTitles[2]) menuCatTitles[2].textContent = t.menuDesserts;

        // Brand Story
        const brandH2 = document.querySelector('.brand-story h2');
        if (brandH2) brandH2.innerHTML = t.moreThanCoffee;

        const brandP = document.querySelector('.brand-story p');
        if (brandP) brandP.textContent = t.kovaMeaning;

        // ============ END SECTIONS TRANSLATION ============

        updateGreeting(lang);
        updateOpenStatus(lang);
        localStorage.setItem('kova-lang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    const savedLang = localStorage.getItem('kova-lang');
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    
    if (savedLang) {
        setLanguage(savedLang);
    } else if (browserLang.startsWith('ar')) {
        setLanguage('ar');
    } else {
        setLanguage('en');
    }

    /* ==================== SPLIT TEXT REVEAL ==================== */
    function splitTextReveal() {
        const headline = document.getElementById('splitHeadline');
        if (!headline) return;
        
        const isArabic = document.body.classList.contains('rtl');
        const lines = headline.querySelectorAll('.line');
        let delay = 0;
        
        lines.forEach((line) => {
            const text = line.textContent.trim();
            line.innerHTML = '';
            
            if (isArabic) {
                const words = text.split(/\s+/);
                words.forEach((word, index) => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = word;
                    span.style.animationDelay = (index * 0.25) + 's';
                    span.style.marginInlineEnd = '0.25em';
                    line.appendChild(span);
                });
            } else {
                [...text].forEach((char) => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = (delay * 0.04) + 's';
                    line.appendChild(span);
                    delay++;
                });
            }
        });
    }

    /* ==================== MEANING MODAL ==================== */
    const meaningModal = document.getElementById('meaningModal');
    const openModalBtnDesktop = document.getElementById('openMeaningModal');
    const openModalBtnMobile = document.getElementById('openMeaningModalMobile');
    const closeModalBtns = document.querySelectorAll('[data-close]');

    function openModal() {
        if (!meaningModal) return;
        meaningModal.classList.add('active');
        meaningModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        if (!meaningModal) return;
        meaningModal.classList.remove('active');
        meaningModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    }

    if (openModalBtnDesktop) {
        openModalBtnDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    if (openModalBtnMobile) {
        openModalBtnMobile.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && meaningModal && meaningModal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==================== AMBIENT SOUND TOGGLE ==================== */
    const soundToggle = document.getElementById('soundToggle');
    const ambientAudio = document.getElementById('ambientAudio');
    let soundPlaying = false;

    if (ambientAudio) ambientAudio.volume = 0.3;

    if (soundToggle && ambientAudio) {
        soundToggle.addEventListener('click', () => {
            if (soundPlaying) {
                ambientAudio.pause();
                soundToggle.classList.remove('active');
            } else {
                ambientAudio.play().catch(err => console.log('Audio play failed:', err));
                soundToggle.classList.add('active');
            }
            soundPlaying = !soundPlaying;
        });
    }

    /* ==================== MAGNETIC BUTTONS ==================== */
    const magneticButtons = document.querySelectorAll('.magnetic');
    if (window.innerWidth > 768) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* ==================== STICKY RESERVE BUTTON ==================== */
    const stickyReserve = document.createElement('button');
    stickyReserve.className = 'sticky-reserve';
    stickyReserve.textContent = currentLang === 'ar' ? 'احجز' : 'Reserve';
    document.body.appendChild(stickyReserve);

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            stickyReserve.classList.add('visible');
        } else {
            stickyReserve.classList.remove('visible');
        }
    });

    stickyReserve.addEventListener('click', () => {
        document.querySelector('#reserve')?.scrollIntoView({ behavior: 'smooth' });
    });

    /* ==================== RESERVATION MINI-WIDGET ==================== */
    const widgetBtn = document.querySelector('.widget-btn');
    if (widgetBtn) {
        widgetBtn.addEventListener('click', () => {
            document.querySelector('#reserve')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ==================== FLOATING PARTICLES ==================== */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && window.innerWidth > 768) {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (8 + Math.random() * 12) + 's';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.opacity = (0.3 + Math.random() * 0.7);
            particle.style.width = particle.style.height = (1 + Math.random() * 2) + 'px';
            particlesContainer.appendChild(particle);
        }
    }

    /* ==================== DARK/LIGHT MODE ==================== */
    if (localStorage.getItem('kova-theme') === 'light') {
        body.classList.add('light-mode');
    }

    /* ==================== QUOTE TICKER ==================== */
    const quotesEn = [
        "More than coffee. It's a feeling.",
        "Where time slows down.",
        "Your table is waiting.",
        "Kick. Open. Vibe. Atmosphere.",
        "Good coffee. Better days."
    ];
    const quotesAr = [
        'أكثر من مجرد قهوة. إنه إحساس.',
        'حيث يتوقف الزمن.',
        'طاولتك تنتظرك.',
        'انطلق. افتح. استمتع. تجربة.',
        'قهوة ممتازة. أيام أفضل.'
    ];
    const quoteText = document.getElementById('quoteTicker');
    let quoteIndex = 0;

    if (quoteText) {
        setInterval(() => {
            quoteText.classList.add('fading');
            setTimeout(() => {
                const quotes = currentLang === 'ar' ? quotesAr : quotesEn;
                quoteIndex = (quoteIndex + 1) % quotes.length;
                quoteText.textContent = quotes[quoteIndex];
                quoteText.classList.remove('fading');
            }, 500);
        }, 4500);
    }

    console.log('✅ All KOVA interactions initialized');
});


/* ============================================================
   🎬 AGGRESSIVE VIDEO AUTOPLAY
   ============================================================ */
(function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) {
        console.warn('⚠️ Hero video not found');
        return;
    }

    video.style.pointerEvents = 'none';
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');
    video.setAttribute('disablepictureinpicture', '');

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');

    let hasPlayed = false;

    function attemptPlay(source = 'unknown') {
        if (hasPlayed && !video.paused) return;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    if (!hasPlayed) {
                        hasPlayed = true;
                        console.log(`✅ Video autoplay started (${source})`);
                    }
                })
                .catch((error) => {
                    console.log(`⏸️ Autoplay blocked (${source}):`, error.name);
                    setTimeout(() => attemptPlay(source + '-retry'), 300);
                });
        }
    }

    attemptPlay('init');

    ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(evt => {
        video.addEventListener(evt, () => attemptPlay(evt), { once: true });
    });

    window.addEventListener('load', () => {
        attemptPlay('window-load');
        setTimeout(() => attemptPlay('load-300ms'), 300);
        setTimeout(() => attemptPlay('load-1000ms'), 1000);
        setTimeout(() => attemptPlay('load-2000ms'), 2000);
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) attemptPlay('visibility-return');
        else video.pause();
    });

    window.addEventListener('focus', () => attemptPlay('window-focus'));
    window.addEventListener('pageshow', () => attemptPlay('pageshow'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) attemptPlay('intersection');
            });
        }, { threshold: 0.1 });
        io.observe(video);
    }

    ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(evt => {
        document.addEventListener(evt, () => attemptPlay('user-interaction'), { passive: true });
    });

    video.addEventListener('stalled', () => {
        video.load();
        setTimeout(() => attemptPlay('stalled-recovery'), 500);
    });

    console.log('🎬 Autoplay handler initialized');
})();