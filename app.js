// Função para exibir os profissionais na tela
function renderizarProfissionais(lista) {
    const container = document.getElementById("resultados");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum profissional encontrado para esta pesquisa.</p>";
        return;
    }

    lista.forEach(p => {
        const card = document.createElement("div");
        card.className = "card-profissional";
        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p><strong>Profissão:</strong> ${p.profissao}</p>
            <p><strong>Localização:</strong> ${p.cidade} (${p.bairro})</p>
            <a href="https://wa.me/258${p.whatsapp}?text=Olá%20${encodeURIComponent(p.nome)},%20encontrei%20o%20seu%20contacto%20no%20ServiçosMz." 
               target="_blank" 
               class="btn-whatsapp">
                Contactar via WhatsApp
            </a>
        `;
        container.appendChild(card);
    });
}

// Função de pesquisa
function pesquisar() {
    const servico = document.getElementById("servico").value.toLowerCase().trim();
    const localizacao = document.getElementById("localizacao").value.toLowerCase().trim();

    const todos = obterProfissionais();

    const filtrados = todos.filter(p => {
        const bateuServico = !servico || p.profissao.toLowerCase().includes(servico) || p.nome.toLowerCase().includes(servico);
        const bateuLocal = !localizacao || p.cidade.toLowerCase().includes(localizacao) || p.bairro.toLowerCase().includes(localizacao);

        return bateuServico && bateuLocal;
    });

    renderizarProfissionais(filtrados);
}

// Carrega todos os profissionais assim que a página abre
document.addEventListener("DOMContentLoaded", () => {
    const profissionais = obterProfissionais();
    renderizarProfissionais(profissionais);
});
