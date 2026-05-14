/* =====================
   NAVBAR SCROLL
===================== */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* =====================
   HERO BACKGROUND IMAGE
   Se hero-bg.jpg non esiste o non si carica,
   l'overlay viene rimosso e si usa il gradiente CSS
===================== */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  const bgUrl = heroBg.style.backgroundImage;
  // Controlla se c'è davvero un url impostato
  if (bgUrl && bgUrl !== 'url("")' && bgUrl !== "url('')") {
    // Testa se l'immagine esiste
    const testImg = new Image();
    const urlMatch = bgUrl.match(/url\(["']?(.+?)["']?\)/);
    if (urlMatch) {
      testImg.onerror = () => {
        // Immagine non trovata: rimuovi lo stile e usa il fallback CSS
        heroBg.style.backgroundImage = '';
        heroBg.style.background = '';
        console.info('[Hero] Immagine di sfondo non trovata. Usa gradiente di fallback.');
      };
      testImg.src = urlMatch[1];
    }
  }
}

/* =====================
   SCROLL REVEAL
   Carte e blocchi appaiono in dissolvenza
===================== */
const revealEls = document.querySelectorAll('.card, .fin-block, .quote-card');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    io.observe(el);
  });
}
