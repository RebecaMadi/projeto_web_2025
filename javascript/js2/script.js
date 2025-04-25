function jokenpo() {
    const opcoes = ['Papel', 'Pedra', 'Tesoura'];
    let pontuacao = 0;

    while (true) {
        const escolhaUsuario = parseInt(prompt('Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura'));
        console.log('Escolha sua jogada: \n1 - Papel\n2 - Pedra\n3 - Tesoura');
        
        if (![1, 2, 3].includes(escolhaUsuario)) {
            console.log('Jogada inválida! Você perdeu a rodada.');
            break
        }

        const jogadaUsuario = opcoes[escolhaUsuario - 1];
        const escolhaComputador = opcoes[Math.floor(Math.random() * 3)];

        console.log(`Você jogou: ${jogadaUsuario}`);
        console.log(`Computador jogou: ${escolhaComputador}`);

        const resultado = determinarVencedor(jogadaUsuario, escolhaComputador);

        if (resultado === 'vitoria') {
            pontuacao++;
            console.log('Você venceu a rodada!');
            console.log(`Pontuação atual: ${pontuacao}\n`);
        } else if (resultado === 'empate') {
            console.log('Empate! Vamos para a próxima rodada.');
            console.log(`Pontuação atual: ${pontuacao}\n`);
        } else {
            console.log('Você perdeu a rodada!');
            break
        }
    }

    console.log(`Fim de jogo! Sua pontuação final foi: ${pontuacao}`);
}

function determinarVencedor(jogador, computador) {
    if (jogador === computador) return 'empate';

    if (
        (jogador === 'Pedra' && computador === 'Tesoura') ||
        (jogador === 'Tesoura' && computador === 'Papel') ||
        (jogador === 'Papel' && computador === 'Pedra')
    ) {
        return 'vitoria';
    } else {
        return 'derrota'; 
    }
}

jokenpo();
