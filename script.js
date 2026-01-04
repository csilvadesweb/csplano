const foods = {
  Arroz: 130,
  Feijão: 77,
  Ovo: 78,
  Frango: 165,
  "Carne Vermelha": 250,
  Sardinha: 191,
  Banana: 105,
  Maçã: 72,
  Pera: 96,
  "Batata Inglesa": 110,
  "Batata Doce": 90,
  Abóbora: 40,
  Berinjela: 35,
  "Pão de Queijo": 130,
  "Queijo Prato": 100,
  Torrada: 60,
  Manteiga: 100
};

const TDEE = 2500; // gasto diário médio estimado
const PESO_ATUAL = 97;

let total = 0;
let day = 1;

const foodSelect = document.getElementById("food");

Object.keys(foods).forEach(f => {
  const opt = document.createElement("option");
  opt.value = f;
  opt.textContent = f;
  foodSelect.appendChild(opt);
});

function addFood() {
  const food = foodSelect.value;
  const qty = Number(document.getElementById("qty").value);
  const kcal = foods[food] * qty;

  total += kcal;

  const li = document.createElement("li");
  li.textContent = `${food} (${qty}x) = ${kcal} kcal`;
  document.getElementById("lista").appendChild(li);

  updateResumo();
}

function updateResumo() {
  document.getElementById("total").textContent = total;
  const deficit = TDEE - total;
  document.getElementById("deficit").textContent = deficit;

  const perda = (deficit * 30) / 7700;
  document.getElementById("peso").textContent =
    (PESO_ATUAL - perda).toFixed(1);
}

function saveDay() {
  if (day > 30) return alert("Plano de 30 dias concluído");

  const li = document.createElement("li");
  li.textContent = `Dia ${day}: ${total} kcal`;
  document.getElementById("history").appendChild(li);

  day++;
  total = 0;
  document.getElementById("lista").innerHTML = "";
  updateResumo();
}

// 🔔 Notificações
if ("Notification" in window) {
  Notification.requestPermission();
}

function notify(msg) {
  if (Notification.permission === "granted") {
    new Notification(msg);
  }
}

setTimeout(() => notify("🕦 Hora da primeira refeição"), 10000);
setTimeout(() => notify("⏰ Última refeição às 17h30"), 20000);