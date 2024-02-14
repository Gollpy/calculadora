import { operacoes } from "./funcoesMatematicas.js";
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

entrada.addEventListener("keydown", (event) => {
  let PPB_A = entrada.selectionStart;
  let PPB_B = entrada.selectionEnd;
  let lengthAnterior = entrada.value.length;
  let lengthPosterior;

  let caractere = {
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
    let resultado = entrada.value ? operacoes(entrada.value) : null;
    entrada.value = resultado;

    if (resultado) {
      addAoHistorico(resultado);
    }
  } else if (event.key === "Backspace") {
    if (PPB_A !== PPB_B) {
      retornaPosicaoDaBarra(entrada, PPB_B, 0);
      apagarCaractere(entrada, PPB_B - PPB_A);
      entrada.value = adicionarPontoCentena(entrada.value);
            lengthAnterior = lengthAnterior - (PPB_B - PPB_A);
    } else if (entrada.value.substring(PPB_A - 1)[0] === ".") {
      apagarCaractere(entrada, 2);
    }
  }
  // console.log('str2: ' + entrada.value);
  // console.log('str2: ' + entrada.value);

  if (lengthAnterior !== entrada.value.length) {
    entrada.value = adicionarPontoCentena(entrada.value);
    lengthPosterior = entrada.value.length;
    retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
  }
});

entrada.addEventListener("input", (event) => {
  let alvo = event.target;
  let PPB_A = entrada.selectionStart;
  let PPB_B = entrada.selectionEnd;
  let lengthAnterior = entrada.value.length;
  let lengthPosterior;

  // if (lengthAnterior !== entrada.value.length) {
  alvo.value = removerCaracterNaoPermitidos(alvo.value);
  alvo.value = adicionarPontoCentena(alvo.value);
  lengthPosterior = entrada.value.length;
  retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
  // }
});

botoes.addEventListener("click", (event) => {
  const alvo = event.target;
  let PPB_A = entrada.selectionStart;
  let PPB_B = entrada.selectionEnd;
  //captura o comprimento da string antes de ser add novos caractere
  let lengthAnterior = entrada.value.length;
  let lengthPosterior;
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
        /* chaves tem o objetivo de evitar problemas futuros */
        let avancar;

        if (PPB_A != PPB_B) {
          /* apaga vários caracteres selecionados */
          //retorna o ponteiro para a posição de PPB_B
          retornaPosicaoDaBarra(entrada, PPB_B, 0);
          avancar = PPB_B - PPB_A;
          //apaga todos os caracteres selecionados
          apagarCaractere(entrada, avancar);
          //para o ponteiro de barra retornar a posição de origem
          // é preciso igualar os valores de PPB_B com PPB_A
          PPB_B = PPB_A
          //e igualar os valores de lengthAnterior com o length atual de 'entrada.value'
          lengthAnterior = entrada.value.length
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
        let resultado = entrada.value ? operacoes(entrada.value) : null;
        entrada.value = resultado;
        PPB_A = 0;

        if (resultado) {
          addAoHistorico(resultado);
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
    console.log(PPB_A, PPB_B);
    retornaPosicaoDaBarra(entrada, PPB_A, lengthPosterior - lengthAnterior);
});

function addAoHistorico(param) {
  let elemento = document.createElement("li");
  elemento.innerText = param;
  historico.append(elemento);
}
