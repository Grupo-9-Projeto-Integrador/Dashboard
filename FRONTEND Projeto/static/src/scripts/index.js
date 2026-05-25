const filterSelectLojas = document.getElementById("lojas")
const conteudoDashboard = document.getElementById("conteudo-dashboard")
const tituloInformacoesLoja = document.getElementById("titulo-informacoes-loja")
const dadosLojas = document.getElementById("dadosLojas")


filterSelectLojas.addEventListener('change', () => {
    if (filterSelectLojas.value != "Todas as Lojas") {
        conteudoDashboard.classList.add("hidden")
        dadosLojas.classList.remove("hidden")
        tituloInformacoesLoja.innerHTML = `Informações da Loja: ${filterSelectLojas.value}`
    } else if (filterSelectLojas.value == "Todas as Lojas") {
        conteudoDashboard.classList.remove("hidden")
    }
})



