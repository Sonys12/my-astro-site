// ЭЛЕМЕНТЫ
const starsContainer = document.getElementById("stars");
const ball = document.getElementById("magicBall");
const ballText = document.getElementById("ballText");
const ballAnswer = document.getElementById("ballAnswer");
const ballMist = document.getElementById("ballMist");
const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");

const afterText = document.getElementById("afterText");
const whispersLayer = document.getElementById("whispersLayer");

// ОТВЕТЫ
const answers = [
  "Да",
  "Нет",
  "Возможно",
  "Поймёшь позже",
  "Через месяц",
  "Не сейчас"
];

// ЛЕТАЮЩИЕ ВОПРОСЫ
const sideQuestions = [
  "А если всё получится лучше, чем я думаю?",
  "Стоит ли мне довериться случаю?",
  "А вдруг это именно тот момент?",
  "Не слишком ли я всё усложняю?",
  "Нужно ли мне сделать паузу?",
  "Что будет, если я скажу «да»?",
  "А если не отвечать прямо сейчас?",
  "Могу ли я попробовать другой путь?",
  "От чего я на самом деле бегу?",
  "Хватит ли у меня смелости начать?",
  "Стоит ли поделиться этим с кем-то?",
  "А если ответ уже внутри меня?",
  "Почему я боюсь перемен?",
  "Что, если всё уже решено?",
  "А вдруг это знак?",
  "Нужно ли мне отпускать прошлое?",
  "Чего я хочу на самом деле?",
  "Боится ли кто-то ещё так же, как я?",
  "А если сделать шаг назад?",
  "Стоит ли доверять первой мысли?",
  'У меня ничего не выйдет',
  'А может стоит попытаться?',
  'Хватит ли у меня смелости?',
  'А что он сейчас делает?',
  'Любит ли он меня?',
  'Стоит ли начинать все заново?',
];

// УТИЛИТЫ
function getRandomItem(arr) {
  const index = Math.floor(Math.random() * arr.length); // [web:30][web:33]
  return arr[index];
}

// ЗВЁЗДЫ
function createStars() {
  const numberOfStars = 80;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

// ПАРАМЕТРЫ ШЁПОТОВ
const MAX_WHISPERS = 100;
const WHISPER_LIFETIME = 5000;
const WHISPER_INTERVAL = 300;

// ЗОНА ШАРА, КУДА НЕЛЬЗЯ КИДАТЬ ВОПРОСЫ
function getBallForbiddenZone() {
  const ballRect = ball.getBoundingClientRect();
  const layerRect = whispersLayer.getBoundingClientRect();

  return {
    left: ballRect.left - layerRect.left,
    right: ballRect.right - layerRect.left,
    top: ballRect.top - layerRect.top,
    bottom: ballRect.bottom - layerRect.top
  };
}

function isInsideForbiddenZone(x, y, zone) {
  return (
    x > zone.left - 40 &&
    x < zone.right + 40 &&
    y > zone.top - 40 &&
    y < zone.bottom + 40
  );
}

function createWhisper() {
  if (!whispersLayer) return;

  const existing = whispersLayer.querySelectorAll(".whisper-item").length;
  if (existing >= MAX_WHISPERS) {
    return;
  }

  const item = document.createElement("div");
  item.classList.add("whisper-item");
  item.textContent = getRandomItem(sideQuestions);

  const rect = whispersLayer.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || window.innerHeight;

  const zone = getBallForbiddenZone();

  let x, y;
  let attempts = 0;

  do {
    x = Math.random() * (width - 260); // 260 ~ max-width блока
    y = Math.random() * (height - 40);
    attempts++;
  } while (isInsideForbiddenZone(x, y, zone) && attempts < 20);

  item.style.left = `${x}px`;
  item.style.top = `${y}px`;

  const initialShift = (Math.random() < 0.5 ? -1 : 1) * 10;
  item.style.transform = `translateY(${initialShift}px)`;

  whispersLayer.appendChild(item);

  requestAnimationFrame(() => {
    item.classList.add("visible");
  });

  setTimeout(() => {
    item.classList.remove("visible");
    item.style.filter = "blur(3px)";
    item.style.opacity = "0";

    setTimeout(() => {
      item.remove();
    }, 600);
  }, WHISPER_LIFETIME);
}

function loopWhispers() {
  createWhisper();
}

// ЛОГИКА ШАРА
let isAnimating = false;
let askAgainTimeout = null;

function resetForNewQuestion() {
  ballAnswer.textContent = "";
  ballAnswer.classList.remove("visible");
  ballText.textContent = "Задай вопрос и нажми «Спросить».";
  ballText.classList.remove("hidden");
  ballMist.classList.remove("visible");
  afterText.textContent = "";
}

function askBall() {
  const question = questionInput.value.trim();

  if (!question) {
    ballText.textContent = "Сначала сформулируй вопрос.";
    ballText.classList.remove("hidden");
    ballAnswer.textContent = "";
    ballAnswer.classList.remove("visible");
    ballMist.classList.remove("visible");
    afterText.textContent = "";
    return;
  }

  if (isAnimating) return;
  isAnimating = true;

  

  clearTimeout(askAgainTimeout);

  ballText.classList.add("hidden");
  ballAnswer.classList.remove("visible");
  ballMist.classList.add("visible");
  ball.classList.add("ball-rotating");

  afterText.textContent = "Шар прислушивается к твоему вопросу…";

  const delay = 1500;

  setTimeout(() => {
    const answer = getRandomItem(answers);
    ballAnswer.textContent = answer;
    ballAnswer.style.color = "#f4f4ff";
    ballAnswer.classList.add("visible");

    ballMist.classList.remove("visible");
    ball.classList.remove("ball-rotating");

    afterText.textContent = "Первый ответ — самый честный.";



    isAnimating = false;
  }, delay);
}



// СОБЫТИЯ
askBtn.addEventListener("click", askBall);

questionInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    askBall();
  }
});



// ИНИЦИАЛИЗАЦИЯ
createStars();
setInterval(loopWhispers, WHISPER_INTERVAL);
