const btn_sair = document.getElementById("sair")

btn_sair.addEventListener("click", function(){
    window.location.href = "../../index.html"
})

const tabuleiro = {
    colunas: ["A", "B", "C", "D", "E", "F", "G", "H"],
    linhas : ["1","2","3","4","5","6","7","8"]

}

const document_tabuleiro = document.getElementsByClassName("tabuleiro")[0]

// cria tabuleiro
function criar_tabuleiro() {
    for(let i=0; i < 8; i++) {
        document_tabuleiro.innerHTML += `<div class="coluna ${tabuleiro.colunas[i]}"></div>`
        const coluna_atual = document.getElementsByClassName(`${tabuleiro.colunas[i]}`)[0]
        for(let j=0; j < 8; j++) {
            coluna_atual.innerHTML += `<div class="linha ${tabuleiro.linhas[j]}"></div>`
        }
    }
}

// coloca as classes nas divs
function pintar_tabuleiro() {
    for(let i=0; i < 8; i++) {
        const coluna_atual = document.getElementsByClassName(`${tabuleiro.colunas[i]}`)[0]
        // nas linhas pares, pinta as casas pares de branco
        if(i % 2 === 0) {
            for(let j = 0; j < tabuleiro.linhas.length; j = j + 2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.classList.add("b")
            }
            for(let j = 1; j < tabuleiro.linhas.length; j = j + 2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.classList.add("c")
            }
        }
        // nas linhas impares, pinta as casas pares de cinza
        else {
            for(let j = 0; j < tabuleiro.linhas.length; j = j + 2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.classList.add("c")
            }
            for(let j = 1; j < tabuleiro.linhas.length; j = j + 2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.classList.add("b")
            }
        }
    }
}

// criar peças dois times
function criar_times() {
    // time a
    for(let i = 0; i <= 7; i++) {
        const coluna_atual = document.getElementsByClassName(`${tabuleiro.colunas[i]}`)[0]
        // se for par
        if(i % 2 === 0) {
            // coloca as peças nas casas impares até a 3
            for(let j = 1; j <= 2; j = j = j+2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca b"></span>`
            }            
        }
        // se for impar
        else {
            // coloca as peças nas casas pares até a 3
            for(let j = 0; j <= 2; j = j = j+2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca b"></span>`
            } 
        }

    }

    // time b
    for(let i = 0; i <= 7; i++) {
        const coluna_atual = document.getElementsByClassName(`${tabuleiro.colunas[i]}`)[0]
        // se for par
        if(i % 2 === 0) {
            // coloca as peças nas casas impares até a 3
            for(let j = 7; j >= 5; j = j-2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca a"></span>`
            }            
        }
        // se for impar
        else {
            // coloca as peças nas casas pares de 7   
            for(let j = 6; j >= 5; j = j-2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca a"></span>`
            } 
        }

    }
}

// cria tabuleiro, pinta e invoca peças
function iniciar() {
    criar_tabuleiro();
    pintar_tabuleiro();
    criar_times();
}

iniciar()

let ultima_peca_clicada = null
let time_a_jogar = "a"

document_tabuleiro.addEventListener('click', function(event) {
    // se for peça, pinta os movimentos possiveis
    if(event.target.classList.contains("peca") &&
        event.target.classList.contains(`${time_a_jogar}`)) 
        {
            ultima_peca_clicada = event.target

            const document_linha_atual = event.target.parentElement
            const document_coluna_atual = event.target.parentElement.parentElement

            const linha_atual = document_linha_atual.classList[1]
            const coluna_atual = document_coluna_atual.classList[1]

            console.log(event.target.classList.contains(`${time_a_jogar}`))

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

                if(time_a_jogar === "a") {
                    time_a_jogar = "b"
                } else {
                    time_a_jogar = "a"
                }
            
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
