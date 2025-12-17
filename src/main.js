import './style.css'

const names = ['vuk', 'djura', 'filip', 'guza', 'jova', 'pareza', 'zki', 'kiza'];
const emojis = ['🎁', '⭐', '🎄', '❄️', '🎅', '🎉', '🔔', '🌟'];

let assignments = {};
let flippedCards = new Set();

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateSecretSanta(participants) {
  const shuffled = shuffleArray(participants);
  const result = {};
  
  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    let receiver = shuffled[i];
    
    if (giver === receiver) {
      const nextIndex = (i + 1) % participants.length;
      receiver = shuffled[nextIndex];
      shuffled[nextIndex] = shuffled[i];
      shuffled[i] = receiver;
    }
    
    result[giver] = receiver;
  }
  
  return result;
}

function createCard(name, emoji, index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';
  wrapper.style.animationDelay = `${index * 0.1}s`;
  
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.name = name;
  
  const front = document.createElement('div');
  front.className = 'card-face card-front';
  front.innerHTML = `
    <div class="emoji">${emoji}</div>
    <h2>${name}</h2>
  `;
  
  const back = document.createElement('div');
  back.className = 'card-face card-back';
  back.innerHTML = `
    <div class="emoji">🎁</div>
    <div class="label">You give to:</div>
    <div class="gift-to">${assignments[name]}</div>
  `;
  
  const snakeBorder = document.createElement('div');
  snakeBorder.className = 'snake-border';
  snakeBorder.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="blueGradient-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M 5,5 L 95,5 L 95,95 L 5,95 Z" 
            stroke="url(#blueGradient-${name})" 
            fill="none" />
    </svg>
  `;
  
  card.appendChild(front);
  card.appendChild(back);
  back.appendChild(snakeBorder);
  wrapper.appendChild(card);
  
  card.addEventListener('click', () => {
    if (flippedCards.has(name)) return;
    
    card.classList.add('flipped');
    flippedCards.add(name);
    
    setTimeout(() => {
      snakeBorder.classList.add('active');
    }, 800);
    
    setTimeout(() => {
      snakeBorder.classList.remove('active');
      card.classList.add('locked');
    }, 5800);
  });
  
  return wrapper;
}

function renderCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';
  
  const shuffledNames = shuffleArray(names);
  const shuffledEmojis = shuffleArray(emojis);
  
  shuffledNames.forEach((name, index) => {
    const card = createCard(name, shuffledEmojis[index], index);
    container.appendChild(card);
  });
}

function resetGame() {
  assignments = generateSecretSanta(names);
  flippedCards.clear();
  renderCards();
}

document.getElementById('randomBtn').addEventListener('click', () => {
  const btn = document.getElementById('randomBtn');
  btn.style.animation = 'spin 0.5s ease-in-out';
  
  setTimeout(() => {
    btn.style.animation = '';
    resetGame();
  }, 500);
});

const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

resetGame();
