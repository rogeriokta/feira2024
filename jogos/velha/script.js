const mostrarStatus = document.querySelector('.game--status');

let jogoAtivo = true;
let jogadorAtual = "X";
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

const mensagemVitoria = () => `O jogador ${jogadorAtual} ganhou!`;
const mensagemEmpate = () => `Jogo terminou empatado!`;
const vezJogador = () => `É a vez do jogador ${jogadorAtual}!`;

mostrarStatus.innerHTML = vezJogador();

const vitorias = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function verificarCelulaClicada(clickedCell, clickedCellIndex) {
    estadoJogo[clickedCellIndex] = jogadorAtual;
    clickedCell.innerHTML = jogadorAtual;
}

function mudarJogador() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X"; //operador ternário
    mostrarStatus.innerHTML = vezJogador();
}

//Função que verifica se a rodada teve um ganhador
function validarVitoria() {
    let rodadaVencida = false;
    for(let i = 0; i <= 7; i++) {
        const vitoria = vitorias[i];
        const a = estadoJogo[vitoria[0]];
        const b = estadoJogo[vitoria[1]];
        const c = estadoJogo[vitoria[2]];
        if(a === '' || b === '' || c === '')
        continue;
    if(a === b && b === c) {
        rodadaVencida = true;
        break
    }
    }

    if(rodadaVencida) {
        mostrarStatus.innerHTML = mensagemVitoria();
        jogoAtivo = false;
        return;
    }

    const rodadaEmpatada = !estadoJogo.includes("");
    if(rodadaEmpatada) {
        mostrarStatus.innerHTML = mensagemEmpate();
        jogoAtivo = false;
        return;
    }

    mudarJogador(); // Chama a função mudarJogador
}

//Função para verificar o clique nas células do tabuleiro
function clicarCelula(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(estadoJogo[clickedCellIndex] !== "" || !jogoAtivo)
    return;

    verificarCelulaClicada(clickedCell, clickedCellIndex);
    validarVitoria();
}

//Função para reiniciar jogo
function reiniciarJogo() {
    jogoAtivo = true; // Colocar o jogo como ativo
    jogadorAtual = "X"; // Coloca o jogador atual como X
    estadoJogo = ["", "", "", "", "", "", "", "", ""]; //Limpa a variável de verificação
    mostrarStatus.innerHTML = vezJogador(); //Mostra a mensagem do jogador da vez
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); //Limpa o tabuleiro

}

//Adiciona a função clicarCelula nas células da tabela do jogo
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',
clicarCelula));
//Adiciona a função reiniciarJogo ao botão
document.querySelector('.game--restart').addEventListener('click', reiniciarJogo);