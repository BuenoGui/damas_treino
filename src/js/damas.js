const btn_sair = document.getElementById("sair")

btn_sair.addEventListener("click", function(){
    window.location.href = "../../index.html"
})

const tabuleiro = {
    colunas: ["A", "B", "C", "D", "E", "F", "G", "H"],
    linhas: ["0", "1", "2", "3", "4", "5", "6", "7"]
}

const document_tabuleiro = document.getElementsByClassName("tabuleiro")[0]

const direcao = {
    a: -1,
    b: 1
}

class Jogo {
    constructor() {
        this.estado = []
        this.time_a_jogar = "a"
        this.criar_equipes()
    }

    criar_equipes() {
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
            const nova_linha = linha + direcao[peca]
            const nova_coluna = coluna + direcao_diagonal

            if(this.dentro_tabuleiro(nova_linha, nova_coluna) && this.estado[nova_linha][nova_coluna] === null) {
                lista.push({linha: nova_linha, coluna:nova_coluna, captura:null})
            }
        }
        return lista
    }

    jogadas_validas(linha, coluna) {
        if(this.estado[linha][coluna] !== this.time_a_jogar) return []
        return this.movimentos_simples(linha, coluna)
    }

    mover(origem, destino) {
        const jogada = this.jogadas_validas(origem.linha, origem.coluna)
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

    destacar(jogadas) {
        for(const jogada of jogadas) {
            this.casas[jogada.linha][jogada.coluna].classList.add("selecionada")
        }
    }

    tirar_destaque() {
        this.container.querySelectorAll(".selecionada").forEach(function(peca_selecionada) {
            peca_selecionada.classList.remove("selecionada")
        })
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

let origem_selecionada = null

document_tabuleiro.addEventListener('click', function(event) {
    const casa = event.target.closest(".linha")
    if(!casa) return

    const linha = Number(casa.dataset.linha)
    const coluna = Number(casa.dataset.coluna)

    if(jogo.estado[linha][coluna] === jogo.time_a_jogar) {
        tela.tirar_destaque()

        const jogadas = jogo.jogadas_validas(linha, coluna)
        origem_selecionada = jogadas.length > 0 ? {linha, coluna} : null

        tela.destacar(jogadas)
        return
    }

    if(origem_selecionada) {
        const jogada = jogo.mover(origem_selecionada , {linha, coluna})
        if (!jogada) return

        tela.tirar_destaque()
        tela.desenhar_pecas(jogo.estado)
        origem_selecionada = null
    }

})