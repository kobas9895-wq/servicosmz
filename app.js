document.addEventListener("DOMContentLoaded", async () => {
  // Carrega os dados da planilha via Google Apps Script
  let profissionais = await carregarProfissionais();
  
  const container = document.getElementById("lista-profissionais");
  const inputBusca = document.getElementById("input-busca");
  const inputLocalizacao = document.getElementById("input-localizacao");
  const btnPesquisar = document.getElementById("btn-pesquisar");

  function renderizarLista(lista) {
    if (!container) return;
    container.innerHTML = "";

    if (lista.length === 0) {
      container.innerHTML = "<p>Nenhum profissional encontrado.</p>";
      return;
    }

    lista.forEach(prof => {
      const card = document.createElement("div");
      card.className = "card-profissional";
      card.innerHTML = `
        <h3>${prof.nome}</h3>
        <p><strong>Serviço:</strong> ${prof.categoria}</p>
        <p><strong>Localização:</strong> ${prof.localizacao}</p>
        <a href="https://wa.me/258${prof.telefone}" target="_blank" class="btn-whatsapp">
          Contactar via WhatsApp
        </a>
      `;
      container.appendChild(card);
    });
  }

  // Renderiza a lista inicial
  renderizarLista(profissionais);

  // Lógica de pesquisa
  if (btnPesquisar) {
    btnPesquisar.addEventListener("click", () => {
      const termoServico = inputBusca ? inputBusca.value.toLowerCase().trim() : "";
      const termoLocal = inputLocalizacao ? inputLocalizacao.value.toLowerCase().trim() : "";

      const filtrados = profissionais.filter(prof => {
        const atendeServico = (prof.categoria || "").toLowerCase().includes(termoServico);
        const atendeLocal = (prof.localizacao || "").toLowerCase().includes(termoLocal);
        return atendeServico && atendeLocal;
      });

      renderizarLista(filtrados);
    });
  }
});
