/* 

multiplicar: "\u00D7",
    dividir: "\u00F7",
    raiz: "\u221A",

*/

export function retornaPosicaoDaBarra(alvo, posicao, avancar) {
  alvo.setSelectionRange(posicao + avancar, posicao + avancar);
}

export function removerCaracterNaoPermitidos(input) {
  const regex = new RegExp(/[0-9\u00D7\u00F7+^√%,().e-]/g);
  if (/[e]{2,9}/.test(input)) {
    input = input.replace(/[e]{2,9}/, "e");
  }
  if (regex.test(input)) {
    return input.match(regex).join("");
  } else {
    return null;
  }
}

export function adicionarPontoCentena(numero) {
  var numeroString = numero.toString();

  // remove todos os pontos
  numeroString = numeroString.replace(/[.]/g, "");
  //inverte a string
  var numeroInvertido = numeroString.split("").reverse().join("");
  // add os pontos(.)
  var numeroFormatado = numeroInvertido.replace(/((?:\d+[,])?\d{3})/g, "$1.");
  /* remove os pontos indesejados ex: '1.234.+123.'->'1.234+123'
     e inverte novamente a string */
  numeroFormatado = numeroFormatado
    .replace(/(?!\d)[.](?!\d)/g, "")
    .split("")
    .reverse()
    .join("");

  return numeroFormatado;
}

/*>->->->->->- a função add dois tipos de caracteres, números de 0 a 9, 
  e caracteres de operadores e outros ->->->->->->*/

export function adicionarCaractere(input, character) {
  let posicao = input.selectionStart;
  let parte1 = input.value.substring(0, posicao);
  let parte2 = input.value.substring(posicao);

  let primeiroCaracter = parte2.slice(0, 1);
  let ultimoCaracter = parte1.slice(parte1.length - 1);

  function procuraVirgula(parte1, parte2) {
    let a = parte1.match(/([\d.,]+)$/g);
    let b = parte2.match(/^([\d.,]+)/g);

    return (a && a[0].includes(",")) || (b && b[0].includes(","));
  }

  switch (true) {
    case /[\d(),]/.test(character):
      if (procuraVirgula(parte1, parte2) && character === ",") {
        character = "";
      }
      input.value = parte1 + character + parte2;
      break;
    case ["\u00D7", "\u221A", "\u00F7", "^", "+", "%", "-"].includes(character):
      if (
        /[(\u221A][-]?$/.test(parte1) &&
        !["-", "\u221A"].includes(character)
      ) { 
        character = "";
      } else if (/[\u00F7^\u00D7]$/.test(parte1) && character === "-") {
        null;
      } else if (
        /[\u00F7^\u00D7+][-]$/.test(parte1) &&
        ["\u00F7", "^", "\u00D7", "+"].includes(character)
      ) {
        character = "";
        parte1 = parte1.slice(0, -1);
      } else if (
        /[-+^\u00F7\u00D7]$/.test(parte1) &&
        ["-", "+", "^", "\u00F7", "\u00D7"].includes(character)
      ) {
        parte1 = parte1.slice(0, -1);
      }
      input.value = parte1 + character + parte2;
      break;
  }
}

/*<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<- */

export function apagarCaractere(input, avancar) {
  avancar ? (avancar = Number(avancar)) : (avancar = 1);
  // avancar = Number(avancar) |
  let posicao = input.selectionStart;
  let parte1 = input.value.substring(0, posicao - avancar);
  let parte2 = input.value.substring(posicao);

  input.value = parte1 + parte2;
}
//->->->-alternar sinais->->->-->->->-
// as funções invertem o sinal de um numero
/* export function inverterSinal(captura) {
  const CasosEspeciais = verificaCaractereEspecial(captura);
  if (CasosEspeciais !== null) {
    return CasosEspeciais;
  }
  return processNormalCases(captura);
} */

export function inverterSinal(posicao, str) {
  const regex = new RegExp(/([\d\D]+?)?([+-]{1,2}?)?([.,0-9e+]+)$/);

  let parte1 = str.substring(0, posicao);
  let parte2 = str.substring(posicao);
  let captura = parte1.match(regex);
  const CasosEspeciais = processarCasosEspeciais(captura);
  if (CasosEspeciais !== null) {
    parte1 = CasosEspeciais;
  } else {
    parte1 = processarCasosNormais(captura);
  }

  return parte1 + parte2;
}

function processarCasosEspeciais(captura) {
  const casoEspecial = new RegExp(/[\u221A\u005E\u0025\u00D7\u00F7]/);
  const ultimoCaractere =
    captura[1] != null
      ? captura[1].substring(captura[1].length - 1)
      : (captura[1] = "");
  if (casoEspecial.test(ultimoCaractere)) {
    if (!captura[2]) {
      return captura[1] + "-" + captura[3];
    } else if (captura[2] === "-" || captura[2] === "+") {
      return captura[1] + captura[3];
    }
  }
  return null;
}

function processarCasosNormais(captura) {
  if (captura[1] === "-" || captura[1] === "+") {
    return captura[3];
  } else if (captura[2] === "-" || captura[2] === "+") {
    return captura[1] + captura[2] + "-" + captura[3];
  } else if (["--", "+-", "++"].includes(captura[2])) {
    return captura[1] + captura[2].substring(0, 1) + captura[3];
  } else {
    return "-" + captura[1] + captura[3];
  }
}

//<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-
