
class LottoBall extends HTMLElement {
  static get observedAttributes() { return ['number']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() { this.render(); }

  render() {
    const number = this.getAttribute('number');
    let color = '#4f46e5';
    if (number <= 10) color = '#ef4444';
    else if (number <= 20) color = '#f97316';
    else if (number <= 30) color = '#eab308';
    else if (number <= 40) color = '#22c55e';
    else color = '#3b82f6';

    this.shadowRoot.innerHTML = `
      <style>
        .lotto-ball {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: ${color};
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 3px 8px rgba(0,0,0,0.2);
          color: #fff;
          animation: pop 0.3s ease;
        }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      <div class="lotto-ball">${number}</div>
    `;
  }
}

customElements.define('lotto-ball', LottoBall);

// 테마 토글
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️ 라이트모드';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ 라이트모드' : '🌙 다크모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 번호 생성기
const generatorBtn = document.getElementById('generator-btn');
const lottoBallsContainer = document.getElementById('lotto-balls-container');
const generatorTip = document.getElementById('generator-tip');

const tips = [
  '홀짝 균형: 홀수 3개, 짝수 3개 조합이 통계적으로 자주 나옵니다.',
  '연속 번호 2개는 전체 당첨 번호의 약 70%에서 등장합니다.',
  '1~22 저번호와 23~45 고번호를 균형 있게 섞어보세요.',
  '끝자리가 같은 번호를 4개 이상 선택하면 당첨 확률이 낮아질 수 있습니다.',
  '총합이 100~180 사이인 조합이 통계적으로 자주 당첨됩니다.',
];

generatorBtn.addEventListener('click', () => {
  lottoBallsContainer.innerHTML = '';
  const numbers = [];
  while (numbers.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  numbers.sort((a, b) => a - b);

  numbers.forEach((number, i) => {
    setTimeout(() => {
      const ball = document.createElement('lotto-ball');
      ball.setAttribute('number', number);
      lottoBallsContainer.appendChild(ball);
    }, i * 120);
  });

  generatorTip.textContent = '💡 ' + tips[Math.floor(Math.random() * tips.length)];
});
