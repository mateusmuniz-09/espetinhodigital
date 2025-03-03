function mostrarSecao(secaoId) {
  const secoes = document.querySelectorAll("section");
  secoes.forEach((secao) => secao.classList.remove("active"));

  const secaoAtiva = document.getElementById(secaoId);
  if (secaoAtiva) {
    secaoAtiva.classList.add("active");
  }
}
mostrarSecao("espetos");
