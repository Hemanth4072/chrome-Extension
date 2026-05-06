const FOCUS_MINUTES = 25;
const FOCUS_SECONDS = FOCUS_MINUTES * 60;

const focusToggle = document.getElementById("focusToggle");
const timerDisplay = document.getElementById("timerDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

let remainingSeconds = FOCUS_SECONDS;
let timerId = null;

const quotes = [
  "Discipline is choosing what you want most over what you want now.",
  "Small progress is still progress.",
  "Your focus decides your future.",
  "One task. One timer. Full attention."
];

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  startPauseBtn.textContent = "Start";
}

function startTimer() {
  if (timerId) return;

  startPauseBtn.textContent = "Pause";
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    renderTimer();

    if (remainingSeconds <= 0) {
      stopTimer();
      remainingSeconds = 0;
      renderTimer();
    }
  }, 1000);
}

function resetTimer() {
  stopTimer();
  remainingSeconds = FOCUS_SECONDS;
  renderTimer();
}

startPauseBtn.addEventListener("click", () => {
  if (timerId) {
    stopTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);

focusToggle.addEventListener("change", async () => {
  const enabled = focusToggle.checked;
  await chrome.storage.sync.set({ focusEnabled: enabled });
  await chrome.runtime.sendMessage({ type: "FOCUS_TOGGLE", enabled });
});

async function init() {
  const { focusEnabled = false } = await chrome.storage.sync.get("focusEnabled");
  focusToggle.checked = focusEnabled;
  document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
  renderTimer();
}

init();
