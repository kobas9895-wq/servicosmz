const API_URL = "https://script.google.com/macros/s/AKfycbwQnoDgeLf78ESNM14el8JdFpbYzlEri7DjWRuoxH_MkELdaglZAY2vXVeAjSS4hsU_/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");
  
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "A guardar perfil...";
    }

    const inputNome = document.getElementById("nome");
    const inputProfissao = document.getElementById("profissao");
    const inputCidade = document.getElementById("cidade");
    const inputBairro = document.getElementById("bairro");
    const inputWhatsApp = document.getElementById("WhatsApp") || document.getElementById("whatsapp");

    const nome = inputNome ? inputNome.value.trim() : "";
    const profissao = inputProfissao ? inputProfissao.value.trim() : "";
    const cidade = inputCidade ? inputCidade.value.trim() : "";
    const bairro = inputBairro ? inputBairro.value.trim() : "";
    const whatsapp = inputWhatsApp ? inputWhatsApp.value.trim() : "";

    const localizacaoCombinada = cidade && bairro ? `${bairro}, ${cidade}` : (cidade || bairro);

    // Envia o número sob todos os nomes possíveis para garantir a captura no Google Apps Script
    const dadosFormulario = {
      nome: nome,
      categoria: profissao,
      localizacao: localizacaoCombinada,
      telefone: whatsapp,
      whatsapp: whatsapp,
      contato: whatsapp
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFormulario)
      });

      alert("Perfil criado com sucesso!");
      form.reset();
      
      // Atualiza a lista na tela se a função existir
      if (typeof buscarEExibirProfissionais === "function") {
        setTimeout(buscarEExibirProfissionais, 1500);
      }

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro ao criar o perfil. Tente novamente.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Criar Perfil";
      }
    }
  });
});
