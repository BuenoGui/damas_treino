const btn_sair = document.getElementById("sair")

btn_sair.addEventListener("click", function(){
    window.location.href = "../../index.html"
})

const document_tabuleiro = document.getElementsByClassName("tabuleiro")[0]

const direcao = {
    a: -1,
    b: 0
}

const tabuleiro = {
    colunas: ["A", "B", "C", "D", "E", "F", "G", "H"],
    linhas: ["0", "1", "2", "3", "4", "5", "6", "7"]
}

class Jogo {
    constructor() {
        this.estado = []
        this.time_a_jogar = "a"
        this.criar_times()
    }

    criar_times() {
        this.estado = []
        for(let l = 0; l < 8; l++) {
            const linha = []
            for(let c = 0; c < 8; c++) {
                let peca = null
                if((l + c) % 2 === 1) {
                    if(l <= 2) peca = "b"
                    if(l >= 5) peca = "a"
                }
                linha.push(peca)
            }
            this.estado.push(linha)
        }
    }

    dentro_tabuleiro(linha, coluna) {
        return linha >=0 && linha < 8 && coluna >=0 && coluna < 8
    }

    movimentos_simples(linha, coluna) {
        const peca = this.estado[linha][coluna]
        const lista = []

        if(!peca) return lista 

        for(const direcao_diagonal of [-1,1]) {
            const nova_coluna = linha + direcao[peca]
            const nc = coluna + direcao_diagonal

            if(this.dentro_tabuleiro(nova_coluna, nc) && this.estado[nova_coluna][nc] === null) {
                lista.push({linha: nova_coluna, coluna:nc, captura:null})
            }
        }
        return lista
    }

    jogada_valida(linha, coluna) {
        if(this.estado[linha][coluna] !== this.time_a_jogar) return []
        return this.movimentos_simples(linha, coluna)
    }

    mover(origem, destino) {
        const jogada = this.jogada_valida(origem.linha, origem.coluna)
        .find(j => j.linha === destino.linha && j.coluna === destino.coluna)
        if(!jogada) { return null }

        this.estado[destino.linha][destino.coluna] = this.estado[origem.linha][origem.coluna]
        this.estado[origem.linha][origem.coluna] = null
        this.trocar_turno()
        return jogada

    }

    trocar_turno() {
        this.time_a_jogar = this.time_a_jogar === "a" ? "b" : "a"
    }
    
}

class Tela {
    constructor(container) {
        this.container = container
        this.casas = Array.from({ length: 8 }, () => Array(8).fill(null))
    }

    criar_tabuleiro() {
        for(let i = 0; i < 8; i++) {
            const coluna = document.createElement("div")
            coluna.className = `coluna ${tabuleiro.colunas[i]}`
            for(let j = 0; j < 8; j++) {
                const linha = document.createElement("div")
                linha.className = `linha ${tabuleiro.linhas[j]}`
                linha.dataset.linha = j
                linha.dataset.coluna = i
                coluna.appendChild(linha)
                this.casas[j][i] = linha
            }
            this.container.appendChild(coluna)
        }
    }

    pintar_tabuleiro() {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                this.casas[i][j].classList.add((i+j) % 2 === 0 ? "b": "c")
            }
        }
    }
    
    desenhar_pecas(estado) {
        for(let l = 0; l < 8; l++) {
            for(let c = 0; c < 8; c++) {
                const peca = estado[l][c]
                this.casas[l][c].innerHTML = peca ? `<span class="peca ${peca}"></span>` : ""
            }
        }
    }
}

const jogo = new Jogo;
const tela = new Tela(document_tabuleiro);

function iniciar() {
    tela.criar_tabuleiro();
    tela.pintar_tabuleiro();
    tela.desenhar_pecas(jogo.estado)
}

iniciar();

let ultima_peca_clicada = null
let time_a_jogar = "a"

document_tabuleiro.addEventListener('click', function(event) {
    // se for peça, pinta os movimentos possiveis
    if(event.target.classList.contains("peca")) {

        ultima_peca_clicada = event.target

        const document_linha_atual = event.target.parentElement
        const document_coluna_atual = event.target.parentElement.parentElement

        const linha_atual = document_linha_atual.classList[1]
        const coluna_atual = document_coluna_atual.classList[1]

        //movimentação peca time A
        if(time_a_jogar === "a") {
            placeholder(linha_atual, coluna_atual, times.time_a)
        }
        //movimentação peca time B
        if(time_a_jogar === "b") {
            placeholder(linha_atual, coluna_atual, times.time_b)
        }

    } // mover peça 
    else if (event.target.classList.contains("selecionada")) {

        // coloca a peca no local novo
        event.target.innerHTML += `<span class="peca ${String(time_a_jogar)}"></span>`

        // limpa filtro vermelho
        const tabuleiro_atual = event.target.parentElement.parentElement
        const espacos_selecionados = tabuleiro_atual.getElementsByClassName("selecionada")
        for(let i = 0; i <= espacos_selecionados.length ; i++) {
            // eu não acredito nisso que eu fiz
            espacos_selecionados[i - i].classList.remove("selecionada")
        }

        // remove peça do local antigo
        ultima_peca_clicada.parentElement.innerHTML = ""
        
    }

})

const times = {
    time_a: -2,
    time_b: 0
}

function placeholder(linha_atual, coluna_atual, time_jogador) {
    if(linha_atual <= tabuleiro.colunas.length - 1) {
        const linha_movimento = Number(linha_atual) + time_jogador
        const indice_coluna_atual = tabuleiro.colunas.indexOf(coluna_atual)

        const coluna_anterior = document_tabuleiro.getElementsByClassName(`${tabuleiro.colunas[indice_coluna_atual - 1]}`)[0]
        const coluna_sucessor = document_tabuleiro.getElementsByClassName(`${tabuleiro.colunas[indice_coluna_atual + 1]}`)[0]

        if(coluna_atual !== "A" && coluna_atual !==  "H") {
            const linha_mov_1 = coluna_anterior.getElementsByClassName(`${tabuleiro.linhas[linha_movimento]}`)[0]
            const linha_mov_2 = coluna_sucessor.getElementsByClassName(`${tabuleiro.linhas[linha_movimento]}`)[0]
            pinta_movimento(linha_mov_1, linha_mov_2)
        } else if(coluna_atual === "A"){
            const linha_mov = coluna_sucessor.getElementsByClassName(`${tabuleiro.linhas[linha_movimento]}`)[0]
            pinta_movimento(linha_mov)
        } else if(coluna_atual === "H") {
            const linha_mov = coluna_anterior.getElementsByClassName(`${tabuleiro.linhas[linha_movimento]}`)[0]
            pinta_movimento(linha_mov)
        }

        }
        return linha_atual + coluna_atual
}

function pinta_movimento(linha_mov_1, linha_mov_2) {
    if(linha_mov_1 && linha_mov_2) {

        if(!linha_mov_1.classList.contains("selecionada") &&
            !linha_mov_2.classList.contains("selecionada")) {
                linha_mov_1.classList.add("selecionada")
                linha_mov_2.classList.add("selecionada")
                return
        } else {
                linha_mov_1.classList.remove("selecionada")
                linha_mov_2.classList.remove("selecionada")
                return
        }

    } else {
        if(!linha_mov_1.classList.contains("selecionada")) {
                linha_mov_1.classList.add("selecionada")
        } else {
                linha_mov_1.classList.remove("selecionada")
        }
        return
    }
}
