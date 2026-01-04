const alimentosBase = [
 {nome:"Arroz", cal:130},
 {nome:"Feijão", cal:90},
 {nome:"Ovo", cal:78},
 {nome:"Frango", cal:165},
 {nome:"Sardinha", cal:200},
 {nome:"Carne", cal:250},
 {nome:"Banana", cal:90},
 {nome:"Maçã", cal:70},
 {nome:"Pera", cal:80},
 {nome:"Batata", cal:110},
 {nome:"Batata doce", cal:120},
 {nome:"Abóbora", cal:40},
 {nome:"Berinjela", cal:35},
 {nome:"Pão de queijo", cal:180},
 {nome:"Queijo prato", cal:120}
];

let total = 0;

function login() {
  const email = email.value;
  localStorage.setItem("user", email);
  iniciar();
}

function logout() {
  localStorage.clear();
  location.reload();
}

function iniciar() {
  if (localStorage.getItem("user")) {
    loginBox.classList.add("hidden");
    app.classList.remove("hidden");
    montarAlimentos();
    atualizarJejum();
    desenharGrafico();
  }
}

function montarAlimentos() {
  alimentos.innerHTML = "";
  alimentosBase.forEach(a => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>
        <input type="checkbox" onchange="toggle(${a.cal},this)">
        ${a.nome} (${a.cal} kcal)
      </label>`;
    alimentos.appendChild(div);
  });
}

function toggle(cal, el) {
  total += el.checked ? cal : -cal;
  totalCal.innerText = total;
}

function salvarConfig() {
  localStorage.setItem("config", JSON.stringify({
    idade: idade.value,
    altura: altura.value,
    peso: peso.value
  }));
  alert("Configurações salvas");
}

function atualizarJejum() {
  jejumStatus.innerText = "Jejum ativo: 17h30 → 11h30";
}

function registrarPeso() {
  let lista = JSON.parse(localStorage.getItem("pesos") || "[]");
  lista.push({data:new Date().toLocaleDateString(), peso:pesoDia.value});
  localStorage.setItem("pesos", JSON.stringify(lista));
  desenharGrafico();
}

function desenharGrafico() {
  const ctx = grafico.getContext("2d");
  ctx.clearRect(0,0,400,200);
  let dados = JSON.parse(localStorage.getItem("pesos") || "[]");
  dados.forEach((p,i)=>{
    ctx.fillRect(i*30,200-p.peso*2,10,10);
  });
}

iniciar();