const modal = document.getElementById("modal");
const overlayModal = document.getElementById("overlay-modal");
const clikCard = document.querySelectorAll(".card");
const fecharModal = document.getElementById("fechar-modal");
const modalCard = document.getElementById("card-modal");
const modalImg = modalCard.querySelector(".modal-img img");
const modalTitle = modalCard.querySelector(".card-title");
const modalDescription = modalCard.querySelector(".card-description");
const modalPrice = modalCard.querySelector(".card-price");
const modalQuantidade = document.getElementById("contador");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const btnAdicionar = document.getElementById("btn-addModal"); // Botão de adicionar ao carrinho
const carrinhoItens = document.getElementById("carrinho-itens");
const totalCarrinho = document.getElementById("valor-total-item");
const total = document.getElementById("valor-total");
const SpanTroco = document.getElementById("troco-span");

let totalParapagar = 0;
let valorTotal = 0;
let totalPagar = 0;
let somarTaxa = 0;
let trocado = 0;

let contador = document.querySelector(".cart-count");
let data = new Date();
let horas = data.getHours();
const funcionamento = document.querySelector(".funcionamento");
const corIcone = document.getElementById("cor-icone");
let taxaEntrega = document.getElementById("taxa-entrega");
const abrirCar = document.getElementById("abrir-carrinho");
taxaEntrega = 2;
precoUnitario = 0;
let carrinho = [];
/* let dinheiro = document.getElementById("dinheiro"); */

// Função para abrir o modal e carregar os dados do card clicado
clikCard.forEach((card) => {
  card.addEventListener("click", function () {
    const cardImg = card.querySelector(".card-image").src;
    const cardTitle = card.querySelector(".card-title").textContent;
    const cardDescription = card.querySelector(".card-description").textContent;
    const cardPrice = card.querySelector(".card-price").textContent;
    const categoria = card.getAttribute("data-category");
    const pontoCarne = document.getElementById("form-modal");

    pontoCarne.style.display =
      categoria === "bebida-petisco" ? "none" : "block";

    if (pontoCarne.style.opacity === "0") {
      pontoCarne.style.pointerEvents = "none";
    }

    // Atualiza os dados do modal
    modalImg.src = cardImg;
    modalTitle.textContent = cardTitle;
    modalDescription.textContent = cardDescription;
    modalQuantidade.textContent = 1; // Reset contador

    // Captura o preço unitário e formata corretamente
    precoUnitario = parseFloat(
      cardPrice.replace("R$", "").replace(",", ".").trim()
    );

    atualizarPrecoModal(1);

    abrirModal();
  });
});

// Função para abrir o modal
function abrirModal() {
  modal.classList.add("open");
  overlayModal.classList.add("open");
}

// Função para fechar o modal
function fecharModalFunc() {
  modal.classList.remove("open");
  overlayModal.classList.remove("open");

  document.querySelectorAll('input[name="pontoCarne"]').forEach((radio) => {
    radio.checked = false;
  });
}

// Eventos para fechar o modal
fecharModal.addEventListener("click", fecharModalFunc);
overlayModal.addEventListener("click", fecharModalFunc);

// Função para atualizar o preço no modal conforme a quantidade
function atualizarPrecoModal(quantidade) {
  const precoTotal = (precoUnitario * quantidade).toFixed(2);
  modalPrice.textContent = `R$ ${precoTotal}`;
}

// Aumentar quantidade no modal
increase.addEventListener("click", () => {
  let quantidade = parseInt(modalQuantidade.textContent);
  quantidade++;
  modalQuantidade.textContent = quantidade;
  atualizarPrecoModal(quantidade);
});

// Diminuir quantidade no modal
decrease.addEventListener("click", () => {
  let quantidade = parseInt(modalQuantidade.textContent);
  if (quantidade > 1) {
    quantidade--;
    modalQuantidade.textContent = quantidade;
    atualizarPrecoModal(quantidade);
  }
});

// Adicionar item ao carrinho
btnAdicionar.addEventListener("click", () => {
  abrirCar.classList.add("visible");

  let pontoCarneSelecionado = "";
  const opcaoSelecionada = document.querySelector(
    'input[name="pontoCarne"]:checked'
  );
  if (opcaoSelecionada) {
    pontoCarneSelecionado = opcaoSelecionada.value;
  }

  const nome = modalTitle.textContent;
  const quantidade = parseInt(modalQuantidade.textContent);
  const preco = precoUnitario;
  const precoTotalItem = parseFloat((preco * quantidade).toFixed(2));

  let itemExistente = carrinho.find(
    (item) => item.nome === nome && item.pontoCarne === pontoCarneSelecionado
  );

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    itemExistente.precoTotal = parseFloat(
      (itemExistente.quantidade * preco).toFixed(2)
    );
  } else {
    carrinho.push({
      nome,
      preco,
      quantidade,
      precoTotal: precoTotalItem,
      pontoCarne: pontoCarneSelecionado,
    });
  }

  atualizarCarrinho();
  fecharModalFunc();
});

// Atualiza a interface do carrinho
function atualizarCarrinho() {
  carrinhoItens.innerHTML = "";

  let valorTotal = 0;
  let taxaTexto = document.getElementById("taxa-entrega").innerText; // Pega o texto completo
  let taxaEntrega = parseFloat(taxaTexto.match(/\d+(\.\d+)?/)[0]); // Extrai o número e converte para float
  let valorRecebido = document.getElementById("valorPago").value;
  if (isNaN(valorRecebido) || valorRecebido === "") {
    valorRecebido = 0;
  }
  document.getElementById("valorPago").addEventListener("input", () => {
    atualizarCarrinho(); // Atualiza o cálculo do troco em tempo real
  });

  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    let detalhesItem = `Item: ${item.nome}`; // Sempre presente

    if (item.pontoCarne) {
      detalhesItem += `\nPonto: ${item.pontoCarne.replace("_", " ")}`;
    }

    detalhesItem += `\nSubtotal: R$ ${item.precoTotal.toFixed(2)}`;

    itemDiv.innerHTML = `
           <span class="item-info">${detalhesItem}</span>
    <button class="menosQuantidade" data-index="${index}">-</button>
   ${item.quantidade}
    <button class="maisQuantidade" data-index="${index}">+</button>
`;

    carrinhoItens.appendChild(itemDiv);
    valorTotal += item.precoTotal;

    totalParapagar = valorTotal + taxaEntrega;
    if (valorRecebido >= totalParapagar) {
      trocado = valorRecebido - totalParapagar;
    } else {
      trocado = 0; // Se for menor, mantém zerado
    }
    event.stopPropagation();
  });

  contador.innerHTML = carrinho.length;
  if (carrinho.length === 0) {
    contador.classList.remove("cartCount");
    contador.textContent = "";
    abrirCar.classList.remove("visible");
  } else {
    contador.classList.add("cartCount");
  }

  totalCarrinho.textContent = `Subtotal: R$ ${valorTotal.toFixed(2)}`;

  total.textContent = `Total a pagar: R$ ${totalParapagar.toFixed(2)}`;

  SpanTroco.textContent = `R$: ${trocado.toFixed(2)}`;

  document.querySelectorAll(".maisQuantidade").forEach((button) => {
    button.addEventListener("click", () =>
      alterarQuantidade(button.dataset.index, 1)
    );
  });

  document.querySelectorAll(".menosQuantidade").forEach((button) => {
    button.addEventListener("click", () =>
      alterarQuantidade(button.dataset.index, -1)
    );
  });
}

// Função para alterar quantidade no carrinho
function alterarQuantidade(index, quantidade) {
  index = parseInt(index);
  let item = carrinho[index];
  if (item) {
    item.quantidade += quantidade;
    if (item.quantidade <= 0) {
      carrinho.splice(index, 1);
    } else {
      item.precoTotal = parseFloat((item.quantidade * item.preco).toFixed(2));
    }
  }
  atualizarCarrinho();
}

function enviarParaWhatsapp() {
  const enderecoCliente = document
    .getElementById("endereco-cliente")
    .value.trim();
  const nomeCliente = document.getElementById("nome-cliente").value.trim();
  const obsCliente = document.getElementById("obs-cliente").value.trim();
  const pagamentoSelecionado = document.querySelector(
    'input[name="pagamento"]:checked'
  );

  if (!nomeCliente || !enderecoCliente || !pagamentoSelecionado) {
    alert(
      "⚠️ Preencha todos os campos obrigatórios antes de finalizar a compra."
    );
    return false;
  }

  let metodoPagamento = pagamentoSelecionado.value;
  let valorRecebido =
    parseFloat(document.getElementById("valorPago").value) || 0;
  let valorformatado =
    metodoPagamento === "dinheiro" ? valorRecebido.toFixed(2) : "0.00";

  let mensagem = `👋 Olá *Borcelle*! Vim pelo seu cardápio online: https://cardapioespetinho.netlify.app/ 🍢😋\n\n`;
  mensagem += `🍛 *Meu pedido:* \n\n`;

  carrinho.forEach((item) => {
    mensagem += `🍢 *${item.nome}* ${
      item.pontoCarne ? `(${item.pontoCarne.replace("_", " ")})` : ""
    }\n`;
    mensagem += `   - *Quantidade:* ${item.quantidade}\n`;
    mensagem += `   - *Preço unitário:* R$ ${item.preco.toFixed(2)}\n`;
    mensagem += `   - *Subtotal:* R$ ${item.precoTotal.toFixed(2)}\n\n`;
  });

  mensagem += `   - *Taxa de entrega:* R$ ${taxaEntrega.toFixed(2)}\n`;
  mensagem += `💰 *Total do Pedido:* R$ ${totalParapagar.toFixed(2)}\n\n`;

  if (metodoPagamento === "dinheiro") {
    mensagem += `💰 *Valor pago:* R$ ${valorformatado}\n`;
    mensagem += `💰 *Troco:* R$ ${trocado}\n\n`;
  }

  mensagem += `📝 *Dados do Cliente:*\n`;
  mensagem += `👤 *Nome:* ${nomeCliente}\n`;
  mensagem += `📌 *Endereço:* ${enderecoCliente}\n`;
  mensagem += `💳 *Forma de Pagamento:* ${metodoPagamento}\n`;
  mensagem += `✍️ *Observação:* ${obsCliente || "Nenhuma"}\n\n`;
  mensagem += `⏳ _Nosso tempo médio de espera é de 20 min! Rapidinho chega até você!_ 🛵💨`;

  const numeroWhatsapp = "5588981252883"; // Certifique-se que o número está correto
  const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
    mensagem
  )}`;

  window.open(url, "_blank");
  return true;
}

function finalizarCompra() {
  if (horas < 18 || horas >= 23) {
    alert("⚠️ Estamos fechados no momento, aguardamos por você em breve😉");
    /* return false; */
  }
  if (carrinho.length === 0) {
    alert("⚠️ Seu carrinho está vazio😐");
    return;
  }

  // Tenta enviar o pedido. Se falhar, não limpa o carrinho
  const pedidoEnviado = enviarParaWhatsapp();
  if (!pedidoEnviado) {
    return;
  }

  // Limpa o carrinho e redefine o total
  carrinho = [];
  atualizarCarrinho();
  alert("✅ Pedido enviado com sucesso! O carrinho foi esvaziado.");
  location.reload();
}

function verificarHorario() {
  if (horas >= 18 && horas < 23) {
    funcionamento.textContent = "Estamos abertos 😋";
    corIcone.style.color = "green";
  } else if (horas >= 16 && horas < 18) {
    funcionamento.textContent = "Abriremos em breve 😉";
    corIcone.style.color = "orange";
  } else {
    funcionamento.textContent = "Estamos Fechados 😴";
    corIcone.style.color = "red";
  }
}
setInterval(verificarHorario, 2000);

const opcoesPagamento = document.getElementsByName("pagamento");
let troco = document.getElementById("troco");
let pix = document.getElementById("chavePix");
opcoesPagamento.forEach((opcao) => {
  opcao.addEventListener("change", () => {
    if (opcao.value === "dinheiro") {
      troco.style.display = "flex";
      pix.style.display = "none";
    } else if (opcao.value === "pix") {
      pix.style.display = "flex";
      troco.style.display = "none";
    } else {
      troco.style.display = "none";
      pix.style.display = "none";
    }
  });
});
function copiarChave(elemento) {
  const texto = elemento.getAttribute("value").trim(); // Obtém o texto sem espaços extras

  if (!navigator.clipboard) {
    // Fallback para navegadores antigos
    const inputTemporario = document.createElement("input");
    document.body.appendChild(inputTemporario);
    inputTemporario.value = texto;
    inputTemporario.select();
    document.execCommand("copy");
    document.body.removeChild(inputTemporario);
  } else {
    // Método moderno
    navigator.clipboard
      .writeText(texto)
      .then(() => alert("✅ Chave Pix copiada com sucesso!"))
      .catch(() => alert("❌ Erro ao copiar a chave Pix."));
  }
}
