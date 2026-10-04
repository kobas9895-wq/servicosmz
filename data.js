// URL da tua API do Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbxlaXjGdYwAiOo2r4OQLiB_niZP6dsw7D1SSQ0AcXbZQTXNCzrxz_dvoySn4e7pbR3vxg/exec";

// Dados de exemplo locais (caso a folha de cálculo ainda esteja vazia)
const dadosExemplo = [
  {
    nome: "João Manuel",
    categoria: "Eletricista",
    localizacao: "KaMpfumu, Maputo",
    telefone: "841234567"
  },
  {
    nome: "Carlos Sitoe",
    categoria: "Canalizador",
    localizacao: "Futuhi, Matola",
    telefone: "829876543"
  }
];

// Função para carregar os profissionais da base de dados (Google Sheets)
async function carregarProfissionais() {
  try {
    const response = await fetch(API_URL);
    const dados = await response.json();
    
    // Se houver dados salvos na planilha, utiliza-os; caso contrário, mostra os exemplos
    if (dados && dados.length > 0) {
      return dados;
    } else {
      return dadosExemplo;
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return dadosExemplo;
  }
}
