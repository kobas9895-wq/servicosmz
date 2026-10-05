// Novo URL da API do Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbziqsmjQziQ7d8JPilQ6xbU6H0hck02Dr9YjX_FBkAZCKDCFIL9WjjpzkJwenwSFgabOQ/exec";

// Função para carregar os profissionais da base de dados (Google Sheets)
async function carregarProfissionais() {
  try {
    const response = await fetch(API_URL);
    const dados = await response.json();
    return Array.isArray(dados) ? dados : [];
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return [];
  }
}
