import { operacoes } from "./funcoesMatematicas.js";
import { addAoHistorico } from "./historicoDeResultados.js";
import {
  removerCaracterNaoPermitidos,
  adicionarPontoCentena,
  adicionarCaractere,
  apagarCaractere,
  retornaPosicaoDaBarra,
  inverterSinal,
} from "./manipuladorEntrada.js";

const entrada = document.getElementById("entrada");
const botoes = document.getElementById("botoes");
const historico = document.getElementById("historico");

/* =============================================== */

entrada.addEventListener("keydown", (event) => {
  let expressaoInput = `${entrada.value}`;
  var PPB_A = entrada.selectionStart;
  var PPB_B = entrada.selectionEnd;
  var lengthAnterior = entrada.value.length;
  var lengthPosterior;

  var caractere = {
    multiplicar: "\u00D7",
    dividir: "\u00F7",
    raiz: "\u221A",
    potencia: "^",
  };
  if (event.key === "*") {
    adicionarCaractere(entrada, caractere.multiplicar);
  } else if (event.key === "/") {
    adicionarCaractere(entrada, caractere.dividir);
  } else if (["R", "r"].includes(event.key)) {
    adicionarCaractere(entrada, caractere.raiz);
  } else if (event.altKey && ["L", "l"].includes(event.key)) {
    entrada.value = "";
  } else if (event.key === "Dead") {
    adicionarCaractere(entrada, caractere.potencia);
  } else if (event.key === "Enter") {
    try {
      var resultado = adicionarPontoCentena(operacoes(entrada.value));
    if (entrada.value && entrada.value !== resultado) {
      entrada.value = resultado;
      historico.innerHTML += addAoHistorico(expressaoInput, resultado);
      entrada.setSelectionRange(-1, -1);
      PPB_A = -1;
    } else {
      entrada.value = entrada.value;
    }
    } catch (error) {
       // uma mensagem deverar ser exibida na calculadora
       console.log('erro de sintaxe');
    }
  } else if (event.key === "Backspace") {
    // desabilita as ações das teclas, impedindo que "Backspace" apague um caractere a mais
    event.preventDefault();

    if (PPB_A !== PPB_B) {
      retornaPosicaoDaBarra(entrada, PPB_B, 0);
      apagarCaractere(entrada, PPB_B - PPB_A);
      lengthAnterior = entrada.value.length;
    } else if (entrada.value.substring(PPB_A - 1)[0] === ".") {
      apagarCaractere(entrada, 2);
    } else {
      apagarCaractere(entrada, 1);
    }
  } else if (event.key === ",") {
    event.preventDefault();
    adicionarCaractere(entrada, event.key);
  }

  if (expressaoInput !== entrada.value) {
    entrada.value = adicionarPontoCentena(entrada.value);
    lengthPosterior = entrada.value.length;
    retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
  }
});

/* =============================================== */

entrada.addEventListener("input", (event) => {
  var alvo = event.target;
  var PPB_A = entrada.selectionStart;
  var PPB_B = entrada.selectionEnd;
  var lengthAnterior = entrada.value.length;
  var lengthPosterior;

  alvo.value = removerCaracterNaoPermitidos(alvo.value);
  alvo.value = adicionarPontoCentena(alvo.value);
  lengthPosterior = entrada.value.length;
  retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
});

/* =============================================== */

botoes.addEventListener("click", (event) => {
  const expressaoInput = entrada.value;
  const alvo = event.target;
  var PPB_A = entrada.selectionStart;
  var PPB_B = entrada.selectionEnd;
  //captura o comprimento da string antes de ser add novos caractere
  var lengthAnterior = entrada.value.length;
  var lengthPosterior;
  const novoCaractere = alvo.value;

  let classes = [...alvo.classList];
  classes.map((e) => {
    entrada.focus();
    switch (e) {
      case "car":
        adicionarCaractere(entrada, novoCaractere);
        break;
      case "car_operador":
        adicionarCaractere(entrada, novoCaractere);
        break;
      case "limpar_tudo":
        entrada.value = "";
        break;
      case "apagar":
        let avancar;

        if (PPB_A != PPB_B) {
          /* apaga vários caracteres selecionados */
          //retorna o ponteiro para a posição de PPB_B
          retornaPosicaoDaBarra(entrada, PPB_B, 0);
          avancar = PPB_B - PPB_A;
          //apaga todos os caracteres selecionados
          apagarCaractere(entrada, avancar);
          //para o ponteiro de barra retornar a posição de origem
          //igualar os valores de lengthAnterior com o length atual de 'entrada.value'
          lengthAnterior = entrada.value.length;
        } else {
          /* apaga um único caractere */
          if (entrada.value.substring(PPB_A - 1)[0] === ".") {
            avancar = 2;
          } else {
            avancar = 1;
          }
          apagarCaractere(entrada, avancar);
        }

        break;
      case "igual":
        try {
          var resultado = adicionarPontoCentena(operacoes(entrada.value));
          if (entrada.value && entrada.value !== resultado) {
            entrada.value = resultado;
            historico.innerHTML += addAoHistorico(expressaoInput, resultado);
            entrada.setSelectionRange(-1, -1);
            PPB_A = -1;
          } else {
            entrada.value = entrada.value;
          }
        } catch (error) {
          // uma mensagem deverar ser exibida na calculadora
          console.log('erro de sintaxe');
        }
        break;
      case "alterar_sinal":
        entrada.value = inverterSinal(PPB_A, entrada.value);
        break;
    }
    // dividi as centenas com pontos
    // entrada.value = adicionarPontoCentena(entrada.value);
    //captura o comprimento da string depois que são add novos caractere
    // lengthPosterior = entrada.value.length;
    //retorna a posição do ponteiro com base na posição anterior e o comprimento da string anterior e posterior
    /* retornaPosicaoDaBarra(
        entrada,
        PPB_A,
        lengthPosterior - lengthAnterior
      ); */
  });

  entrada.value = adicionarPontoCentena(entrada.value);
  lengthPosterior = entrada.value.length;
  retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
});

/* =============================================== */

historico.addEventListener("click", (event) => {
  const alvo = event.target;

  switch (alvo.classList[0]) {
    case "addResultado":
      entrada.value += alvo.value;
      break;
    case "copiarResultado":
      var texto = alvo.value;
      navigator.clipboard
        .writeText(texto)
        .then(() => {
          /* função a ser executada */
          /* uma mensagem "Copiado!" é exibida na localização do ponteiro do mouse*/
        })
        .catch((err) => {
          console.error("Erro ao copiar o resultado: ", err);
        });
      break;
  }

  if (alvo.classList[0] === "addResultado") {
    entrada.value = adicionarPontoCentena(entrada.value);
  }
});
