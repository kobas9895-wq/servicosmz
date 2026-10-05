const API_URL = "https://script.google.com/macros/s/AKfycbziqsmjQziQ7d8JPilQ6xbU6H0hck02Dr9YjX_FBkAZCKDCFIL9WjjpzkJwenwSFgabOQ/exec";

async function carregarProfissionais() {
  try {
    const response = await fetch(API_URL);
    const dados = await response.json();
    
    // Se a API retornar dados da planilha, usa os dados da planilha
    if (Array.isArray(dados) && dados.length > 0) {
      return dados;
    }
  } catch (error) {
    console.error("Erro ao carregar dados da API:", error);
  }

  // Dados de reserva (para a lista nunca ficar vazia)
  return [
    {
      nome: "Kobas Chival",
      categoria: "Técnico de Frio",
      localizacao: "B.aeroporto, Vilankulos",
      telefone: "843672031"
    }
  ];
}
