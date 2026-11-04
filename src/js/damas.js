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
                linha_atual.innerHTML = `<span class="peca a"></span>`
            }            
        }
        // se for impar
        else {
            // coloca as peças nas casas pares até a 3
            for(let j = 0; j <= 2; j = j = j+2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca a"></span>`
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
                linha_atual.innerHTML = `<span class="peca b"></span>`
            }            
        }
        // se for impar
        else {
            // coloca as peças nas casas pares de 7   
            for(let j = 6; j >= 5; j = j-2) {
                const linha_atual = coluna_atual.getElementsByClassName(`${tabuleiro.linhas[j]}`)[0]
                linha_atual.innerHTML = `<span class="peca b"></span>`
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


document_tabuleiro.addEventListener('click', function(event) {
    if(event.target.classList.contains("peca")) {
        const peca_clicada = event.target.classList
        const document_linha_atual = event.target.parentElement
        const document_coluna_atual = event.target.parentElement.parentElement

        const linha_atual = document_linha_atual.classList[1]
        const coluna_atual = document_coluna_atual.classList[1]

        //movimentação peca time A
        if(peca_clicada[1] === "a") {
            placeholder_peca_a(linha_atual, coluna_atual)
        }
    }
})

function placeholder_peca_a(linha_atual, coluna_atual) {
    if(linha_atual <= 7) {
        const linha_movimento = Number(linha_atual) + 1
        console.log("casas a pintar na linha: " + linha_movimento)

        if(coluna_atual !== "A" && coluna_atual !==  "H") {
            const indice_coluna_atual = tabuleiro.colunas.indexOf(coluna_atual)
            console.log("indice da coluna: " + indice_coluna_atual)

            // 
            // NOS INDICES +1 e -1 de colunas
            // PINTAR AS LINHAS com valor = "LINHA_MOVIMENTO"
            //  

            

        }
    }

    console.log(linha_atual + coluna_atual)
}