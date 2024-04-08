
export function operacoes(input) {
  input = substituirCaracteres(input);

  while (/[(\u221A\u005E%]/.test(input)) {
    if (/[(]/.test(input)) {
      input = operacaoEntreParenteses(input);
    } else if (/[\u221A]/.test(input)) {
      input = radiciacao(input);
    } else if (/[\u005E]/.test(input)) {
      input = potenciacao(input);
    } else if (/[%]/.test(input)) {
      input = porcentagem(input);
    }
  }

  if (input[0] === "error") {
    return input;
  } else {
    input = avaliarExpressao(input);
    if (input[0] === "error") {
      return input;
    } else {
      return input.replace(/[.]/, ",");
    }
  }
}

function substituirCaracteres(params) {
  let a = "";
  for (let index = 0; index < params.length; index++) {
    let e = params[index];
    switch (params[index]) {
      case ".":
        e = "";
        break;
      case ",":
        e = ".";
        break;
      case "\u00D7":
        e = "*";
        break;
      case "\u00F7":
        e = "/";
        break;
    }
    a += e;
  }

  return a;
}

function regraDeSinais(params) {
  let a = params.replace(/[-]{2}|[+]{2}/g, "+");
  let c = a.replace(/[+][-]|[-][+]/g, "-");
  0;
  return c;
}

function avaliarExpressao(params) {
  try {
    /[-]{2}|[+]{2}|[+][-]|[-][+]/g.test(params)
      ? (params = regraDeSinais(params))
      : null;
    let a = new Function("return " + params);
    let b = a();
    if (b === Infinity) {
      return ["error", "Infinity"];
    }
    return `${b}`;
  } catch (error) {
    return ["error", "sintaxe"];
  }
}

//========== funções matemáticas =============
/*
    As funções recebem uma string inteira e retorna a string
    com a determinada expressão substituída pelo resultado da
    expressão ou 'erro' se a expressão não corresponder.

    Exemplo:  radiciacao('3√81') retorna '3*9';
              radiciacao('81') retorna 'erro'
  */

function potenciacao(input) {
  let regex = new RegExp(
    /([\d]+(?:[.][\de+]+)?)(?:\u005E)([-]?[\d]+(?:[.][\de+]+)?)/
  );
  let regex2 = new RegExp(
    /([\d]+(?:[.][\de+]+)?)(\u005E)([-]?[\d]+(?:[.][\de+]+)?)/
  );
  let captura = input.toString(10).match(regex);
  if (captura) {
    let a = Number(captura[1]);
    let b = Number(captura[2]);
    let resultado = Math.pow(a, b);

    if (resultado === Infinity) {
      return ["error", "infinity"];
    } else {
      return input.replace(captura[0], `${resultado}`);
    }
  } else {
    return ["error", "sintaxe"];
  }
}

function porcentagem(input) {
  let regex = new RegExp(/([\d]+(?:[.][\de+]+)?)([%])([\d]+(?:[.][\de+]+)?)?/);
  let captura = input.toString(10).match(regex);

  if (captura) {
    let captura_3 = captura[3] ? captura[3] : "";
    let valida = captura[1] + captura[2] + captura_3;
    let a = Number(captura[1]);
    let b = Number(captura[3]);
    let resultado = captura[3] ? (a * b) / 100 : a / 100;

    if (resultado === Infinity) {
      return ["error", "infinity"];
    } else {
      return input.replace(valida, `${resultado}`);
    }
  } else {
    return ["error", "sintaxe"];
  }
}

function radiciacao(input) {
  let regex1 = new RegExp(/([)\d]+)?(?:\u221A)([\d]+(?:[.][\de+]+)?)/);
  let captura = input.toString().match(regex1);

  if (captura) {
    let valida = `\u221A${captura[2]}`;
    let resultado = Math.sqrt(captura[2]);

    if (captura[1]) {
      return input.replace(valida, `*${resultado}`);
    } else {
      return input.replace(valida, `${resultado}`);
    }
  } else {
    return ["error", "sintaxe"];
  }
}
function operacaoEntreParenteses(input) {
  let captura = extrairExpressao(input);

  if (captura[0]) {
    let resultado = captura[0];
    while (/[\u221A\u005E%]/.test(resultado)) {
      if (/[\u221A]/.test(resultado)) {
        resultado = radiciacao(resultado);
      } else if (/[\u005E]/.test(resultado)) {
        resultado = potenciacao(resultado);
      } else if (/[%]/.test(resultado)) {
        resultado = porcentagem(resultado);
      }
    }

    if (resultado[0] === "error") {
      return resultado;
    } else {
      resultado = `${avaliarExpressao(resultado)}`;

      let a = input.slice(0, captura[1]);
      let b = input.slice(captura[2] + 1);

      if (Number(input[captura[1] - 1]) && Number(input[captura[2] + 1])) {
        return `${a}*${resultado}*${b}`;
      } else if (Number(input[captura[1] - 1])) {
        return `${a}*${resultado}${b}`;
      } else if (Number(input[captura[2] + 1])) {
        return `${a}${resultado}*${b}`;
      } else {
        return `${a}${resultado}${b}`;
      }
    }
  } else {
    return ["error", "sintaxe"];
  }
}

function extrairExpressao(params) {
  let str = params;
  let start;
  let end = str.length;
  let newStr = "";
  for (let index = 0; index < str.length; index++) {
    let element = str[index];
    if (element === "(") {
      start = index;
    }
  }

  for (let index = start + 1; index < str.length; index++) {
    let element = str[index];
    if (element === ")") {
      end = index;
      break;
    }
    newStr += element;
  }
  return [newStr, start, end];
}

/* if (captura) {
  let valida = captura[2] + captura[3] + captura[4];
  console.log(valida);
  let resultado = captura[3];
  while (/[\u221A\u005E%]/.test(resultado)) {
    if (/[\u221A]/.test(resultado)) {
      resultado = radiciacao(resultado);
    } else if (/[\u005E]/.test(resultado)) {
      resultado = potenciacao(resultado);
    } else if (/[%]/.test(resultado)) {
      resultado = porcentagem(resultado);
    }
  }
  if (resultado !== "error") {
    resultado = `${avaliarExpressao(resultado)}`;

    if (captura[1] && captura[5]) {
      return input.replace(valida, `*${resultado}*`);
    } else if (captura[1]) {
      return input.replace(valida, `*${resultado}`);
    } else if (captura[5]) {
      return input.replace(valida, `${resultado}*`);
    } else {
      return input.replace(valida, `${resultado}`);
    }
  } else {
    return ["error", "sintaxe"];
  }
} else {
  return ["error", "sintaxe"];
} */
