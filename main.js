
class LottoBall extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const ball = document.createElement('div');
    ball.classList.add('lotto-ball');
    ball.textContent = this.getAttribute('number');
    const style = document.createElement('style');
    style.textContent = `
      .lotto-ball {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--ball-bg, #fff);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        color: var(--ball-color, #333);
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(ball);
  }
}

customElements.define('lotto-ball', LottoBall);

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const generatorBtn = document.getElementById('generator-btn');
const lottoBallsContainer = document.getElementById('lotto-balls-container');

generatorBtn.addEventListener('click', () => {
  lottoBallsContainer.innerHTML = '';
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  for (const number of numbers) {
    const lottoBall = document.createElement('lotto-ball');
    lottoBall.setAttribute('number', number);
    lottoBallsContainer.appendChild(lottoBall);
  }
});
