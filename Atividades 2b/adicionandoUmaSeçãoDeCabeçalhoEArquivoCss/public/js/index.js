const form = document.querySelector("#form")
form.addEventListener("submit", (e) => {
    const operacao = document.querySelector("#operacao").value
    const num2 = document.querySelector("#num2").value
    const erro = document.querySelector("#erro")
    if (operacao == "/") {
        if (num2 == 0) {
            e.preventDefault()
            erro.textContent = "Erro! Divisor inválido."
        }
    }
})