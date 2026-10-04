document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro") || document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = form.querySelector('button[type="submit"]') || form.querySelector("button");
      const textoOriginal = btnSubmit ? btnSubmit.textContent : "Criar Perfil";
      
      if (btnSubmit) {
        btnSubmit.textContent = "A guardar...";
        btnSubmit.disabled = true;
      }

      // Função auxiliar para procurar o valor de um campo por vários IDs ou nomes possíveis
      function getVal(selectors) {
        for (let sel of selectors) {
          let el = document.getElementById(sel) || document.querySelector(`[name="${sel}"]`);
          if (el && el.value) return el.value.trim();
        }
        return "";
      }

      const nome = getVal(["nome", "nome-completo", "nomeCompleto", "name"]);
      const categoria = getVal(["categoria", "profissao", "servico", "profissao-servico"]);
      const cidade = getVal(["cidade", "city"]);
      const bairro = getVal(["bairro", "neighborhood"]);
      const localizacaoCampo = getVal(["localizacao", "location"]);
      const telefone = getVal(["telefone", "whatsapp", "contacto", "phone"]);

      // Combina Bairro e Cidade
      let localizacaoFinal = localizacaoCampo;
      if (!localizacaoFinal) {
        localizacaoFinal = [bairro, cidade].filter(Boolean).join(", ");
      }

      const novoProfissional = {
        nome: nome,
        categoria: categoria,
        localizacao: localizacaoFinal,
        telefone: telefone
      };

      try {
        await fetch(API_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(novoProfissional)
        });

        alert("Perfil criado com sucesso! O teu registo foi guardado.");
        form.reset();
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } catch (error) {
        console.error("Erro ao guardar registo:", error);
        alert("Ocorreu um erro ao guardar. Tenta novamente.");
      } finally {
        if (btnSubmit) {
          btnSubmit.textContent = textoOriginal;
          btnSubmit.disabled = false;
        }
      }
    });
  }
});
