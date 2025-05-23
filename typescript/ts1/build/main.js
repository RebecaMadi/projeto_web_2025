"use strict";
const raioInput = document.getElementById("raio");
const calcularBtn = document.getElementById("calcular");
const areaInput = document.getElementById("area");
const circunferenciaInput = document.getElementById("circunferencia");
function calcularAreaCirculo() {
    const raio = parseFloat(raioInput.value);
    const area = Math.PI * Math.pow(raio, 2);
    const circunferencia = 2 * Math.PI * raio;
    areaInput.value = area.toFixed(2);
    circunferenciaInput.value = circunferencia.toFixed(2);
}
calcularBtn.addEventListener("click", calcularAreaCirculo);
