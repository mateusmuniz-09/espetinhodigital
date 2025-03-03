// Seleciona todos os botões com a classe "btn-add"
const botoesMensagem = document.getElementById('btn-addModal');
// Seleciona o elemento que mostrará a mensagem
const mensagemAdd = document.getElementById('mensagem-carrinho');

// Itera sobre todos os botões
botoesMensagem.addEventListener('click', () => {
    // Adiciona a classe "visivel" para exibir a mensagem
    mensagemAdd.classList.add('visivel');

    // Remove a classe "visivel" após 3 segundos para ocultar a mensagem
    setTimeout(() => {
        mensagemAdd.classList.remove('visivel');
    }, 2000);
});
