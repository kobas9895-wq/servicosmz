const API_URL = "https://script.google.com/macros/s/AKfycbwQnoDgeLf78ESNM14el8JdFpbYzlEri7DjWRuoxH_MkELdaglZAY2vXVeAjSS4hsU_/exec";

async function buscarEExibirProfissionais() {
  const container = document.getElementById("lista-profissionais");
  if (!container) return;

  container.innerHTML = "<p style='text-align:center; padding: 15px;'>A carregar profissionais...</p>";

  try {
    const res = await fetch(API_URL);
    const dados = await res.json();

    container.innerHTML = "";

    if (!dados || !Array.isArray(dados) || dados.length === 0) {
      container.innerHTML = "<p style='text-align:center; padding: 15px;'>Nenhum profissional cadastrado no momento.</p>";
      return;
    }

    dados.forEach(prof => {
      const nome = prof.nome || prof.Nome || "Sem nome";
      const categoria = prof.categoria || prof.servico || prof.profissao || "N/A";
      const localizacao = prof.localizacao || prof.cidade || "N/A";
      
      // Procura o telefone em vários possíveis nomes de coluna
      let rawTelefone = prof.telefone || prof.Telefone || prof.whatsapp || prof.WhatsApp || prof.contato || "";
      
      // Converte para texto e remove tudo o que não for número
      let numLimpo = String(rawTelefone).replace(/\D/g, "");

      // Se começar com 8 (ex: 841234567), adiciona o indicativo 258
      if (numLimpo.length === 9 && numLimpo.startsWith("8")) {
        numLimpo = "258" + numLimpo;
      }

      const card = document.createElement("div");
      card.className = "card-profissional";
      card.style.cssText = "border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);";

      card.innerHTML = `
        <h3 style="margin: 0 0 8px 0; color: #0066cc;">${nome}</h3>
        <p style="margin: 4px 0;"><strong>Serviço:</strong> ${categoria}</p>
        <p style="margin: 4px 0;"><strong>Localização:</strong> ${localizacao}</p>
        ${numLimpo.length >= 8 ? `
          <a href="https://wa.me/${numLimpo}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 14px; background-color: #25D366; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">
            Contactar via WhatsApp
          </a>
        ` : `<p style="margin: 4px 0; color: #888; font-size: 13px;"><em>Sem contacto de WhatsApp disponível</em></p>`}
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Erro ao procurar dados:", err);
    container.innerHTML = "<p style='text-align:center; color: red; padding: 15px;'>Erro ao carregar lista. Verifique a ligação.</p>";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", buscarEExibirProfissionais);
} else {
  buscarEExibirProfissionais();
}
