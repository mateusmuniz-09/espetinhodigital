// Seleciona todos os botões com a classe "btn-add"
const botoesMensagem = document.getElementById("btn-addModal");
// Seleciona o elemento que mostrará a mensag

// Itera sobre todos os botões
botoesMensagem.addEventListener("click", () => {
  // Adiciona a classe "visivel" para exibir a mensagem
  Swal.fire({
    title: "Item Adicionado!",
    text: "Seu item foi adicionado ao carrinho 🛒",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
});
