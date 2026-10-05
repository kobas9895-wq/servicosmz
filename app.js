const API_URL = "https://script.google.com/macros/s/AKfycbziqsmjQziQ7d8JPilQ6xbU6H0hck02Dr9YjX_FBkAZCKDCFIL9WjjpzkJwenwSFgabOQ/exec";

async function renderizarProfissionais() {
  const container = document.getElementById("lista-profissionais");
  if (!container) return;

  container.innerHTML = "<p style='text-align:center; padding: 10px;'>A carregar profissionais...</p>";

  try {
    const response = await fetch(API_URL);
    const dados = await response.json();

    container.innerHTML = "";

    if (!Array.isArray(dados) || dados.length === 0) {
      container.innerHTML = "<p style='text-align:center; padding: 10px;'>Nenhum profissional cadastrado de momento.</p>";
      return;
    }

    dados.forEach(prof => {
      const nome = prof.nome || prof.Nome || "Sem nome";
      const categoria = prof.categoria || prof.servico || prof.profissao || "N/A";
      const localizacao = prof.localizacao || prof.cidade || "N/A";
      const telefone = prof.telefone || prof.whatsapp || "";

      const card = document.createElement("div");
      card.style.cssText = "border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);";

      card.innerHTML = `
        <h3 style="margin: 0 0 8px 0; color: #0066cc;">${nome}</h3>
        <p style="margin: 4px 0;"><strong>Serviço:</strong> ${categoria}</p>
        <p style="margin: 4px 0;"><strong>Localização:</strong> ${localizacao}</p>
        ${telefone ? `
          <a href="https://wa.me/258${telefone.toString().replace(/\s+/g, '')}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 12px; background-color: #25D366; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">
            Contactar via WhatsApp
          </a>
        ` : ''}
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    container.innerHTML = "<p style='text-align:center; color: red; padding: 10px;'>Erro ao carregar a lista de profissionais.</p>";
  }
}

document.addEventListener("DOMContentLoaded", renderizarProfissionais);
