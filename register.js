// Função para cadastrar um novo profissional
function cadastrarProfissional(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const profissao = document.getElementById("profissao").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();

    if (!nome || !profissao || !cidade || !bairro || !whatsapp) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novosProfissionais = obterProfissionais();

    const novoProfissional = {
        id: Date.now(),
        nome: nome,
        profissao: profissao,
        cidade: cidade,
        bairro: bairro,
        whatsapp: whatsapp
    };

    novosProfissionais.push(novoProfissional);

    // Guarda na memória do navegador (localStorage)
    localStorage.setItem("servicosmz_profissionais", JSON.stringify(novosProfissionais));

    alert("Perfil criado com sucesso!");

    // Limpa o formulário e atualiza a lista no ecra
    document.getElementById("form-cadastro").reset();
    renderizarProfissionais(novosProfissionais);

    // Rola a página para os resultados
    window.location.hash = "#resultados";
}