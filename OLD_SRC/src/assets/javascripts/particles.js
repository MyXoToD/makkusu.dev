function hexToRgba(hex, alpha = 1) {
  hex = hex.replace(/^#/, '');

  // Expand shorthand (#f00 -> #ff0000)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

class Particles {
  options = {
    width: null,
    height: null,
    particlesCount: 'auto',
    dotRadius: 2,
    speed: 0.25,
    lineThreshold: 100,
    reactive: true,
    dotColor: '#ffffff',
    lineColor: '#ffffff',
  };
  width = null;
  height = null;
  particles = [];

  constructor(selector, options = {}) {
    this.options = Object.assign(this.options, options);
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', () => this.setSize());
    if (this.options.reactive) {
      this.canvas.addEventListener('mousemove', (event) => this.react(event));
    }

    this.initialize();

    requestAnimationFrame(() => this.loop());
  }

  setSize() {
    this.width = this.options.width || this.canvas.parentNode.offsetWidth;
    this.height = this.options.height || this.canvas.parentNode.offsetHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.particles = [];
    const count = this.options.particlesCount === 'auto' ? this.determineParticlesCount() : this.options.particlesCount;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        id: i,
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height),
        angle: Math.floor(Math.random() * 360),
        connections: [],
      });
    }
  }

  react({ x, y }) {
    if (!this.options.reactive) return;

    this.particles.forEach((particle) => {
      const dist = Math.sqrt((x - particle.x) ** 2 + (y - particle.y) ** 2);
      const rad = (particle.angle * Math.PI) / 360;
      const dx = x - particle.x;
      const dy = y - particle.y;
      const inView = particle.x >= this.options.dotRadius && particle.x <= this.width - this.options.dotRadius && particle.y >= this.options.dotRadius && particle.y <= this.height - this.options.dotRadius;

      if (dist < 100 && inView) {
        const angle = Math.atan2(y - particle.y, x - particle.x) * (180 / Math.PI);
        const newRad = Math.atan2(-dy, -dx);
        const newAngle = (newRad * 360) / Math.PI;
        particle.angle = newAngle;
        particle.speed = 2;
      }
    });
  }

  initialize() {
    this.canvas.style.display = 'block';
    this.setSize();
  }

  determineParticlesCount() {
    return (this.width * this.height) / 2000;
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.options.dotColor;

    this.particles.forEach((particle) => {
      particle.connections = [];

      // Draw connections
      this.particles.forEach((neighbor) => {
        if (neighbor.id == particle.id || particle.connections.includes(neighbor.id) || neighbor.connections.includes(particle.id)) return;

        // √((x₂ - x₁)² + (y₂ - y₁)²
        const dist = Math.sqrt((particle.x - neighbor.x) ** 2 + (particle.y - neighbor.y) ** 2);
        // const opacity = .25 / this.options.lineThreshold * dist;
        const t = 1 - dist / this.options.lineThreshold;
        const alpha = Math.max(0, t) * 0.35;

        if (dist <= this.options.lineThreshold) {
          // this.ctx.strokeStyle = `rgba(255, 255, 255, ${.25 - opacity})`;
          this.ctx.strokeStyle = hexToRgba(this.options.lineColor, alpha);
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(neighbor.x, neighbor.y);
          this.ctx.stroke();
          particle.connections.push(neighbor.id);
          neighbor.connections.push(particle.id);
        }
      });

      // Draw particles
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, this.options.dotRadius, 0, 2 * Math.PI);
      this.ctx.fill();

      const rad = (particle.angle * Math.PI) / 360;
      particle.x += Math.cos(rad) * (particle.speed || this.options.speed);
      particle.y += Math.sin(rad) * (particle.speed || this.options.speed);
      if (particle.speed && particle.speed > this.options.speed) {
        particle.speed -= particle.speed * 0.01;
      } else {
        particle.speed = null;
      }

      if (particle.x <= this.options.dotRadius || particle.x >= this.width - this.options.dotRadius) {
        particle.angle = 360 - particle.angle;
      }

      if (particle.y <= this.options.dotRadius || particle.y >= this.height - this.options.dotRadius) {
        particle.angle = -particle.angle;
      }
    });

    requestAnimationFrame(() => this.loop());
  }
}

export default Particles;
