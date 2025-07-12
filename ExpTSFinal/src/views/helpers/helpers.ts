import { Prof, Tecnologia } from './helpersTypes';

export function listProfs(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`);
  return `<ul>${list.join('')}</ul>`;
}

export function listTechs(techs: Tecnologia[]) {
  // não usar filter
  const filtered = techs.filter((tech) => tech.poweredByNodejs);
  const items = filtered.map(
    (tech) => `<li><strong>${tech.nome}</strong> - ${tech.tipo}</li>`,
  );
  return `<ul class="node-tech-list">${items.join('')}</ul>`;
}

export function inc(value: string): number {
  return parseInt(value) + 1;
}