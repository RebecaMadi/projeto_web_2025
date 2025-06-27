import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

export function generateLorem(qtd: number): string {
  return Array.from({ length: qtd }, () => `<p>${lorem.generateParagraphs(1)}</p>`).join('');
}