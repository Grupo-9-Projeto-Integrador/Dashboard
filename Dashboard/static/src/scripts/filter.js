const filterSelectLojas = document.getElementById("lojas")
const formLojas = document.getElementById("lojasForm")
const conteudoDashboard = document.getElementById("conteudo-dashboard")
const tituloInformacoesLoja = document.getElementById("titulo-informacoes-loja")
const dadosLojas = document.getElementById("dadosLojas")
const campoTextoSeguro = document.getElementById("texto-seguro")



function enviarDados() {
    if (formLojas.value !== "Todas as Lojas") {
        formLojas.submit()
        const formData = new FormData(document.getElementById("lojasForm"))


        fetch('/infoLoja', {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(response => {
            console.log("Dados enviados com sucesso!")
        })
    } else {
        window.location.href = "index.html"
    }
}











