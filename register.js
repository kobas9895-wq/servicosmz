// Função executada ao enviar o formulário de cadastro
function cadastrarProfissional(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const profissao = document.getElementById("profissao").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();

    if (!nome || !profissao || !cidade || !bairro || !whatsapp) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novoProfissional = {
        id: profissionais.length + 1,
        nome: nome,
        servico: profissao,
        cidade: cidade,
        bairro: bairro,
        whatsapp: whatsapp
    };

    // Adiciona à lista local
    profissionais.unshift(novoProfissional);

    // Atualiza a exibição na tela imediatamente
    if (typeof exibirProfissionais === "function") {
        exibirProfissionais(profissionais);
    }

    // Limpa o formulário e avisa o utilizador
    document.getElementById("form-cadastro").reset();
    alert("Perfil criado com sucesso! O seu serviço já está visível na lista.");
}