import { operacoes } from "./funcoesMatematicas.js";
import {
  removerCaracterNaoPermitidos,
  adicionarPontoCentena,
  adicionarCaractere,
  apagarCaractere,
  retornaPosicaoDoPonteiro,
  inverterSinal,
} from "./manipuladorEntrada.js";

const entrada = document.getElementById("entrada");
const botoes = document.getElementById("botoes");

entrada.addEventListener("keydown", (event) => {
  let PPB_A = entrada.selectionStart;
  let PPB_B = entrada.selectionEnd;
  let lengthAnterior = entrada.value.length;
  let lengthPosterior;
  console.log(event);

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
    entrada.value = operacoes(entrada.value);
  } else if (event.key === "Backspace") {
    if (PPB_A != PPB_B) {
      retornaPosicaoDoPonteiro(entrada, PPB_B, 0);
      apagarCaractere(entrada, PPB_B - PPB_A);
      entrada.value = adicionarPontoCentena(entrada.value);
      lengthAnterior = lengthAnterior - (PPB_B - PPB_A);
    } else if (entrada.value.substring(PPB_A - 1)[0] === ".") {
      apagarCaractere(entrada, 2);
    }
  }

  entrada.value = adicionarPontoCentena(entrada.value);
  lengthPosterior = entrada.value.length;
  retornaPosicaoDoPonteiro(entrada, PPB_A, lengthPosterior - lengthAnterior);
});

entrada.addEventListener("input", (event) => {
  let alvo = event.target;
  let PPB_A = entrada.selectionStart;
  let PPB_B = entrada.selectionEnd;
  let lengthAnterior = entrada.value.length;
  let lengthPosterior;

  alvo.value = removerCaracterNaoPermitidos(alvo.value);
  alvo.value = adicionarPontoCentena(alvo.value);

  lengthPosterior = entrada.value.length;
  retornaPosicaoDoPonteiro(entrada, PPB_A, lengthPosterior - lengthAnterior);
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
        {
          /* chaves tem o objetivo de evitar problemas futuros */

          if (PPB_A != PPB_B) {
            /* apaga vários caracteres selecionados */

            //retorna o ponteiro para a posição de PPB_B
            retornaPosicaoDoPonteiro(entrada, PPB_B, 0);
            //apaga os caracteres que foram selecionados
            apagarCaractere(entrada, PPB_B - PPB_A);
            entrada.value = adicionarPontoCentena(entrada.value);
            /* como o length do 'entrada.value' não é mais o mesmo, 
               então atualizamos o 'lengthAnterior' para o valor atual*/
            lengthAnterior = lengthAnterior - (PPB_B - PPB_A);
          } else {
            /* apaga um único caractere */
            if (entrada.value.substring(PPB_A - 1)[0] === ".") {
              apagarCaractere(entrada, 2);
            } else {
              apagarCaractere(entrada, 1);
            }

            lengthPosterior = entrada.value.length;
            retornaPosicaoDoPonteiro(
              entrada,
              PPB_A,
              lengthPosterior - lengthAnterior - 1
            );
          }
        }
        break;
      case "igual":
        entrada.value = adicionarPontoCentena(operacoes(entrada.value));
        break;
      case "alterar_sinal":
        entrada.value = inverterSinal(PPB_A, entrada.value);
        break;
    }
    // dividi as centenas com pontos
    entrada.value = adicionarPontoCentena(entrada.value);
    {
      //captura o comprimento da string depois que são add novos caractere
      lengthPosterior = entrada.value.length;
      //retorna a posição do ponteiro com base na posição anterior e o comprimento da string anterior e posterior
      retornaPosicaoDoPonteiro(
        entrada,
        PPB_A,
        lengthPosterior - lengthAnterior
      );
    }
  });

  entrada.focus();
});
