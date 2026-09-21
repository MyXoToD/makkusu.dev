const greetings = ['Hello', 'こんにちは', 'Guten Tag', 'Bonjour', 'Hola', 'Ciao', '안녕하세요', '你好'];
const writingSpeed = 100;
const pauseDelay = 1000;

const heroEyebrow = document.querySelector('.hero__eyebrow span');
let currentGreeting = Math.floor(Math.random() * greetings.length);

function getRandomGreeting() {
  const availableGreetings = greetings.slice(0, currentGreeting).concat(greetings.slice(currentGreeting + 1));

  const randomIndex = Math.floor(Math.random() * availableGreetings.length);
  const greeting = availableGreetings[randomIndex];

  currentGreeting = greetings.indexOf(greeting);
  return greeting;
}

function write(greeting, index = 0, reverse = false) {
  const wordPart = greeting.slice(0, index);
  heroEyebrow.textContent = wordPart;
  if (reverse) {
    let newIndex = index - 1;
    const shouldReverse = newIndex >= 0;
    greeting = shouldReverse ? greeting : getRandomGreeting();
    if (newIndex < 0) newIndex = 0;
    setTimeout(() => {
      write(greeting, newIndex, shouldReverse);
    }, writingSpeed);
  } else {
    const newIndex = index + 1;
    const shouldReverse = newIndex > greeting.length;
    setTimeout(
      () => {
        write(greeting, newIndex, shouldReverse);
      },
      shouldReverse ? pauseDelay : writingSpeed,
    );
  }
}

// write(greetings[currentGreeting]);

(() => {
  const sheet = document.querySelector('.sheet');
  const stage = document.querySelector('.hero');
  const pin = document.querySelector('.pin');
  if (!sheet || !CSS.supports('animation-timeline: view()')) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let running = false,
    raf = 0,
    anims = [];

  // scroll position where animation-range "contain" ends (= end of the fly-through)
  const endY = () => stage.getBoundingClientRect().top + scrollY + stage.offsetHeight - pin.offsetHeight;

  // smooth start, gentle overshoot past the end, settle back (≈6% overshoot)
  const easeOutBack = (x) => {
    const c1 = 1.2,
      c3 = c1 + 1;
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
  };
  const ease = (t) => easeOutBack(t * t * (3 - 2 * t));

  function stop() {
    cancelAnimationFrame(raf);
    anims.forEach((a) => a.cancel()); // every transform tween ends at scale(1), so cancelling is seamless
    anims = [];
    running = false;
    ['wheel', 'touchstart', 'keydown'].forEach((e) => removeEventListener(e, stop));
  }

  function fly() {
    if (running) return;
    const start = scrollY,
      target = endY();
    if (target - start < 4) return;
    if (reduce.matches) {
      scrollTo(0, target);
      return;
    }

    running = true;
    // the user can grab control back at any moment
    ['wheel', 'touchstart', 'keydown'].forEach((e) => addEventListener(e, stop, { passive: true }));

    // 1) anticipation: the word pulls back a little
    // `transform` composes on top of the scroll-driven `scale`/`rotate`, so both run at once
    const squash = sheet.animate([{ transform: 'scale(1)' }, { transform: 'scale(.86)' }], { duration: 280, easing: 'cubic-bezier(.3,0,.2,1)', fill: 'forwards' });
    anims.push(squash);

    squash.finished
      .then(() => {
        if (!running) return;
        // 2) spring back toward the viewer...
        const spring = sheet.animate([{ transform: 'scale(.86)' }, { transform: 'scale(1.08)', offset: 0.35 }, { transform: 'scale(1)' }], { duration: 750, easing: 'ease-out', fill: 'forwards' });
        anims.push(spring);
        squash.cancel();

        // 3) ...while the page scrolls through the whole fly-through, overshooting slightly
        const dist = target - start,
          dur = 1300,
          t0 = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - t0) / dur);
          scrollTo(0, start + dist * ease(t));
          t < 1 ? (raf = requestAnimationFrame(step)) : stop();
        };
        raf = requestAnimationFrame(step);
      })
      .catch(() => {});
  }

  sheet.addEventListener('click', fly);
  sheet.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      fly();
    }
  });
})();
