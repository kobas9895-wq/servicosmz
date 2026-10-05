
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("lista-profissionais");
  
  if (container) {
    container.innerHTML = "<p>A carregar profissionais...</p>";
  }

  let profissionais = await carregarProfissionais();

  function renderizarLista(lista) {
    if (!container) return;
    container.innerHTML = "";

    if (!lista || lista.length === 0) {
      container.innerHTML = "<p>Nenhum profissional cadastrado de momento.</p>";
      return;
    }

    lista.forEach(prof => {
      const card = document.createElement("div");
      card.className = "card-profissional";
      card.innerHTML = `
        <h3>${prof.nome || "Sem nome"}</h3>
        <p><strong>Serviço:</strong> ${prof.categoria || "N/A"}</p>
        <p><strong>Localização:</strong> ${prof.localizacao || "N/A"}</p>
        ${prof.telefone ? `<a href="https://wa.me/258${prof.telefone}" target="_blank" class="btn-whatsapp">Contactar via WhatsApp</a>` : ''}
      `;
      container.appendChild(card);
    });
  }

  renderizarLista(profissionais);
});
