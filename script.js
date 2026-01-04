const checkboxes = document.querySelectorAll("input[type='checkbox']");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const resetButton = document.getElementById("reset");

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

function updateProgress() {
  const total = checkboxes.length;
  const checked = [...checkboxes].filter(cb => cb.checked).length;
  const percent = Math.round((checked / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "% concluído";

  localStorage.setItem("jejumChecklist", JSON.stringify(
    [...checkboxes].map(cb => cb.checked)
  ));
}

function loadState() {
  const data = JSON.parse(localStorage.getItem("jejumChecklist"));
  if (!data) return;

  checkboxes.forEach((cb, i) => cb.checked = data[i]);
  updateProgress();
}

checkboxes.forEach(cb =>
  cb.addEventListener("change", updateProgress)
);

resetButton.addEventListener("click", () => {
  if (confirm("Resetar checklist do dia?")) {
    checkboxes.forEach(cb => cb.checked = false);
    updateProgress();
  }
});

loadState();