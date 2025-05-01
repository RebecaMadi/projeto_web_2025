document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    const form = document.createElement("form");

    const labelAltura = document.createElement("label");
    labelAltura.textContent = "Informe a altura das barras:";

    for (let i = 1; i <= 5; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "barraInput";
        input.id = "alt" + i;
        labelAltura.appendChild(input);
    }

    form.appendChild(labelAltura);
    form.appendChild(document.createElement("br"));

    const labelLargura = document.createElement("label");
    labelLargura.textContent = "Informe a largura das barras:";

    const inputLargura = document.createElement("input");
    inputLargura.type = "text";
    inputLargura.className = "barraInput";
    inputLargura.id = "larg";

    labelLargura.appendChild(inputLargura);
    form.appendChild(labelLargura);
    form.appendChild(document.createElement("br"));

    const botao = document.createElement("input");
    botao.type = "submit";
    botao.id = "botaoSubmit";
    botao.value = "Desenhar o gráfico";
    form.appendChild(botao);

    app.appendChild(form);

    const grafico = document.createElement("div");
    grafico.id = "grafico";

    for (let i = 1; i <= 5; i++) {
        const barra = document.createElement("div");
        barra.className = "barras";
        barra.id = "col" + i;
        grafico.appendChild(barra);
    }

    app.appendChild(grafico);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const alturasInputs = form.querySelectorAll(".barraInput:not(#larg)");
        const larguraInput = document.getElementById("larg");
        const colunas = grafico.querySelectorAll(".barras");

        colunas.forEach((coluna, index) => {
            const altura = parseInt(alturasInputs[index].value, 10);
            const largura = parseInt(larguraInput.value, 10);

            if (!isNaN(altura) && !isNaN(largura)) {
                coluna.style.height = altura + "px";
                coluna.style.width = largura + "px";
            } else {
                console.warn(`Valores inválidos na barra ${index + 1}`);
            }
        });
    });
});
