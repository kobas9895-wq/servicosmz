// Função para renderizar os cards de profissionais no DOM
function exibirProfissionais(lista) {
    const container = document.getElementById("resultados");
    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum profissional encontrado com estes critérios.</p>";
        return;
    }

    lista.forEach(prof => {
        const card = document.createElement("div");
        card.className = "card-profissional";
        card.innerHTML = `
            <h3>${prof.nome}</h3>
            <p><strong>Serviço:</strong> ${prof.servico}</p>
            <p><strong>Localização:</strong> ${prof.bairro}, ${prof.cidade}</p>
            <a href="https://wa.me/258${prof.whatsapp}?text=Olá%20${encodeURIComponent(prof.nome)},%20encontrei%20o%20seu%20contacto%20no%20ServiçosMz!" 
               target="_blank" 
               class="btn-whatsapp">
               Contactar via WhatsApp
            </a>
        `;
        container.appendChild(card);
    });
}

// Função executada ao clicar no botão Pesquisar
function pesquisar() {
    const termoServico = document.getElementById("servico") ? document.getElementById("servico").value.toLowerCase().trim() : "";
    const termoLocalizacao = document.getElementById("localizacao") ? document.getElementById("localizacao").value.toLowerCase().trim() : "";

    const resultadosFiltrados = profissionais.filter(prof => {
        const atendeServico = prof.servico.toLowerCase().includes(termoServico);
        const atendeLocalizacao = prof.cidade.toLowerCase().includes(termoLocalizacao) || 
                                  prof.bairro.toLowerCase().includes(termoLocalizacao);
        return atendeServico && atendeLocalizacao;
    });

    exibirProfissionais(resultadosFiltrados);
}

// Carrega os profissionais iniciais assim que a página abre
document.addEventListener("DOMContentLoaded", () => {
    exibirProfissionais(profissionais);
});