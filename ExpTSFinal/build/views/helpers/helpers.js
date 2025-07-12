"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProfs = listProfs;
exports.listTechs = listTechs;
function listProfs(profs) {
    const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
function listTechs(techs) {
    // não usar filter
    const filtered = techs.filter((tech) => tech.poweredByNodejs);
    const items = filtered.map((tech) => `<li><strong>${tech.nome}</strong> - ${tech.tipo}</li>`);
    return `<ul class="node-tech-list">${items.join('')}</ul>`;
}
