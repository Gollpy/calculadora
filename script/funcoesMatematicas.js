export function operacoes(input) {
  input = mudaCaracteres(input);

  
  while (/[(\u221A\u005E%]/.test(input)) {
    if (/[(][\d\u221A\u005E%+*/e-]+[)]/.test(input)) {
      input = operacaoEntreParenteses(input);
    } else if (/[\u221A]/.test(input)) {
      input = radiciacao(input);
    } else if (/[\u005E]/.test(input)) {
      input = potenciacao(input);
    } else if (/[%]/.test(input)) {
      input = porcentagem(input);
    }
  }

  input = `${avaliarExpressao(input)}`;
  input = input.replace(/[.]/, ",");
  return input;
}
function mudaCaracteres(params) {
  let valor = "";
  let a = params.replace(/[.]/g, "");
  let b = a.replace(/[,]/g, ".");
  let c = b.replace(/[\u00D7]/g, "*");
  let d = c.replace(/\u00F7/g, "/");
  return d;
}

function regraDeSinais(params) {
  let a = params.replace(/[-]{2}|[+]{2}/g, "+");
  let c = a.replace(/[+][-]|[-][+]/g, "-");
  return c;
}

function avaliarExpressao(params) {
  /[-]{2}|[+]{2}|[+][-]|[-][+]/g.test(params)
    ? (params = regraDeSinais(params))
    : null;
  let a = new Function("return " + params);
  let b = a();
  return b;
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
    /([\d]+(?:[.][\de+]+)?)(?:\u005E)([-]?[\d]+(?:[.][\de+]+)?)?/
  );
  let regex2 = new RegExp(
    /([\d]+(?:[.][\de+]+)?)(\u005E)([-]?[\d]+(?:[.][\de+]+)?)?/
  );
  let captura = input.toString(10).match(regex);

  if (captura) {
    let a = Number(captura[1]);
    let b = Number(captura[2]);
    let resultado = Math.pow(a, b);

    return input.replace(regex2, `${resultado}`);
  } else {
    return "error";
  }
}
function porcentagem(input) {
  let regex = new RegExp(
    /([\d]+(?:[.][\de+]+)?)(?:[%])([\d]+(?:[.][\de+]+)?)?/
  );
  let regex2 = new RegExp(/([\d]+(?:[.][\de+]+)?)([%])([\d]+(?:[.][\de+]+)?)?/);
  let captura = input.toString(10).match(regex);
  if (captura) {
    let a = Number(captura[1]);
    let b = Number(captura[2]);
    let resultado = captura[2] ? (a * b) / 100 : a / 100;

    return input.replace(regex2, `${resultado}`);
  } else {
    return "error";
  }
}

function radiciacao(input) {
  let regex1 = new RegExp(/([)\d]+)?(?:\u221A)([\d]+(?:[.][\de+]+)?)/);
  let regex2 = new RegExp(/(\u221A)([\d]+(?:[.][\de+]+)?)/g);

  let captura = input.toString().match(regex1);

  if (captura) {
    let resultado = Math.sqrt(captura[2]);

    if (captura[1]) {
      return input.replace(regex2, `*${resultado}`);
    } else {
      return input.replace(regex2, `${resultado}`);
    }
  } else {
    return "error";
  }
}

function operacaoEntreParenteses(input) {
  let regex1 = new RegExp(
    /([\d)]+)?(?:[(])([-+/*\d\u221A\u005E%]+)(?:[)])([\d(]+)?/
  );
  let regex2 = new RegExp(/[(][-+/*\d\u221A\u005E%]+[)]/);

  let captura = input.match(regex1);

  if (captura) {
    let resultado = captura[2];
    while (/[\u221A\u005E%]/.test(resultado)) {
      if (/[\u221A]/.test(resultado)) {
        resultado = radiciacao(resultado);
      } else if (/[\u005]/.test(resultado)) {
        resultado = potenciacao(resultado);
      } else if (/[%]/.test(resultado)) {
        resultado = porcentagem(resultado);
      }
    }

    resultado = `${avaliarExpressao(resultado)}`;

    if (captura[1] && captura[3]) {
      return input.replace(regex2, `*${resultado}*`);
    } else if (captura[1]) {
      console.log(input);
      return input.replace(regex2, `*${resultado}`);
    } else if (captura[3]) {
      return input.replace(regex2, `${resultado}*`);
    } else {
      return input.replace(regex2, `${resultado}`);
    }
  } else {
    return "error";
  }
}
