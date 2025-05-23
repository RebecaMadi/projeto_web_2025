const raioInput = document.getElementById("raio") as HTMLInputElement;
const calcularBtn = document.getElementById("calcular") as HTMLButtonElement;
const areaInput = document.getElementById("area") as HTMLInputElement;
const circunferenciaInput = document.getElementById("circunferencia") as HTMLInputElement;

function calcularAreaCirculo() {
  const raio = parseFloat(raioInput.value);

  const area = Math.PI * Math.pow(raio, 2);
  const circunferencia = 2 * Math.PI * raio;

  areaInput.value = area.toFixed(2);
  circunferenciaInput.value = circunferencia.toFixed(2);
}

calcularBtn.addEventListener("click", calcularAreaCirculo);
