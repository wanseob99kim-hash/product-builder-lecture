
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Tips
const tips = [
  'Try mixing low (1–35) and high (36–69) numbers for a balanced set.',
  'A 3 odd / 2 even split appears in roughly 33% of all winning draws.',
  'Avoid picking all numbers from the same decade (e.g. 11, 12, 13, 14, 15).',
  'The Powerball number is drawn from a separate pool of 1–26 — treat it independently.',
  'Playing 5 different sets covers more combinations than repeating the same numbers.',
];

// Powerball generator
function generateSet() {
  const whites = [];
  while (whites.length < 5) {
    const n = Math.floor(Math.random() * 69) + 1;
    if (!whites.includes(n)) whites.push(n);
  }
  whites.sort((a, b) => a - b);
  const pb = Math.floor(Math.random() * 26) + 1;
  return { whites, pb };
}

function getBallColor(n) {
  if (n <= 14) return '#ef4444';
  if (n <= 28) return '#f97316';
  if (n <= 42) return '#eab308';
  if (n <= 56) return '#22c55e';
  return '#3b82f6';
}

function createBall(number, isPowerball = false) {
  const ball = document.createElement('div');
  ball.className = isPowerball ? 'ball powerball' : 'ball';
  ball.textContent = number;
  if (!isPowerball) {
    ball.style.background = getBallColor(number);
  }
  return ball;
}

function renderSets(sets) {
  const container = document.getElementById('sets-container');
  container.innerHTML = '';

  sets.forEach((set, i) => {
    const row = document.createElement('div');
    row.className = 'set-row';

    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = `Set ${i + 1}`;
    row.appendChild(label);

    const balls = document.createElement('div');
    balls.className = 'balls-group';

    set.whites.forEach((n, j) => {
      const ball = createBall(n);
      ball.style.animationDelay = `${j * 80}ms`;
      balls.appendChild(ball);
    });

    const divider = document.createElement('span');
    divider.className = 'pb-divider';
    divider.textContent = '+';
    balls.appendChild(divider);

    const pb = createBall(set.pb, true);
    pb.style.animationDelay = `${5 * 80}ms`;
    balls.appendChild(pb);

    row.appendChild(balls);
    container.appendChild(row);
  });
}

document.getElementById('generator-btn').addEventListener('click', () => {
  const sets = Array.from({ length: 5 }, generateSet);
  renderSets(sets);
  const tip = document.getElementById('generator-tip');
  tip.textContent = '💡 ' + tips[Math.floor(Math.random() * tips.length)];
});
