
document.getElementById('comecar').addEventListener('click', () => {
  document.querySelector('.objetivos').scrollIntoView({ behavior: 'smooth' });
});
document.querySelectorAll('.objetivo').forEach(botao => {
  botao.addEventListener('click', () => {
    const objetivo = botao.textContent;
    const exercicios = {
      'Perder Peso': { imagem: 'esteira.png', texto: 'Esteira 30 min + Circuito Funcional' },
      'Ganhar Massa': { imagem: 'supino.png', texto: 'Supino Reto<br>4 Séries x 8-10 Reps' },
      'Definir': { imagem: 'corda.png', texto: 'Pular Corda + Abdominais' }
    };
    const card = document.querySelector('.card');
    card.querySelector('img').src = exercicios[objetivo].imagem;
    card.querySelector('p').innerHTML = exercicios[objetivo].texto;
  });
});
document.querySelectorAll('.diario input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    checkbox.parentElement.style.color = checkbox.checked ? 'lime' : '';
    salvarProgresso();
    if (checkbox.checked) registrarDataTreino();
  });
});
function salvarProgresso() {
  const estado = {};
  document.querySelectorAll('.diario input').forEach((c, i) => estado[i] = c.checked);
  localStorage.setItem('progressoTreino', JSON.stringify(estado));
}
function carregarProgresso() {
  const estado = JSON.parse(localStorage.getItem('progressoTreino')) || {};
  document.querySelectorAll('.diario input').forEach((c, i) => {
    c.checked = estado[i] || false;
    c.parentElement.style.color = c.checked ? 'lime' : '';
  });
}
function registrarDataTreino() {
  const hoje = new Date().toISOString().split('T')[0];
  const datas = JSON.parse(localStorage.getItem('datasTreino')) || [];
  if (!datas.includes(hoje)) {
    datas.push(hoje);
    localStorage.setItem('datasTreino', JSON.stringify(datas));
  }
  gerarGrafico();
}
function gerarGrafico() {
  const datas = JSON.parse(localStorage.getItem('datasTreino')) || [];
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const counts = [0, 0, 0, 0, 0, 0, 0];
  datas.forEach(data => { const d = new Date(data).getDay(); counts[d]++; });
  const ctx = document.getElementById('graficoTreino').getContext('2d');
  if (window.meuGrafico) window.meuGrafico.destroy();
  window.meuGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dias,
      datasets: [{ label: 'Treinos por dia', data: counts, backgroundColor: 'rgba(255, 99, 132, 0.7)' }]
    },
    options: { scales: { y: { beginAtZero: true, stepSize: 1 } } }
  });
}
window.addEventListener('DOMContentLoaded', () => {
  carregarProgresso();
  gerarGrafico();
});
