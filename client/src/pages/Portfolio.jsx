import { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { ProjectModal } from '../components/ProjectModal';
import { MenuOverlay } from '../components/MenuOverlay';
import { API_URL } from '../utils/api';
import styles from '../page.module.css';

/* ── Constants ─────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const PROJECTS = [
  {
    id: 1,
    index: '01',
    title: 'Re-design of Government Website',
    category: 'UI/UX Design',
    completed: 'December 2024',
    role: 'Data Collection, UX Research & UI/UX Design',
    overview:
      'The objective of this project was to redesign the UI/UX of the pre-existing government website, Pradhan Mantri Fasal Bima Yojana (PMFBY). The goal was to create a better user experience by making the website simpler, easier to understand, and easier to navigate, helping users find the information and services they need more easily.',
    image: '/images/pmfby_front_image.png',
    github: null,
    liveUrl: 'https://pmfby.framer.website/',
  },
  {
    id: 2,
    index: '02',
    title: 'Hackathon Database',
    category: 'DBMS',
    completed: 'November 2025',
    role: 'Database Design & Development',
    overview:
      'This project was completed as part of a DBMS course project. The objective was to apply the knowledge and concepts learned in the course by designing and implementing a Database Management System that could help organizers conduct and manage a hackathon smoothly and efficiently.',
    image: '/images/hackathon_front_image.png',
    github: null,
    liveUrl: null,
  },
  {
    id: 3,
    index: '03',
    title: 'Indian Sign Language Model',
    category: 'AI / ML',
    completed: 'February 2026',
    role: 'Data Collection, Model Training & Frontend Design',
    overview:
      "This is an AI/ML-based project designed to help visually impaired people communicate during conversations. The system uses a camera to capture the person's live hand signs. Based on the learned model, the hand signs are translated into written sentences, helping a person who does not know sign language understand what the person is trying to communicate.",
    image: '/images/signlanguage_front_image.png',
    github: 'https://github.com/hardik24205hirwal/Indian-Sign-Language-Recognition.git',
    liveUrl: null,
  },
  {
    id: 4,
    index: '04',
    title: 'Medicine Directory',
    category: 'AI / ML',
    completed: 'May 2026',
    role: 'Data Collection & Model Training',
    overview:
      'This is an AI/ML-based project where the model is trained using information about medicines and their side effects. The purpose of the project is to provide advice based on the symptoms entered by the user. The model provides a suitable medicine along with information about its side effects, as well as techniques, exercises, and dietary guidance intended to support faster recovery.',
    image: '/images/medicine_front_image.png',
    github: 'https://github.com/MayankSoni111/Medical_AI_Prediction_System.git',
    liveUrl: null,
  },
];

export function Portfolio() {
  /* Theme */
  const [theme, setTheme] = useState('day');
  /* Menu */
  const [menuOpen, setMenuOpen] = useState(false);
  /* Modal */
  const [activeProject, setActiveProject] = useState(null);

  /* Contact form state */
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formMessage, setFormMessage] = useState('');

  /* Carousel state */
  const [carouselIndex, setCarouselIndex] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);
  const currentTranslate = useRef(0);
  const hasDragged = useRef(false);

  /*
   * SHARED PORTRAIT — one DOM node, fixed layer.
   * Parallax: RAF loop lerps mouse position → applies transform.
   * Scroll fade: opacity drops as Projects section enters viewport.
   */
  const portraitRef = useRef(null);
  const rafRef = useRef(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCur = useRef({ x: 0, y: 0 });

  /* ── Theme init ─────────────────────────────────────────── */
useEffect(() => {
  const isMobileOrTablet = window.matchMedia('(max-width: 1024px)').matches;

  const saved = isMobileOrTablet
    ? 'night'
    : (localStorage.getItem('theme') || 'day');

  setTheme(saved);
  document.documentElement.setAttribute('data-theme', saved);
}, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'day' ? 'night' : 'day';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  /* ── Portrait parallax RAF loop ─────────────────────────── */
  useEffect(() => {
    const EASE = 0.07;
    const run = () => {
      mouseCur.current.x += (mouseTarget.current.x - mouseCur.current.x) * EASE;
      mouseCur.current.y += (mouseTarget.current.y - mouseCur.current.y) * EASE;
      if (portraitRef.current) {
        const dx = mouseCur.current.x * 18;
        const dy = mouseCur.current.y * 11;
        /* translate(-50%) centers the fixed portrait; dx/dy add parallax offset */
        portraitRef.current.style.transform = `translate(calc(-50% + ${dx.toFixed(2)}px), ${dy.toFixed(2)}px)`;
      }
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Portrait scroll fade ───────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      if (!portraitRef.current) return;
      const projectsEl = document.getElementById('projects');
      if (!projectsEl) return;
      const rect = projectsEl.getBoundingClientRect();
      /* Start fading when Projects top is 80% down the viewport; fully gone at 30% */
      const startFade = window.innerHeight * 0.8;
      const endFade = window.innerHeight * 0.3;
      const opacity = Math.max(0, Math.min(1, (rect.top - endFade) / (startFade - endFade)));
      portraitRef.current.style.opacity = opacity.toFixed(3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseTarget.current = { x: nx, y: ny };
  }, []);

  /* ── Menu keyboard / Escape ─────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Body scroll lock ───────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen || activeProject ? 'hidden' : '';
  }, [menuOpen, activeProject]);

  /* ── Carousel helpers ───────────────────────────────────── */
  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 360;
    const card = trackRef.current.querySelector('article');
    if (!card) return 360;
    const cs = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 20;
    return card.offsetWidth + gap;
  }, []);

  const snapToIndex = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(PROJECTS.length - 1, idx));
      setCarouselIndex(clamped);
      if (trackRef.current) {
        const cardW = getCardWidth();
        const translate = -(clamped * cardW);
        currentTranslate.current = translate;
        trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        trackRef.current.style.transform = `translateX(${translate}px)`;
      }
    },
    [getCardWidth]
  );

  const goNext = useCallback(() => snapToIndex(carouselIndex + 1), [carouselIndex, snapToIndex]);
  const goPrev = useCallback(() => snapToIndex(carouselIndex - 1), [carouselIndex, snapToIndex]);

  /* ── Drag / Touch handlers ──────────────────────────────── */
  const onDragStart = useCallback((clientX) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = clientX;
    dragStartTranslate.current = currentTranslate.current;
    trackRef.current.style.transition = 'none';
    trackRef.current.style.cursor = 'grabbing';
  }, []);

  const onDragMove = useCallback((clientX) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = clientX - dragStartX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    const translate = dragStartTranslate.current + dx;
    currentTranslate.current = translate;
    trackRef.current.style.transform = `translateX(${translate}px)`;
  }, []);

  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = '';
    const diff = currentTranslate.current - dragStartTranslate.current;
    const threshold = getCardWidth() * 0.2;
    let newIndex = carouselIndex;
    if (diff < -threshold) newIndex = carouselIndex + 1;
    else if (diff > threshold) newIndex = carouselIndex - 1;
    snapToIndex(newIndex);
  }, [carouselIndex, getCardWidth, snapToIndex]);

  /* Mouse events */
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      onDragStart(e.clientX);
    },
    [onDragStart]
  );

  const onMouseMove = useCallback(
    (e) => {
      onDragMove(e.clientX);
    },
    [onDragMove]
  );

  const onMouseUp = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  const onMouseLeave = useCallback(() => {
    if (isDragging.current) onDragEnd();
  }, [onDragEnd]);

  /* Touch events */
  const onTouchStart = useCallback(
    (e) => {
      onDragStart(e.touches[0].clientX);
    },
    [onDragStart]
  );

  const onTouchMove = useCallback(
    (e) => {
      onDragMove(e.touches[0].clientX);
    },
    [onDragMove]
  );

  const onTouchEnd = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  /* Snap to correct position on resize */
  useEffect(() => {
    const onResize = () => snapToIndex(carouselIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [carouselIndex, snapToIndex]);

  /* ── Contact form submit ─────────────────────────────────── */
  const handleContactSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (formStatus === 'submitting') return;

      setFormStatus('submitting');
      setFormMessage('');

      try {
        const res = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactForm),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setFormStatus('success');
          setFormMessage(data.message || 'Your message has been sent successfully.');
          setContactForm({ name: '', email: '', message: '' });
        } else {
          setFormStatus('error');
          setFormMessage(data.message || 'Something went wrong. Please try again.');
        }
      } catch {
        setFormStatus('error');
        setFormMessage('Unable to connect to the server. Please try again later.');
      }
    },
    [contactForm, formStatus]
  );

  /* ── Resume download ────────────────────────────────────── */
  const handleResumeDownload = useCallback(() => {
  window.open(`${API_URL}/resume/download`, '_blank');
}, []);

  /* ── Smooth nav scroll ──────────────────────────────────── */
  const scrollTo = useCallback((href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, []);

  return (
    <div className={styles.root} onMouseMove={handleMouseMove}>
      {/* ── Grain texture overlay ─────────────────────────── */}
      <div className={`${styles.grain} grain-overlay`} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════
          SHARED PORTRAIT — position:fixed, z-index 5
          ONE instance used by both Home and About.
          Parallax applied via portraitRef RAF loop.
          Fades out when Projects scrolls into view.
          ═══════════════════════════════════════════════════ */}
      <div
        ref={portraitRef}
        id="shared-portrait"
        className={styles.portraitFixed}
        aria-hidden="true"
      >
        <img
          src="/images/hardik_portrait.png"
          alt="Hardik Hirwal portrait"
          width="900"
          height="1100"
          draggable={false}
          className={styles.portraitImg}
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          NAVBAR / TOP BAR
          ═══════════════════════════════════════════════════ */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      {/* ═══════════════════════════════════════════════════
          HOME SECTION
          ═══════════════════════════════════════════════════ */}
      <Home />

      {/* ═══════════════════════════════════════════════════
          ABOUT SECTION
          ═══════════════════════════════════════════════════ */}
      <About handleResumeDownload={handleResumeDownload} />

      {/* ═══════════════════════════════════════════════════
          PROJECTS SECTION
          ═══════════════════════════════════════════════════ */}
      <Projects
        projects={PROJECTS}
        carouselIndex={carouselIndex}
        snapToIndex={snapToIndex}
        goPrev={goPrev}
        goNext={goNext}
        trackRef={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        setActiveProject={setActiveProject}
        hasDragged={hasDragged}
      />

      {/* ═══════════════════════════════════════════════════
          SKILLS SECTION
          ═══════════════════════════════════════════════════ */}
      <Skills />

      {/* ═══════════════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════════════ */}
      <Contact
        contactForm={contactForm}
        setContactForm={setContactForm}
        formStatus={formStatus}
        formMessage={formMessage}
        handleContactSubmit={handleContactSubmit}
      />

      {/* ═══════════════════════════════════════════════════
          FULL-SCREEN MENU OVERLAY
          ═══════════════════════════════════════════════════ */}
      <MenuOverlay
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navItems={NAV_ITEMS}
        scrollTo={scrollTo}
      />

      {/* ═══════════════════════════════════════════════════
          PROJECT MODAL
          ═══════════════════════════════════════════════════ */}
      <ProjectModal
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
    </div>
  );
}

export default Portfolio;
