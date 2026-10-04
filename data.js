// Lista inicial de profissionais cadastrados
const profissionaisIniciais = [
    {
        id: 1,
        nome: "João Manuel",
        profissao: "Eletricista",
        cidade: "Maputo",
        bairro: "KaMpfumu",
        whatsapp: "841234567"
    },
    {
        id: 2,
        nome: "António Carlos",
        profissao: "Canalizador",
        cidade: "Matola",
        bairro: "Machava",
        whatsapp: "859876543"
    },
    {
        id: 3,
        nome: "Pedro Miguel",
        profissao: "Mecânico",
        cidade: "Maputo",
        bairro: "Alto Maé",
        whatsapp: "820001122"
    }
];

// Carrega os dados salvos ou usa a lista inicial
function obterProfissionais() {
    const salvos = localStorage.getItem("servicosmz_profissionais");
    if (salvos) {
        return JSON.parse(salvos);
    } else {
        localStorage.setItem("servicosmz_profissionais", JSON.stringify(profissionaisIniciais));
        return profissionaisIniciais;
    }
}
