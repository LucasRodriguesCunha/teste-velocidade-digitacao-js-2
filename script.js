// Selecionando elemento do HTML
const digitacaoTexto = document.querySelector('.digitacao p');
(inputCampo = document.querySelector('.container .input-campo')),
  (tempoTag = document.querySelector('.tempo span b')),
  (erroTag = document.querySelector('.erros span'));
(wpmTag = document.querySelector('.wpm span')),
  (cpmTag = document.querySelector('.cpm span')),
  (tenteNovamenteBtn = document.querySelectorAll('button'));

let temporizador; // Variável para armazenar o temporizador
tempoMaximo = 60; // Tempo máximo para o usuário digitar
tempoRestante = tempoMaximo; // Tempo restante para o usuário digitar
let charIndice = (erros = tipo = 0); // Inicializando charIndice e erros com 0

function paragrafoAleatorio() {
  // Obtendo número aleatório e sempre será menor que o comprimento dos parágrafos
  let indiceAleatorio = Math.floor(Math.random() * paragrafos.length);
  digitacaoTexto.innerHTML = ''; // Limpa o parágrafo

  // Obtendo item aleatório do array de parágrafos, dividindo todos os caracteres
  // dele, adicionando cada caractere dentro do span adicione a adição deste span dentro da tag <p>
  paragrafos[indiceAleatorio].split('').forEach((span) => {
    // Obtendo item aleatório do array de parágrafos, dividindo todos os caracteres dele, adicionando cada caractere dentro do span adicione a adição deste span dentro da tag <p>
    let spanTag = `<span>${span}</span>`; // Criando a tag span para cada caractere
    digitacaoTexto.innerHTML += spanTag; // Adicionando o span dentro da tag <p>
  });

  digitacaoTexto.querySelectorAll('span')[0].classList.add('ativo'); // Adicionando a classe ativo ao primeiro caractere

  // Focando o campo de entrada no evento keydown ou click
  document.addEventListener('keydown', () => inputCampo.focus()); // Focando o campo de entrada no evento keydown ou click
  digitacaoTexto.addEventListener('click', () => inputCampo.focus()); // Focando o campo de entrada no evento keydown ou click
}

function digitacaoInicial() {
  const caracteres = digitacaoTexto.querySelectorAll('span'); // Obtendo todos os caracteres dentro do parágrafo
  let caracterDigitado = inputCampo.value.split('')[charIndice]; // Obtendo o caractere digitado pelo usuário

  if (charIndice < caracteres.length - 1 && tempoRestante > 0) {
    if (!tipo) {
      // Se o usuário não digitou nenhum caractere ou pressionou backspace
      temporizador = setInterval(tempoInicial, 1000); // Iniciando o temporizador
      tipo = true;
    }

    // Se o usuário não digitou nenhum caractere ou pressionou backspace
    if (caracterDigitado == null) {
      charIndice--; // Decrementa charIndice se o caractere for backspaced
      if (caracteres[charIndice].classList.contains('incorreto')) {
        erros--; // Decrementa os erros se o caractere for backspaced
      }
      caracteres[charIndice].classList.remove('correto', 'incorreto');
    } else {
      if (caracteres[charIndice].innerText === caracterDigitado) {
        // Corrija a classe senão incremente os erros e adicione a classe incorreta
        caracteres[charIndice].classList.add('correto');
      } else {
        erros++;
        caracteres[charIndice].classList.add('incorreto'); // Incrementa charIndice com caractere digitado correto ou incorreto
      }
      charIndice++;
    }
    caracteres.forEach((span) => span.classList.remove('ativo')); // Remove a classe atual de todos os caracteres

    caracteres[charIndice].classList.add('ativo'); // Adiciona a classe atual ao caractere atual

    let wpm = Math.round((charIndice / 5 / (tempoMaximo - tempoRestante)) * 60); // wpm = palavras por minuto

    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; // Se wpm for menor que 0 ou não for um número ou infinito, então wpm = 0

    wpmTag.innerText = wpm; // Mostra o número de palavras por minuto

    erroTag.innerText = erros; // Mostra o número de erros

    cpmTag.innerText = charIndice; // cpm   = caracteres por minuto
  } else {
    inputCampo.disabled = true; // Desabilita o campo de entrada
    clearInterval(temporizador); // Limpa o temporizador
  }
}

function tempoInicial() {
  // Função para iniciar o tempo
  if (tempoRestante > 0) {
    tempoRestante--; // Decrementa o tempo restante
    tempoTag.innerText = tempoRestante; // Mostra o tempo restante
  } else {
    inputCampo.disabled = true; // Desabilita o campo de entrada
    clearInterval(temporizador); // Limpa o temporizador
    alert('Tempo esgotado!'); // Mostra o alerta
  }
}

function reiniciarJogo() {
  paragrafoAleatorio(); // Chamando a função paragrafoAleatorio
  clearInterval(temporizador); // Limpa o temporizador
  inputCampo.value = ''; // Limpa o campo de entrada
  tempoRestante = tempoMaximo; // Tempo restante para o usuário digitar
  charIndice = erros = tipo = 0; // Inicializando charIndice e erros com 0
  tempoTag.innerText = tempoRestante; // Mostra o tempo restante
  erroTag.innerText = erros; // Mostra o número de erros
  wpmTag.innerText = 0; // Mostra o número de palavras por minuto
  cpmTag.innerText = 0; // Mostra o número de caracteres por minuto
}

paragrafoAleatorio(); // Chamando a função paragrafoAleatorio

inputCampo.addEventListener('input', digitacaoInicial); // Adicionando evento de entrada no campo de entrada

tenteNovamenteBtn.forEach((button) => {
  // Adicionando evento de clique no botão
  button.addEventListener('click', reiniciarJogo); // Adicionando evento de clique no botão
});
