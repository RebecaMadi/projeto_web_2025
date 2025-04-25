let text = 'Produtos de ';
for (let tabela = 1; tabela <= 10; tabela++) {
    document.write('<table border="1" class="multiplication-table">');
    document.write("<thead><tr><td colspan='3'><strong>" + text + tabela + "</strong></td></tr></thead>");

    for (let linha = 1; linha <= 10; linha++) {
        document.write("<tr><td>" + tabela + " x " + linha + "</td><td>" + (linha * tabela) + "</td></tr>");
    }
    
    document.write("</table>");
}
