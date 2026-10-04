document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = form.querySelector('button[type="submit"]');
      const textoOriginal = btnSubmit.textContent;
      btnSubmit.textContent = "A guardar...";
      btnSubmit.disabled = true;

      const novoProfissional = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        localizacao: document.getElementById("localizacao").value,
        telefone: document.getElementById("telefone").value
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
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;
      }
    });
  }
});
