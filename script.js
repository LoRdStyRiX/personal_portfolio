// ============================================================================
// GSAP & Core Setup
// ============================================================================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

// Initialize ScrollSmoother
let smoother;

function initializeSmoother() {
  if (window.innerWidth > 768) {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });
  }
}

document.body.style.overflow = 'auto';

setTimeout(() => {
  initializeSmoother();
}, 100);

startPageAnimations();

// ============================================================================
// PAGE ANIMATIONS
// ============================================================================

function startPageAnimations() {
  gsap.set('.subtitle', { opacity: 0, y: 20 });
  gsap.set('.hero-word', { opacity: 1, y: 0 });
  gsap.set('.hero-desc', { opacity: 0, y: 20 });
  gsap.set('.hero-cta', { opacity: 0, y: 20 });

  gsap.to('.subtitle', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.3,
    ease: 'power2.out'
  });

  document.querySelectorAll('.hero-word').forEach((word, i) => {
    gsap.from(word, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      delay: 0.6 + i * 0.3,
      ease: 'power2.out'
    });
  });

  gsap.to('.hero-desc', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 1.8,
    ease: 'power2.out'
  });

  gsap.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 2.2,
    ease: 'power2.out'
  });

  // Scroll indicator fade
  gsap.to('.scroll-indicator', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    opacity: 0,
  });
}

// ============================================================================
// CUSTOM CURSOR SYSTEM
// ============================================================================

const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
const followerText = document.querySelector('.follower__content');

let mouseX = 0, mouseY = 0;
let isHovering = false;

gsap.set(".cursor-follower", { xPercent: -50, yPercent: -50 });
gsap.set(".custom-cursor", { xPercent: -50, yPercent: -50 });

let cursorXTo = gsap.quickTo(".custom-cursor", "x", { duration: 0.5, ease: "power2" }),
  cursorYTo = gsap.quickTo(".custom-cursor", "y", { duration: 0.5, ease: "power2" }),
  followerXTo = gsap.quickTo(".cursor-follower", "x", { duration: 0.9, ease: "power2" }),
  followerYTo = gsap.quickTo(".cursor-follower", "y", { duration: 0.9, ease: "power2" });

window.addEventListener('mousemove', (e) => {
  cursorXTo(e.clientX);
  cursorYTo(e.clientY);
  followerXTo(e.clientX);
  followerYTo(e.clientY);
}, { passive: true });

// Follower animation
let followerAnim = gsap.timeline({ paused: true });

followerAnim.to('.follower__inner__top', {
  scale: 2,
  opacity: 1,
  backgroundColor: 'black',
  duration: 0.6,
  ease: 'power2.out',
}, 0);
followerAnim.to('.follower__content', {
  opacity: 1,
  duration: 0.5,
  ease: 'power2.out',
}, 0.2);

function animateFollower(direction = 'in') {
  if (direction == 'in') {
    followerAnim.timeScale(1).play();
  } else {
    followerAnim.timeScale(1.5).reverse();
  }
}

// ============================================================================
// GALLERY & INTERACTIVE HOVER EFFECTS
// ============================================================================

document.querySelectorAll('.followerchangetest').forEach(item => {
  item.addEventListener('mouseenter', (event) => {
    var text = item.dataset.followerText;
    if (!text || text == 0) {
      text = "Click";
    }
    followerText.innerHTML = text;
    animateFollower('in');

    gsap.to(cursor, {
      scale: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  item.addEventListener('mouseleave', (event) => {
    animateFollower('out');

    gsap.to(cursor, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// Hover effects for interactive elements
function addCursorHoverEffect(element) {
  if (element.classList.contains('followerchangetest')) {
    return;
  }

  element.addEventListener('mouseenter', () => {
    isHovering = true;
    gsap.to(cursor, {
      scale: 3,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  element.addEventListener('mouseleave', () => {
    isHovering = false;
    gsap.to(cursor, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}

const interactiveSelectors = 'a, button, input, textarea, .skill-item';

function applyHoverEffects() {
  document.querySelectorAll(interactiveSelectors).forEach(addCursorHoverEffect);
}

applyHoverEffects();
setTimeout(applyHoverEffects, 100);
setTimeout(applyHoverEffects, 500);
setTimeout(applyHoverEffects, 1000);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.matches && node.matches(interactiveSelectors)) {
          addCursorHoverEffect(node);
        }
        node.querySelectorAll && node.querySelectorAll(interactiveSelectors).forEach(addCursorHoverEffect);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

gsap.from('.about-text', {
  scrollTrigger: {
    trigger: '.about-text',
    start: 'top 80%',
  },
  x: -50,
  opacity: 0,
  duration: 1.8,
  ease: 'power2.out'
});

gsap.from('.skill-item', {
  scrollTrigger: {
    trigger: '.about-skills',
    start: 'top 80%',
  },
  x: 50,
  opacity: 0,
  duration: 1.8,
  stagger: 0.3,
  ease: 'power2.out'
});

gsap.from('.projects-header', {
  scrollTrigger: {
    trigger: '.projects-header',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 1.8,
  ease: 'power2.out'
});

gsap.utils.toArray('.gallery-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
    },
    y: 60,
    opacity: 0,
    duration: 1.5,
    delay: (i % 3) * 0.15,
    ease: 'power2.out'
  });
});

// ============================================================================
// MOBILE MENU
// ============================================================================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("burger-active");
});

// ============================================================================
// UTILITIES
// ============================================================================

document.getElementById("year").textContent = new Date().getFullYear();
