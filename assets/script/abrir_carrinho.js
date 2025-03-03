// Seleciona os elementos do carrinho
const abrirCarrinhoBtn = document.getElementById("abrir-carrinho");
const menuCarrinho = document.getElementById("menu-carrinho");
const overlayCarrinho = document.getElementById("overlay-carrinho")
const fecharCarrinho = document.getElementById("fechar-carrinho")



// Alterna a classe "ativo" no menu ao clicar no botão
abrirCarrinhoBtn.addEventListener("click", () => {
    menuCarrinho.classList.add("ativo");
    overlayCarrinho.classList.add("ativo");







    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        // Verifica se o clique foi fora do menu e do botão
        if (!menuCarrinho.contains(event.target) && event.target !== abrirCarrinhoBtn) {
            menuCarrinho.classList.remove('ativo');
            overlayCarrinho.classList.remove("ativo");

        }
    });
});

fecharCarrinho.addEventListener('click', () => {

    menuCarrinho.classList.remove('ativo')
    overlayCarrinho.classList.remove("ativo");

})


