const nameInput = document.getElementById("nameInput");
const subjectInput = document.getElementById("subjectInput");
const bodyInput = document.getElementById("bodyInput");
const bodyWrapper = document.getElementById("bodyWrapper");
const sendBtn = document.getElementById("sendBtn");
const statusText = document.getElementById("statusText");

let isSending = false;

// ВРЕМЯ СУТОК → КЛАСС ДЛЯ ТЕМЫ
(function setSkyByTime() {
  const hour = new Date().getHours(); // 0–23 [web:152]
  const body = document.body;

  let mode = "day";

  if (hour >= 5 && hour < 9) {
    mode = "morning";   // рассвет
  } else if (hour >= 9 && hour < 18) {
    mode = "day";       // день
  } else if (hour >= 18 && hour < 22) {
    mode = "evening";   // закат
  } else {
    mode = "night";     // ночь
  }

  body.classList.add(mode);
})();

// ЛОГИКА ОТПРАВКИ ПИСЬМА
function sendLetter() {
  const bodyText = bodyInput.value.trim();
  const subject = subjectInput.value.trim();
  const name = nameInput.value.trim();

  if (!bodyText) {
    statusText.textContent = "Напиши что-нибудь в тело письма, прежде чем отправить.";
    return;
  }

  if (isSending) return;
  isSending = true;
  sendBtn.disabled = true;

  statusText.textContent = "Письмо отправляется...";

  // анимация «улёта» письма
  bodyWrapper.classList.add("sending");

  setTimeout(() => {
    // очищаем всё, письмо «ушло»
    bodyInput.value = "";
    subjectInput.value = "";
    nameInput.value = "";

    bodyWrapper.classList.remove("sending");

    statusText.textContent =
      "Письмо отправлено. Ответа не будет, оно просто растворилось во Вселенной.";

    sendBtn.disabled = false;
    isSending = false;
  }, 1300);
}

sendBtn.addEventListener("click", sendLetter);

// Ctrl+Enter / Cmd+Enter
bodyInput.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    sendLetter();
  }
});
