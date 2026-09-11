/* ============================================================
   KOVA CAFÉ - script.js v6.1 (FIXED ORDER)
   ✅ Proper declaration order to avoid TDZ errors
   ✅ Modal close buttons guaranteed to work
   ✅ Event delegation for robustness
   ============================================================ */

/* ============================================================
   GLOBAL MODAL FUNCTIONS (outside DOMContentLoaded)
   ⭐ CRITICAL: Must be global for inline onclick handlers
   ============================================================ */
function openKovaModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('meaningModal');
    if (!modal) {
        console.error('❌ meaningModal not found');
        return;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
}

function closeKovaModal() {
    const modal = document.getElementById('meaningModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
}


/* ============================================================
   MAIN SCRIPT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 KOVA Script v6.1 Loaded');

    /* ============================================================
       ⚠️ PHASE 1: ALL DOM REFERENCES (declared first!)
       ============================================================ */
    
    // Body
    const body = document.body;
    let currentLang = 'en';

    // Header & Nav
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navSectionLinks = document.querySelectorAll('.nav-links a[data-section]');
    const sections = document.querySelectorAll('section[id]');
    const progressBar = document.querySelector('.scroll-progress');

    // Language
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');

    // Hero
    const timeGreeting = document.getElementById('timeGreeting');
    const openStatus = document.getElementById('openStatus');
    const statusText = document.getElementById('statusText');
    const statusDot = openStatus ? openStatus.querySelector('.status-dot') : null;
    const navStatusDot = document.getElementById('navStatusDot');
    const splitHeadline = document.getElementById('splitHeadline');

    // Menu
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');
    const menuCategoryLabel = document.getElementById('menuCategoryLabel');

    // Gallery
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Counters & Reveals
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');

    // Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const guestsInput = document.getElementById('resGuests');
    const timeInput = document.getElementById('resTime');
    const dateInput = document.getElementById('resDate');
    const timeChips = document.querySelectorAll('.time-chip');
    const summaryBar = document.getElementById('resLiveSummary');
    const summaryText = document.getElementById('summaryText');
    const resDay = document.getElementById('resDay');
    const resMonth = document.getElementById('resMonth');
    const resDateHidden = document.getElementById('resDate');
    const dateHint = document.getElementById('dateHint');
    const nameInputRT = document.getElementById('resName');
    const phoneInputRT = document.getElementById('resPhone');
    const notesToggle = document.getElementById('notesToggle');
    const notesContent = document.getElementById('notesContent');

    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqItems = document.querySelectorAll('.faq-item');

    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    // Sound
    const soundToggle = document.getElementById('soundToggle');
    const ambientAudio = document.getElementById('ambientAudio');

    // Footer Map
    const mapToggle = document.getElementById('mapToggle');
    const mapWrapper = document.getElementById('mapWrapper');

    // Toast
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    // Particles
    const particlesContainer = document.getElementById('particles');

    /* ============================================================
       ⚠️ PHASE 2: TRANSLATIONS OBJECT
       ============================================================ */
    const translations = {
        en: {
            headlineLine1: 'Good Coffee', headlineLine2: 'Better Days',
            subheadline: "More than coffee. It's a feeling you'll want to come back to.",
            subheadlineMobile: "More than coffee. It's a feeling.",
            btnPrimary: 'Reserve a Table', btnSecondary: 'Our Story',
            scrollIndicator: 'Scroll to Explore',
            reserve: 'Reserve',
            aboutEyebrow: 'ABOUT KOVA',
            aboutTitle: 'More Than Coffee.<br>It\'s a Feeling.',
            aboutSubtitle: 'KOVA — Kick, Open, Vibe, Atmosphere',
            galleryTitle: 'The KOVA Gallery',
            gallerySubtitle: 'A glimpse into the KOVA experience',
            galleryAll: 'All', galleryCoffee: 'Coffee', galleryInterior: 'Interior', galleryBrand: 'Brand',
            galleryCaptions: [
                'Welcome to KOVA', 'Evening Ambience', 'Sip The Feeling',
                'Signature Latte', 'Our Menu', 'Every Table Tells a Tale'
            ],
            ourMenu: 'Our Menu',
            coffee: 'COFFEE', nonCoffee: 'NON COFFEE', desserts: 'DESSERTS',
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
            faqTitle: 'Frequently Asked Questions',
            toastTitle: 'Reservation Confirmed',
            toastMessage: "We'll send you a confirmation on WhatsApp shortly.",
            newsletterTitle: 'Subscribed',
            newsletterMessage: 'Thanks for joining!',
            errName: 'Please enter your name',
            errPhone: 'Please enter a valid phone number',
            errDate: 'Please select a date',
            errTime: 'Please select a time',
            dateHint: '(From tomorrow onwards)',
            summaryEmpty: '👆 Pick a date & time to get started',
            nameTooShort: 'Name is too short'
        },
        ar: {
            headlineLine1: 'قهوة ممتازة', headlineLine2: 'أيام أفضل',
            subheadline: 'أكثر من مجرد قهوة. إنه إحساس ستعود إليه دائماً.',
            subheadlineMobile: 'أكثر من قهوة. إنه إحساس.',
            btnPrimary: 'احجز طاولة', btnSecondary: 'قصتنا',
            scrollIndicator: 'مرر للأسفل',
            reserve: 'احجز',
            aboutEyebrow: 'عن كوفا',
            aboutTitle: 'أكثر من قهوة.<br>إنه إحساس.',
            aboutSubtitle: 'كوفا — انطلق، افتح، استمتع، أجواء',
            galleryTitle: 'معرض كوفا',
            gallerySubtitle: 'لمحة من تجربة كوفا',
            galleryAll: 'الكل', galleryCoffee: 'قهوة', galleryInterior: 'المكان', galleryBrand: 'البراند',
            galleryCaptions: [
                'أهلاً بك في كوفا', 'أجواء المساء', 'ارتشف الإحساس',
                'اللاتيه المميز', 'قائمتنا', 'كل طاولة تحكي حكاية'
            ],
            ourMenu: 'قائمتنا',
            coffee: 'قهوة', nonCoffee: 'مش قهوة', desserts: 'حلويات',
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
            faqTitle: 'الأسئلة الشائعة',
            toastTitle: 'تم الحجز بنجاح',
            toastMessage: 'هنبعتلك تأكيد على الواتساب قريباً.',
            newsletterTitle: 'تم الاشتراك',
            newsletterMessage: 'شكراً لانضمامك!',
            errName: 'الرجاء إدخال الاسم',
            errPhone: 'الرجاء إدخال رقم هاتف صحيح',
            errDate: 'الرجاء اختيار التاريخ',
            errTime: 'الرجاء اختيار الوقت',
            dateHint: '(من بكرة وأكثر)',
            summaryEmpty: '👆 اختر التاريخ والوقت للبدء',
            nameTooShort: 'الاسم قصير جداً'
        }
    };

    /* ============================================================
       ⚠️ PHASE 3: HELPER FUNCTIONS (all functions declared before use)
       ============================================================ */

    // --- Toast Helper ---
    function showMiniToast(title, message, duration = 2500) {
        if (!toast) return;
        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('visible');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('visible'), duration);
    }

    // --- Time Greeting ---
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

    // --- Open Status ---
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

        if (navStatusDot) {
            navStatusDot.classList.toggle('closed', !isOpen);
            navStatusDot.title = isOpen
                ? (lang === 'ar' ? 'مفتوح الآن' : 'Open Now')
                : (lang === 'ar' ? 'مغلق' : 'Closed');
        }
    }

    // --- Split Text Reveal ---
    function splitTextReveal() {
        if (!splitHeadline) return;
        const isArabic = body.classList.contains('rtl');
        const lines = splitHeadline.querySelectorAll('.line');
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

    // --- Live Summary (SAFE — reads DOM every time) ---
    function updateLiveSummary() {
        const summaryTextEl = document.getElementById('summaryText');
        const summaryBarEl = document.getElementById('resLiveSummary');
        const guestsEl = document.getElementById('resGuests');
        const dateEl = document.getElementById('resDate');
        const timeEl = document.getElementById('resTime');

        if (!summaryTextEl) return;
        const isAr = currentLang === 'ar';

        const guests = parseInt(guestsEl?.value) || 2;
        const dateVal = dateEl?.value;
        const timeVal = timeEl?.value;

        // Empty state
        if (!dateVal && !timeVal) {
            summaryTextEl.innerHTML = isAr
                ? '<span class="summary-hint">👆 اختر التاريخ والوقت للبدء</span>'
                : '<span class="summary-hint">👆 Pick a date & time to get started</span>';
            if (summaryBarEl) summaryBarEl.classList.remove('ready');
            return;
        }

        let finalText;

        if (isAr) {
            finalText = `طاولة لـ ${guests} أفراد`;
            if (timeVal) {
                const [h, m] = timeVal.split(':');
                const hour = parseInt(h);
                const ampm = hour >= 12 ? 'م' : 'ص';
                const hour12 = hour % 12 || 12;
                finalText += ` · ${hour12}:${m} ${ampm}`;
            }
            if (dateVal) {
                const today = new Date();
                const selected = new Date(dateVal);
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const todayStr = today.toISOString().split('T')[0];
                const tomorrowStr = tomorrow.toISOString().split('T')[0];

                if (dateVal === todayStr) finalText += ' · اليوم';
                else if (dateVal === tomorrowStr) finalText += ' · غداً';
                else {
                    finalText += ` · ${selected.getDate()}/${selected.getMonth() + 1}`;
                }
            }
        } else {
            finalText = `Table for ${guests}`;
            if (timeVal) {
                const [h, m] = timeVal.split(':');
                const hour = parseInt(h);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                finalText += ` · ${hour12}:${m} ${ampm}`;
            }
            if (dateVal) {
                const today = new Date();
                const selected = new Date(dateVal);
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const todayStr = today.toISOString().split('T')[0];
                const tomorrowStr = tomorrow.toISOString().split('T')[0];

                if (dateVal === todayStr) finalText += ' · Today';
                else if (dateVal === tomorrowStr) finalText += ' · Tomorrow';
                else {
                    finalText += ` · ${selected.getDate()}/${selected.getMonth() + 1}`;
                }
            }
        }

        const isReady = dateVal && timeVal;
        summaryTextEl.innerHTML = finalText;
        if (summaryBarEl) summaryBarEl.classList.toggle('ready', isReady);
    }

    // --- Set Language ---
    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        if (lang === 'ar') {
            body.classList.add('rtl');
            document.documentElement.setAttribute('lang', 'ar');
            document.documentElement.setAttribute('dir', 'rtl');
            if (langToggle) langToggle.querySelector('.lang-ar')?.classList.add('active');
            if (langToggle) langToggle.querySelector('.lang-en')?.classList.remove('active');
            if (langToggleMobile) langToggleMobile.querySelector('.lang-ar')?.classList.add('active');
            if (langToggleMobile) langToggleMobile.querySelector('.lang-en')?.classList.remove('active');
        } else {
            body.classList.remove('rtl');
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
            if (langToggle) langToggle.querySelector('.lang-en')?.classList.add('active');
            if (langToggle) langToggle.querySelector('.lang-ar')?.classList.remove('active');
            if (langToggleMobile) langToggleMobile.querySelector('.lang-en')?.classList.add('active');
            if (langToggleMobile) langToggleMobile.querySelector('.lang-ar')?.classList.remove('active');
        }

        // Hero
        if (splitHeadline) {
            const lines = splitHeadline.querySelectorAll('.line');
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

        const bp = document.querySelector('.btn-text-reserve');
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

        // About
        const aboutEyebrow = document.querySelector('.about-section .section-eyebrow');
        if (aboutEyebrow) aboutEyebrow.textContent = t.aboutEyebrow;
        const aboutTitle = document.querySelector('.about-title');
        if (aboutTitle) aboutTitle.innerHTML = t.aboutTitle;
        const aboutSub = document.querySelector('.about-subtitle');
        if (aboutSub) aboutSub.textContent = t.aboutSubtitle;

        // Gallery
        const gt = document.querySelector('.gallery-section .section-title');
        if (gt) gt.textContent = t.galleryTitle;
        const gs = document.querySelector('.gallery-subtitle');
        if (gs) gs.textContent = t.gallerySubtitle;
        const gf = document.querySelectorAll('.gallery-filter');
        if (gf[0]) gf[0].textContent = t.galleryAll;
        if (gf[1]) gf[1].textContent = t.galleryCoffee;
        if (gf[2]) gf[2].textContent = t.galleryInterior;
        if (gf[3]) gf[3].textContent = t.galleryBrand;

        const captions = document.querySelectorAll('.gallery-caption');
        if (t.galleryCaptions) {
            captions.forEach((cap, i) => {
                if (t.galleryCaptions[i]) cap.textContent = t.galleryCaptions[i];
            });
        }

        // Menu
        const mt = document.querySelector('.menu-section .section-title');
        if (mt) mt.textContent = t.ourMenu;
        const tb = document.querySelectorAll('.tab-btn');
        if (tb[0]) tb[0].textContent = t.coffee;
        if (tb[1]) tb[1].textContent = t.nonCoffee;
        if (tb[2]) tb[2].textContent = t.desserts;

        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && menuCategoryLabel) {
            menuCategoryLabel.textContent = activeTab.textContent.trim();
        }

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
        if (labels[2]) labels[2].innerHTML = t.formDate + ' <span class="date-hint" id="dateHint">' + t.dateHint + '</span>';
        if (labels[3]) labels[3].innerHTML = t.formTime + ' <span class="timezone-hint">' + t.timezoneHint + '</span>';
        if (labels[4]) labels[4].innerHTML = t.formGuests;

        const accToggle = document.querySelector('.accordion-toggle span');
        if (accToggle) accToggle.textContent = t.formNotes;

        const sub = document.querySelector('.btn-submit .btn-text');
        if (sub) sub.textContent = t.formSubmit;
        const fn = document.querySelector('.form-footnote');
        if (fn) fn.textContent = t.formFootnote;

        // FAQ
        const faqTitle = document.querySelector('.faq-inline-title');
        if (faqTitle) faqTitle.textContent = t.faqTitle;

        // Update dynamic values
        updateGreeting(lang);
        updateOpenStatus(lang);
        updateLiveSummary();

        // Save preference
        try { localStorage.setItem('kova-lang', lang); } catch(e) {}
    }

    /* ============================================================
       ⚠️ PHASE 4: DATE SELECTOR (needs to be set up early)
       ============================================================ */
    let populateDaysFunction = null;

    if (resDay && resMonth && resDateHidden) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Populate Months
        resMonth.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const d = new Date(currentYear, currentMonth + i, 1);
            const opt = document.createElement('option');
            opt.value = d.getMonth();
            opt.textContent = d.toLocaleString('default', { month: 'long' });
            resMonth.appendChild(opt);
        }
        resMonth.value = currentMonth;

        populateDaysFunction = function () {
            resDay.innerHTML = '';
            const selectedMonth = parseInt(resMonth.value);
            let selectedYear = currentYear;
            if (selectedMonth < currentMonth) selectedYear++;

            const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            for (let i = 1; i <= daysInMonth; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = i;

                if (selectedMonth === currentMonth && selectedYear === currentYear) {
                    if (i < tomorrow.getDate()) opt.disabled = true;
                }
                resDay.appendChild(opt);
            }

            if (selectedMonth === currentMonth && selectedYear === currentYear) {
                resDay.value = tomorrow.getDate();
            } else {
                resDay.value = 1;
            }
            updateHiddenDate();
        };

        function updateHiddenDate() {
            const m = String(parseInt(resMonth.value) + 1).padStart(2, '0');
            const d = String(resDay.value).padStart(2, '0');
            const selectedMonth = parseInt(resMonth.value);
            let selectedYear = currentYear;
            if (selectedMonth < currentMonth) selectedYear++;
            resDateHidden.value = `${selectedYear}-${m}-${d}`;
            updateLiveSummary();
        }

        resMonth.addEventListener('change', populateDaysFunction);
        resDay.addEventListener('change', updateHiddenDate);

        populateDaysFunction();
    }

    /* ============================================================
       ⚠️ PHASE 5: EVENT LISTENERS
       ============================================================ */

    // --- 1. Scroll Progress ---
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }

    // --- 2. Preloader ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.classList.add('hidden');
        }, 1500);
    });

    // --- 3. Header Scroll ---
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 4. Active Section Indicator ---
    function updateActiveSection() {
        const scrollPos = window.scrollY + 200;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            currentSection = 'reservation';
        }

        navSectionLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('load', updateActiveSection);

    // --- 5. Mobile Menu ---
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

    // --- 6. Language Toggles ---
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

    // --- 7. Menu Tabs ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (menuCategoryLabel) {
                menuCategoryLabel.style.opacity = '0';
                setTimeout(() => {
                    menuCategoryLabel.textContent = button.textContent.trim();
                    menuCategoryLabel.style.opacity = '0.95';
                }, 200);
            }

            menuPanels.forEach(panel => panel.classList.remove('active'));
            const targetId = button.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // --- 8. Add to Order Buttons ---
    document.querySelectorAll('.btn-add-order').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (this.classList.contains('added')) return;

            const item = this.closest('.menu-item');
            const itemName = item?.querySelector('.menu-item-name')?.textContent.trim() || '';
            const isAr = body.classList.contains('rtl');

            this.classList.add('added');
            const icon = this.querySelector('svg');
            const originalHTML = icon.innerHTML;
            icon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';

            showMiniToast(
                isAr ? 'تمت الإضافة' : 'Added to Order',
                itemName.split('(')[0].trim()
            );

            setTimeout(() => {
                this.classList.remove('added');
                icon.innerHTML = originalHTML;
            }, 1500);
        });
    });

    // --- 9. Gallery Filters ---
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

    // --- 10. Scroll Reveal ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                const rect = entry.boundingClientRect;
                const isFullyOut = rect.bottom < 0 || rect.top > window.innerHeight;
                if (isFullyOut) entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -80px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 11. Animated Counters ---
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || 0);
        const duration = 2000;
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = target * eased;

            el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);

            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
        }
        requestAnimationFrame(update);
    }

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target);
                } else {
                    const rect = entry.boundingClientRect;
                    const isFullyOut = rect.bottom < 0 || rect.top > window.innerHeight;
                    if (isFullyOut) {
                        const decimals = parseInt(entry.target.getAttribute('data-decimals') || 0);
                        entry.target.textContent = decimals > 0 ? '0.0' : '0';
                    }
                }
            });
        }, { threshold: 0.5, rootMargin: "0px 0px -100px 0px" });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // --- 12. MEANING MODAL — Event Delegation (ROBUST!) ---
    // This uses event delegation so it works regardless of DOM order
    document.addEventListener('click', (e) => {
        // Close button or backdrop
        if (e.target.closest('[data-close]')) {
            e.preventDefault();
            closeKovaModal();
        }
    });

    // ESC key closes any modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('meaningModal');
            if (modal && modal.classList.contains('active')) {
                closeKovaModal();
            }
        }
    });

    console.log('✅ Modal system initialized (event delegation)');

    // --- 13. FAQ Accordion ---
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // --- 14. Notes Accordion ---
    if (notesToggle && notesContent) {
        notesToggle.addEventListener('click', () => {
            notesToggle.classList.toggle('active');
            notesContent.classList.toggle('open');
        });
    }

    // --- 15. Time Chips ---
    timeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            timeChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            if (timeInput) timeInput.value = chip.getAttribute('data-time');
            updateLiveSummary();
        });
    });

    // --- 16. Guest Buttons ---
    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!guestsInput) return;
            let val = parseInt(guestsInput.value) || 2;
            const action = btn.getAttribute('data-action');
            if (action === 'plus' && val < 12) val++;
            if (action === 'minus' && val > 1) val--;
            guestsInput.value = val;
            updateLiveSummary();
        });
    });

    // --- 17. Real-time Validation ---
    if (nameInputRT) {
        let nameDebounce;
        nameInputRT.addEventListener('input', () => {
            clearTimeout(nameDebounce);
            nameDebounce = setTimeout(() => {
                const val = nameInputRT.value.trim();
                const err = document.querySelector('[data-error-for="resName"]');
                const group = nameInputRT.closest('.form-group');
                const t = translations[currentLang];

                if (val.length > 0 && val.length < 2) {
                    if (err) { err.textContent = t.nameTooShort; err.classList.add('visible'); }
                    group?.classList.add('has-error');
                    group?.classList.remove('is-valid');
                } else if (val.length >= 2) {
                    if (err) err.classList.remove('visible');
                    group?.classList.remove('has-error');
                    group?.classList.add('is-valid');
                } else {
                    group?.classList.remove('has-error', 'is-valid');
                }
            }, 500);
        });
    }

    if (phoneInputRT) {
        let phoneDebounce;
        phoneInputRT.addEventListener('input', () => {
            let val = phoneInputRT.value.replace(/[^\d+]/g, '');
            if (val.length > 0 && !val.startsWith('+') && val.startsWith('0')) {
                val = '+20' + val.substring(1);
            }
            phoneInputRT.value = val;

            clearTimeout(phoneDebounce);
            phoneDebounce = setTimeout(() => {
                const digits = phoneInputRT.value.replace(/\D/g, '');
                const err = document.querySelector('[data-error-for="resPhone"]');
                const group = phoneInputRT.closest('.form-group');
                const t = translations[currentLang];

                if (digits.length > 0 && digits.length < 10) {
                    if (err) { err.textContent = t.errPhone; err.classList.add('visible'); }
                    group?.classList.add('has-error');
                    group?.classList.remove('is-valid');
                } else if (digits.length >= 10) {
                    if (err) err.classList.remove('visible');
                    group?.classList.remove('has-error');
                    group?.classList.add('is-valid');
                } else {
                    group?.classList.remove('has-error', 'is-valid');
                }
            }, 500);
        });
    }

    // --- 18. Reservation Form Submit ---
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
            const t = translations[currentLang];

            function showError(input, message) {
                if (!input) return;
                const err = document.querySelector(`[data-error-for="${input.id}"]`);
                if (err) { err.textContent = message; err.classList.add('visible'); }
                input.closest('.form-group')?.classList.add('has-error');
                hasError = true;
            }

            if (!name.value.trim()) showError(name, t.errName);
            if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) showError(phone, t.errPhone);
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
                submitBtn.classList.add('success');

                showMiniToast(t.toastTitle, t.toastMessage, 5000);

                // Reset form
                reservationForm.reset();
                if (guestsInput) guestsInput.value = 2;
                timeChips.forEach(c => c.classList.remove('selected'));

                if (resMonth && populateDaysFunction) {
                    const today = new Date();
                    resMonth.value = today.getMonth();
                    populateDaysFunction();
                }

                document.querySelectorAll('.form-group').forEach(el => el.classList.remove('is-valid', 'has-error'));

                updateLiveSummary();

                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2200);

                console.log('✅ Reservation submitted');
            }, 1800);
        });
    }

    // --- 19. Newsletter Form ---
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail');
            if (email && email.value) {
                const t = translations[currentLang];
                showMiniToast(t.newsletterTitle, t.newsletterMessage, 4000);
                newsletterForm.reset();
            }
        });
    }

    // --- 20. Gallery Lightbox ---
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

    // --- 21. Ambient Sound ---
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

    // --- 22. Magnetic Buttons ---
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

    // --- 23. Ripple Effect ---
    document.querySelectorAll('.btn-primary, .btn-submit, .btn-secondary, .btn-reserve').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- 24. Footer Map Collapsible ---
    if (mapToggle && mapWrapper) {
        mapToggle.addEventListener('click', () => {
            mapToggle.classList.toggle('open');
            mapWrapper.classList.toggle('open');
        });
    }

    // --- 25. Sticky Reserve Button ---
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

    // --- 26. Floating Particles ---
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

    /* ============================================================
       ⚠️ PHASE 6: INITIALIZATION (LAST — everything is ready now!)
       ============================================================ */

    // Initialize language (safe now — all functions and vars exist)
    const savedLang = localStorage.getItem('kova-lang');
    const browserLang = navigator.language || 'en';
    if (savedLang) setLanguage(savedLang);
    else if (browserLang.startsWith('ar')) setLanguage('ar');
    else setLanguage('en');

    // Initial UI state
    updateGreeting(currentLang);
    updateOpenStatus(currentLang);
    updateLiveSummary();

    console.log('✅ All KOVA v6.1 interactions initialized');
});


/* ============================================================
   🎬 AGGRESSIVE VIDEO AUTOPLAY (outside DOMContentLoaded)
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
            }).catch(() => {
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