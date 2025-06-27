"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLorem = generateLorem;
const lorem_ipsum_1 = require("lorem-ipsum");
const lorem = new lorem_ipsum_1.LoremIpsum();
function generateLorem(qtd) {
    return Array.from({ length: qtd }, () => `<p>${lorem.generateParagraphs(1)}</p>`).join('');
}
