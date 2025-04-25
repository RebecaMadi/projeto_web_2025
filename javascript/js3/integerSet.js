class IntegerSet {
    constructor(numMax) {
        this.numMax = numMax;
        this.vetor = new Array(numMax + 1).fill(false);
    }

    insercao(num) {
        if (num >= 0 && num <= this.numMax) {
            this.vetor[num] = true;
        }
    }

    exclusao(num) {
        if (num >= 0 && num <= this.numMax) {
            this.vetor[num] = false;
        }
    }

    uniao(conjuntoB) {
        const max = Math.max(this.numMax, conjuntoB.numMax);
        const uniao = new IntegerSet(max);

        for (let i = 0; i <= max; i++) {
            const a = this.vetor[i] || false;
            const b = conjuntoB.vetor[i] || false;
            uniao.vetor[i] = a || b;
        }

        return uniao;
    }

    intersecao(conjuntoB) {
        const max = Math.max(this.numMax, conjuntoB.numMax);
        const intersecao = new IntegerSet(max);

        for (let i = 0; i <= max; i++) {
            const a = this.vetor[i] || false;
            const b = conjuntoB.vetor[i] || false;
            intersecao.vetor[i] = a && b;
        }

        return intersecao;
    }

    diferenca(conjuntoB) {
        const max = Math.max(this.numMax, conjuntoB.numMax);
        const diferenca = new IntegerSet(max);

        for (let i = 0; i <= max; i++) {
            const a = this.vetor[i] || false;
            const b = conjuntoB.vetor[i] || false;
            diferenca.vetor[i] = a && !b;
        }

        return diferenca;
    }

    converteString() {
        const elementos = [];

        for (let i = 0; i <= this.numMax; i++) {
            if (this.vetor[i]) {
                elementos.push(i);
            }
        }

        return elementos;
    }

    toString() {
        const lista = this.converteString();
        return lista.length > 0 ? lista.join(', ') : 'vazio!';
    }
}


// Testes

const conjunto1 = new IntegerSet(100);
conjunto1.insercao(23);
conjunto1.insercao(76);

const conjunto2 = new IntegerSet(100);
conjunto2.insercao(14);
conjunto2.insercao(89);

console.log("Conjunto 1:", conjunto1.toString());
console.log("Conjunto 2:", conjunto2.toString());

const uniao12 = conjunto1.uniao(conjunto2);
console.log("União:", uniao12.toString());

const intersecao12 = conjunto1.intersecao(conjunto2);
console.log("Interseção:", intersecao12.toString());

const diferenca12 = conjunto1.diferenca(conjunto2);
console.log("Diferença:", diferenca12.toString());
