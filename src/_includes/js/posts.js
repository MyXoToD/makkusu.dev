const posts = document.querySelectorAll('.post');
posts.forEach((post) => {
  post.addEventListener('mousemove', (event) => {
    const box = post.getBoundingClientRect();
    const x = event.pageX - box.x;
    const y = event.pageY - box.y - window.scrollY;
    const percent = {
      x: x / post.offsetWidth,
      y: y / post.offsetHeight,
    };
    const maxTilt = 15;
    const tilt = {
      x: percent.x * (maxTilt * 2) - maxTilt,
      y: percent.y * (maxTilt * 2) - maxTilt,
    };
    post.style.setProperty('--tiltX', `${tilt.x}deg`);
    post.style.setProperty('--tiltY', `${tilt.y * -1}deg`);

    const ax = box.x + box.width / 2;
    const ay = box.y + box.height / 2;
    const angle = (Math.atan2(ay - y, ax - x) * 180) / Math.PI;
    post.style.setProperty('--angle', angle);
  });
  post.addEventListener('mouseleave', () => {
    post.style.removeProperty('--tiltX');
    post.style.removeProperty('--tiltY');
    post.style.removeProperty('--angle');
  });
});
