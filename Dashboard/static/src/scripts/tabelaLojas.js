const storesFooterBtns = document.querySelectorAll(".stores-footer-btn")
const btnAnterior = storesFooterBtns[0]
const primeiroBtnPagina = storesFooterBtns[1]
const segundoBtnPagina = storesFooterBtns[2]
const btnUltimaPagina = storesFooterBtns[3]
const btnProxima = storesFooterBtns[4]

console.log(storesFooterBtns)

let numPagina = 1

btnAnterior.disabled = true
btnAnterior.classList.add("btn-disabled")



console.log(numPagina)


primeiroBtnPagina.innerHTML = numPagina
primeiroBtnPagina.attributes[1].nodeValue = numPagina
segundoBtnPagina.innerHTML = numPagina + 1
segundoBtnPagina.attributes[1].nodeValue = numPagina + 1


primeiroBtnPagina.addEventListener('click', () => {
    segundoBtnPagina.classList.remove('active')
    primeiroBtnPagina.classList.add('active')
})

segundoBtnPagina.addEventListener('click', () => {
    primeiroBtnPagina.classList.remove('active')
    segundoBtnPagina.classList.add('active')
})

btnUltimaPagina.addEventListener('click', () => {

})

btnProxima.addEventListener('click', () => {
    btnAnterior.classList.remove("btn-disabled")
    btnAnterior.classList.add("btn-active")
    if (primeiroBtnPagina.classList.contains("active")) {
        primeiroBtnPagina.classList.remove("active")
        segundoBtnPagina.classList.add("active")
    }
    if (segundoBtnPagina.classList.contains("active")) {
        primeiroBtnPagina.innerHTML = numPagina
        segundoBtnPagina.innerHTML = numPagina + 1
        numPagina++
    }

    btnAnterior.disabled = false
    console.log(numPagina)
})



btnAnterior.addEventListener('click', () => {
    numPagina--
    if (numPagina == 1) {
        btnAnterior.disabled = true
        btnAnterior.classList.remove("btn-active")
        btnAnterior.classList.add("btn-disabled")
    }
    if (primeiroBtnPagina.classList.contains("active")) {
        primeiroBtnPagina.innerHTML = numPagina
        segundoBtnPagina.innerHTML = numPagina + 1
    }
    if (segundoBtnPagina.classList.contains("active")) {
        segundoBtnPagina.classList.remove("active")
        primeiroBtnPagina.classList.add("active")
    }

    console.log(numPagina)
})


