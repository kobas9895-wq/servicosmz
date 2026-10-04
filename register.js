document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = form.querySelector('button[type="submit"]');
      const textoOriginal = btnSubmit ? btnSubmit.textContent : "Criar Perfil";
      
      if (btnSubmit) {
        btnSubmit.textContent = "A guardar...";
        btnSubmit.disabled = true;
      }

      // Obtém os valores dos campos (com suporte a Cidade/Bairro ou Localização)
      const nome = document.getElementById("nome") ? document.getElementById("nome").value : "";
      const categoria = document.getElementById("categoria") ? document.getElementById("categoria").value : "";
      const cidade = document.getElementById("cidade") ? document.getElementById("cidade").value : "";
      const bairro = document.getElementById("bairro") ? document.getElementById("bairro").value : "";
      const localizacaoCampo = document.getElementById("localizacao") ? document.getElementById("localizacao").value : "";
      const telefone = document.getElementById("telefone") ? document.getElementById("telefone").value : "";

      // Junta Cidade e Bairro caso existam separadamente
      let localizacaoFinal = localizacaoCampo;
      if (!localizacaoFinal && (cidade || bairro)) {
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
