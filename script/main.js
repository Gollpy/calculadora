import { mensagemDeErro } from "./mensagemError.js";
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

/* 

revisar todos os eventos e aplicas as bos praticas

*/
const main = document.querySelector(".main");
const entrada = document.getElementById("entrada");
const botoes = document.getElementById("botoes");
const historico = document.getElementById("historico");
const MsgError = document.getElementById("msg-error");

/* =============================================== */

entrada.addEventListener("keydown", (event) => {
  const expressaoInput = `${entrada.value}`;
  var PPB_A = entrada.selectionStart; // <---- mudar o chamado para event.target
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
    if (operacoes(entrada.value) !== "error") {
      var resultado = adicionarPontoCentena(operacoes(entrada.value));
      if (entrada.value && entrada.value !== resultado) {
        entrada.value = resultado;
        historico.querySelector("#lista-de-resultados").innerHTML +=
          addAoHistorico(expressaoInput, resultado);
        entrada.setSelectionRange(-1, -1);
        PPB_A = -1;
      } else {
        entrada.value = entrada.value;
      }
    } else {
      mensagemDeErro(MsgError);
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
  const alvo = event.target.closest(".botao");
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
      case "apagar-tudo":
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
        if (operacoes(entrada.value) !== "error") {
          var resultado = adicionarPontoCentena(operacoes(entrada.value));
          if (entrada.value && entrada.value !== resultado) {
            entrada.value = resultado;
            historico.querySelector("#lista-de-resultados").innerHTML +=
              addAoHistorico(expressaoInput, resultado);
            entrada.setSelectionRange(-1, -1);
            PPB_A = -1;
          } else {
            entrada.value = entrada.value;
          }
        } else {
          mensagemDeErro(MsgError);
        }

        /* if (calidar() === "error") {
            mensagemDeErro(MsgError);
          }
         */

        break;
      case "inverter-sinal":
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

  const classes = [...alvo.classList];
  classes.map((item) => {
    switch (item) {
      case "add-resultado":
        entrada.value += alvo.value;
        entrada.value = adicionarPontoCentena(entrada.value);
        break;
      case "cop-resultado":
        var texto = alvo.value;
        navigator.clipboard
          .writeText(texto)
          .then(() => {
            /* função a ser executada */
            /* uma mensagem "Copiado!" é exibida na localização do ponteiro do mouse*/
          })
          .catch((err) => {
            console.error("Erro ao copiar: ", err);
          });
        break;
    }
  });
});

let dropBar = false;

historico.addEventListener("mousedown", (event) => {
  historico.style.userSelect = 'none'
  dropBar = true;
});

document.addEventListener("mousemove", (event) => {
  const lista = document.getElementById("lista-de-resultados");
  if (dropBar) {
    let valor = lista.clientHeight
    if (event.movementY > 0) {
      valor = valor + 4
      lista.style.height = valor + "px";
    } else {
      valor = valor - 4
      lista.style.height = valor + "px";
    }
  }
});

document.addEventListener("mouseup", (event) => {
  historico.style.userSelect = 'initial'
  dropBar = false;
});
