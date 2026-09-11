/* ============================================================
   KOVA CAFÉ - FULL INTERACTIONS v3.1
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 KOVA Script Loaded');

    /* ==================== BODY REFERENCE ==================== */
    const body = document.body;

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

    /* ==================== GALLERY FILTERS ==================== */
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            galleryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
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
        
        if (hour >= 5 && hour < 12) { greetingEn = 'GOOD MORNING'; greetingAr = 'صباح الخير'; }
        else if (hour >= 12 && hour < 17) { greetingEn = 'GOOD AFTERNOON'; greetingAr = 'مساء الخير'; }
        else if (hour >= 17 && hour < 24) { greetingEn = 'GOOD EVENING'; greetingAr = 'مساء الخير'; }
        else { greetingEn = 'LATE NIGHTS'; greetingAr = 'سهرة'; }
        
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
        const hour = new Date().getHours();
        const isOpen = hour >= 8 && hour < 24;
        
        if (lang === 'ar') {
            statusText.textContent = isOpen ? 'مفتوح الآن' : 'مغلق';
        } else {
            statusText.textContent = isOpen ? 'Open Now' : 'Closed';
        }
        statusDot.classList.toggle('closed', !isOpen);
    }

    /* ==================== TRANSLATIONS ==================== */
    const translations = {
        en: {
            headlineLine1: 'Good Coffee', headlineLine2: 'Better Days',
            subheadline: "More than coffee. It's a feeling you'll want to come back to.",
            subheadlineMobile: "More than coffee. It's a feeling.",
            btnPrimary: 'Reserve a Table', btnSecondary: 'Our Story',
            scrollIndicator: 'Scroll to Explore',
            reserve: 'Reserve',
            experienceTitle: 'The KOVA Experience',
            ourMenu: 'Our Menu',
            coffee: 'COFFEE', nonCoffee: 'NON COFFEE', desserts: 'DESSERTS',
            moreThanCoffee: 'More Than Coffee.<br>It\'s a Feeling.',
            kovaMeaning: 'KOVA — Kick, Open, Vibe, Atmosphere.',
            gallerySubtitle: 'A glimpse into the KOVA experience',
            galleryAll: 'All', galleryInterior: 'Interior', galleryCoffee: 'Coffee', galleryFood: 'Food',
            reviewsTitle: 'What Our Guests Say',
            reviewsSubtitle: 'Real experiences from real people',
            faqTitle: 'Frequently Asked Questions',
            reservationEyebrow: 'RESERVATION',
            reservationTitle: 'Book Your Table',
            reservationSubtitle: "Reserve your spot at KOVA CAFÉ. We'll have everything ready for you.",
            formName: 'Full Name', formPhone: 'Phone Number',
            formDate: 'Date', formTime: 'Time',
            timezoneHint: '(Cairo Time)',
            formGuests: 'Number of Guests',
            formNotes: 'Add Special Requests',
            formSubmit: 'Confirm Reservation',
            formFootnote: "By reserving, you agree to our reservation policy. We'll send you a confirmation on WhatsApp.",
            toastTitle: 'Reservation Confirmed',
            toastMessage: "We'll send you a confirmation on WhatsApp shortly.",
            newsletterTitle: 'Subscribed',
            newsletterMessage: 'Thanks for joining!',
            errName: 'Please enter your name',
            errPhone: 'Please enter a valid phone number',
            errDate: 'Please select a date',
            errTime: 'Please select a time'
        },
        ar: {
            headlineLine1: 'قهوة ممتازة', headlineLine2: 'أيام أفضل',
            subheadline: 'أكثر من مجرد قهوة. إنه إحساس ستعود إليه دائماً.',
            subheadlineMobile: 'أكثر من قهوة. إنه إحساس.',
            btnPrimary: 'احجز طاولة', btnSecondary: 'قصتنا',
            scrollIndicator: 'مرر للأسفل',
            reserve: 'احجز',
            experienceTitle: 'تجربة كوفا',
            ourMenu: 'قائمتنا',
            coffee: 'قهوة', nonCoffee: 'مش قهوة', desserts: 'حلويات',
            moreThanCoffee: 'أكثر من قهوة.<br>إنه إحساس.',
            kovaMeaning: 'كوفا — انطلق، افتح، استمتع، أجواء.',
            gallerySubtitle: 'لمحة من تجربة كوفا',
            galleryAll: 'الكل', galleryInterior: 'المكان', galleryCoffee: 'قهوة', galleryFood: 'أكل',
            reviewsTitle: 'ماذا يقول ضيوفنا',
            reviewsSubtitle: 'تجارب حقيقية من أشخاص حقيقيين',
            faqTitle: 'الأسئلة الشائعة',
            reservationEyebrow: 'الحجز',
            reservationTitle: 'احجز طاولتك',
            reservationSubtitle: 'احجز مكانك في كوفا كافيه. هنكون جاهزين لاستقبالك.',
            formName: 'الاسم بالكامل', formPhone: 'رقم الهاتف',
            formDate: 'التاريخ', formTime: 'الوقت',
            timezoneHint: '(بتوقيت القاهرة)',
            formGuests: 'عدد الأفراد',
            formNotes: 'إضافة طلبات خاصة',
            formSubmit: 'تأكيد الحجز',
            formFootnote: 'بالحجز، أنت توافق على سياسة الحجز. هنبعتلك تأكيد على الواتساب.',
            toastTitle: 'تم الحجز بنجاح',
            toastMessage: 'هنبعتلك تأكيد على الواتساب قريباً.',
            newsletterTitle: 'تم الاشتراك',
            newsletterMessage: 'شكراً لانضمامك!',
            errName: 'الرجاء إدخال الاسم',
            errPhone: 'الرجاء إدخال رقم هاتف صحيح',
            errDate: 'الرجاء اختيار التاريخ',
            errTime: 'الرجاء اختيار الوقت'
        }
    };

    /* ==================== LANGUAGE TOGGLE ==================== */
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const langEn = langToggle ? langToggle.querySelector('.lang-en') : null;
    const langAr = langToggle ? langToggle.querySelector('.lang-ar') : null;
    const langEnMobile = langToggleMobile ? langToggleMobile.querySelector('.lang-en') : null;
    const langArMobile = langToggleMobile ? langToggleMobile.querySelector('.lang-ar') : null;

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

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

        // Hero
        const headline = document.getElementById('splitHeadline');
        if (headline) {
            const lines = headline.querySelectorAll('.line');
            if (lines.length >= 2) {
                lines[0].textContent = t.headlineLine1;
                lines[1].textContent = t.headlineLine2;
            }
            splitTextReveal();
        }
        const subDesk = document.querySelector('.hero-subheadline.desktop-only');
        if (subDesk) subDesk.textContent = t.subheadline;
        const subMob = document.querySelector('.hero-subheadline.mobile-only');
        if (subMob) subMob.textContent = t.subheadlineMobile;

        const bp = document.querySelector('.btn-primary');
        const bsd = document.querySelector('.btn-secondary.desktop-only');
        const bsm = document.querySelector('.btn-text-link.mobile-only');
        if (bp) bp.textContent = t.btnPrimary;
        if (bsd) bsd.textContent = t.btnSecondary;
        if (bsm) bsm.textContent = t.btnSecondary + ' →';

        const ss = document.querySelector('.scroll-indicator span');
        if (ss) ss.textContent = t.scrollIndicator;

        document.querySelectorAll('.btn-reserve').forEach(btn => btn.textContent = t.reserve);
        const sticky = document.querySelector('.sticky-reserve');
        if (sticky) sticky.textContent = t.reserve;

        // Brand Story
        const bh = document.querySelector('.brand-story h2');
        if (bh) bh.innerHTML = t.moreThanCoffee;
        const bp2 = document.querySelector('.brand-story p');
        if (bp2) bp2.textContent = t.kovaMeaning;

        // Gallery
        const gs = document.querySelector('.gallery-subtitle');
        if (gs) gs.textContent = t.gallerySubtitle;
        const gf = document.querySelectorAll('.gallery-filter');
        if (gf[0]) gf[0].textContent = t.galleryAll;
        if (gf[1]) gf[1].textContent = t.galleryInterior;
        if (gf[2]) gf[2].textContent = t.galleryCoffee;
        if (gf[3]) gf[3].textContent = t.galleryFood;

        // Menu
        const mt = document.querySelector('.menu-section .section-title');
        if (mt) mt.textContent = t.ourMenu;
        const tb = document.querySelectorAll('.tab-btn');
        if (tb[0]) tb[0].textContent = t.coffee;
        if (tb[1]) tb[1].textContent = t.nonCoffee;
        if (tb[2]) tb[2].textContent = t.desserts;

        // Reviews
        const rt = document.querySelector('.reviews-section .section-title');
        if (rt) rt.textContent = t.reviewsTitle;
        const rsub = document.querySelector('.reviews-subtitle');
        if (rsub) rsub.textContent = t.reviewsSubtitle;

        // Reservation
        const re = document.querySelector('.reservation-section .section-eyebrow');
        if (re) re.textContent = t.reservationEyebrow;
        const rest = document.querySelector('.reservation-title');
        if (rest) rest.textContent = t.reservationTitle;
        const rsub2 = document.querySelector('.reservation-subtitle');
        if (rsub2) rsub2.textContent = t.reservationSubtitle;
        
        const labels = document.querySelectorAll('.form-group label');
        if (labels[0]) labels[0].innerHTML = t.formName;
        if (labels[1]) labels[1].innerHTML = t.formPhone;
        if (labels[2]) labels[2].innerHTML = t.formDate;
        if (labels[3]) labels[3].innerHTML = t.formTime + ' <span class="timezone-hint">' + t.timezoneHint + '</span>';
        if (labels[4]) labels[4].innerHTML = t.formGuests;
        const accToggle = document.querySelector('.accordion-toggle span');
        if (accToggle) accToggle.textContent = t.formNotes;
        
        const sub = document.querySelector('.btn-submit .btn-text');
        if (sub) sub.textContent = t.formSubmit;
        const fn = document.querySelector('.form-footnote');
        if (fn) fn.textContent = t.formFootnote;

        // FAQ
        const ft2 = document.querySelector('.faq-section .section-title');
        if (ft2) ft2.textContent = t.faqTitle;

        updateGreeting(lang);
        updateOpenStatus(lang);
        localStorage.setItem('kova-lang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }

    const savedLang = localStorage.getItem('kova-lang');
    const browserLang = navigator.language || 'en';
    if (savedLang) setLanguage(savedLang);
    else if (browserLang.startsWith('ar')) setLanguage('ar');
    else setLanguage('en');

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
                text.split(/\s+/).forEach((word, index) => {
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
    const openModalDesktop = document.getElementById('openMeaningModal');
    const openModalMobile = document.getElementById('openMeaningModalMobile');
    const openModalStory = document.getElementById('openMeaningModalStory');
    const closeModalBtns = document.querySelectorAll('[data-close]');

    function openModal() {
        if (!meaningModal) return;
        meaningModal.classList.add('active');
        meaningModal.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
    }
    function closeModal() {
        if (!meaningModal) return;
        meaningModal.classList.remove('active');
        meaningModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    }
    if (openModalDesktop) openModalDesktop.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (openModalMobile) openModalMobile.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (openModalStory) openModalStory.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && meaningModal && meaningModal.classList.contains('active')) closeModal();
    });

    /* ==================== FAQ ACCORDION ==================== */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
            
            if (!isActive) item.classList.add('active');
        });
    });

    /* ==================== NOTES ACCORDION ==================== */
    const notesToggle = document.getElementById('notesToggle');
    const notesContent = document.getElementById('notesContent');
    if (notesToggle && notesContent) {
        notesToggle.addEventListener('click', () => {
            notesToggle.classList.toggle('active');
            notesContent.classList.toggle('open');
        });
    }

    /* ==================== RESERVATION FORM ==================== */
    const reservationForm = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const guestsInput = document.getElementById('resGuests');

    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!guestsInput) return;
            let val = parseInt(guestsInput.value) || 2;
            const action = btn.getAttribute('data-action');
            if (action === 'plus' && val < 12) val++;
            if (action === 'minus' && val > 1) val--;
            guestsInput.value = val;
        });
    });

    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.form-error').forEach(el => {
                el.classList.remove('visible');
                el.textContent = '';
            });
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));

            const name = document.getElementById('resName');
            const phone = document.getElementById('resPhone');
            const date = document.getElementById('resDate');
            const time = document.getElementById('resTime');
            
            let hasError = false;
            const isAr = document.body.classList.contains('rtl');
            const t = translations[isAr ? 'ar' : 'en'];

            function showError(input, message) {
                if (!input) return;
                const err = document.querySelector(`[data-error-for="${input.id}"]`);
                if (err) { err.textContent = message; err.classList.add('visible'); }
                input.closest('.form-group')?.classList.add('has-error');
                hasError = true;
            }

            if (!name.value.trim()) showError(name, t.errName);
            if (!phone.value.trim() || phone.value.replace(/\D/g,'').length < 8) showError(phone, t.errPhone);
            if (!date.value) showError(date, t.errDate);
            if (!time.value) showError(time, t.errTime);

            if (hasError) {
                submitBtn.style.animation = 'shake 0.4s';
                setTimeout(() => submitBtn.style.animation = '', 400);
                return;
            }

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                const toast = document.getElementById('toast');
                const toastTitle = document.getElementById('toastTitle');
                const toastMessage = document.getElementById('toastMessage');
                
                if (toastTitle) toastTitle.textContent = t.toastTitle;
                if (toastMessage) toastMessage.textContent = t.toastMessage;
                
                if (toast) {
                    toast.classList.add('visible');
                    setTimeout(() => toast.classList.remove('visible'), 5000);
                }

                reservationForm.reset();
                if (guestsInput) guestsInput.value = 2;
                
                console.log('✅ Reservation submitted');
            }, 1800);
        });
    }

    /* ==================== NEWSLETTER FORM ==================== */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail');
            if (email && email.value) {
                const isAr = document.body.classList.contains('rtl');
                const t = translations[isAr ? 'ar' : 'en'];
                
                const toast = document.getElementById('toast');
                const toastTitle = document.getElementById('toastTitle');
                const toastMessage = document.getElementById('toastMessage');
                
                if (toastTitle) toastTitle.textContent = t.newsletterTitle;
                if (toastMessage) toastMessage.textContent = t.newsletterMessage;
                
                if (toast) {
                    toast.classList.add('visible');
                    setTimeout(() => toast.classList.remove('visible'), 4000);
                }
                newsletterForm.reset();
            }
        });
    }

    /* ==================== GALLERY LIGHTBOX ==================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src'),
        alt: item.querySelector('img')?.alt || ''
    }));

    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        currentImageIndex = index;
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    }

    function navigateLightbox(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        if (lightboxImg) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = images[currentImageIndex].src;
                lightboxImg.alt = images[currentImageIndex].alt;
                lightboxImg.style.opacity = '1';
            }, 200);
        }
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    /* ==================== AMBIENT SOUND ==================== */
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
                ambientAudio.play().catch(err => console.log('Audio failed:', err));
                soundToggle.classList.add('active');
            }
            soundPlaying = !soundPlaying;
        });
    }

    /* ==================== MAGNETIC BUTTONS ==================== */
    if (window.innerWidth > 768) {
        document.querySelectorAll('.magnetic').forEach(btn => {
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
        if (window.scrollY > window.innerHeight * 0.8) stickyReserve.classList.add('visible');
        else stickyReserve.classList.remove('visible');
    });

    stickyReserve.addEventListener('click', () => {
        document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' });
    });

    /* ==================== FLOATING PARTICLES ==================== */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && window.innerWidth > 768) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (8 + Math.random() * 12) + 's';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.opacity = (0.3 + Math.random() * 0.7);
            p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    /* ==================== QUOTE TICKER ==================== */
    const quotesEn = ["More than coffee. It's a feeling.", "Where time slows down.", "Your table is waiting.", "Kick. Open. Vibe. Atmosphere.", "Good coffee. Better days."];
    const quotesAr = ['أكثر من مجرد قهوة. إنه إحساس.', 'حيث يتوقف الزمن.', 'طاولتك تنتظرك.', 'انطلق. افتح. استمتع. تجربة.', 'قهوة ممتازة. أيام أفضل.'];
    const quoteText = document.getElementById('quoteTicker');
    let quoteIndex = 0;

    if (quoteText) {
        setInterval(() => {
            quoteText.classList.add('fading');
            setTimeout(() => {
                const q = currentLang === 'ar' ? quotesAr : quotesEn;
                quoteIndex = (quoteIndex + 1) % q.length;
                quoteText.textContent = q[quoteIndex];
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
    if (!video) return;

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
            playPromise.then(() => {
                if (!hasPlayed) { hasPlayed = true; console.log(`✅ Video autoplay (${source})`); }
            }).catch((err) => {
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
    });
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) attemptPlay('visibility');
        else video.pause();
    });
    window.addEventListener('focus', () => attemptPlay('focus'));
    window.addEventListener('pageshow', () => attemptPlay('pageshow'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) attemptPlay('intersection'); });
        }, { threshold: 0.1 });
        io.observe(video);
    }

    ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(evt => {
        document.addEventListener(evt, () => attemptPlay('user-int'), { passive: true });
    });

    video.addEventListener('stalled', () => {
        video.load();
        setTimeout(() => attemptPlay('stalled'), 500);
    });

    console.log('🎬 Autoplay handler initialized');
})();