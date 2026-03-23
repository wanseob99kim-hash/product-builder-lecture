
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
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        color: #333;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(ball);
  }
}

customElements.define('lotto-ball', LottoBall);

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
