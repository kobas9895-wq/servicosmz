document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("lista-profissionais");
  
  if (container) {
    container.innerHTML = "<p style='text-align:center;'>A carregar profissionais...</p>";
  }

  let profissionais = await carregarProfissionais();

  if (!container) return;
  container.innerHTML = "";

  if (!profissionais || profissionais.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Nenhum profissional cadastrado de momento.</p>";
    return;
  }

  profissionais.forEach(prof => {
    // Procura os valores independentemente de minúsculas/maiúsculas
    const nome = prof.nome || prof.Nome || "Sem nome";
    const categoria = prof.categoria || prof.categoria || prof.servico || prof.profissao || "N/A";
    const localizacao = prof.localizacao || prof.localizacao || prof.cidade || "N/A";
    const telefone = prof.telefone || prof.telefone || prof.whatsapp || "";

    const card = document.createElement("div");
    card.className = "card-profissional";
    card.style.cssText = "border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);";

    card.innerHTML = `
      <h3 style="margin-top:0; color:#0056b3;">${nome}</h3>
      <p style="margin:5px 0;"><strong>Profissão / Serviço:</strong> ${categoria}</p>
      <p style="margin:5px 0;"><strong>Localização:</strong> ${localizacao}</p>
      ${telefone ? `
        <a href="https://wa.me/258${telefone.replace(/\s+/g, '')}" target="_blank" style="display:inline-block; margin-top:10px; padding:8px 15px; background-color:#25D366; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
          Contactar via WhatsApp
        </a>
      ` : ''}
    `;
    
    container.appendChild(card);
  });
});
