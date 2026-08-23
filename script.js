const botaoMenu = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');
const linksMenu = document.querySelectorAll('.menu a');
const ano = document.querySelector('#ano');

if (ano) ano.textContent = new Date().getFullYear();

function fecharMenu() {
  if (!botaoMenu || !menu) return;
  menu.classList.remove('aberto');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu de navegação');
}

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  });
  linksMenu.forEach((link) => link.addEventListener('click', fecharMenu));
  document.addEventListener('click', (evento) => {
    if (!menu.contains(evento.target) && !botaoMenu.contains(evento.target)) fecharMenu();
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      fecharMenu();
      botaoMenu.focus();
    }
  });
}

const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const secoes = document.querySelectorAll('.secao');

if (!menosMovimento && 'IntersectionObserver' in window) {
  secoes.forEach((secao) => secao.classList.add('animar-ao-rolar'));
  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  secoes.forEach((secao) => observador.observe(secao));
}
