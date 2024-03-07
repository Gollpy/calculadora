const main = document.querySelector(".main");
const historico = document.getElementById("historico");
const lista = document.getElementById("lista-de-resultados");
const item = lista.querySelector(".historico__item");
const dropBar = document.querySelector(".historico__drop-bar");
const expressaoAtual = document.querySelector(".historico__expressao-atual");
const entrada = document.getElementById("entrada");

function dimensionarLista(params) {
  const list = lista.style;
  const condisao = lista.clientHeight;

  function val(params) {
    if (item) {
      return {
        _0: 0,
        _1: item.clientHeight,
        _2: item.clientHeight * 2,
        _3: item.clientHeight * 3,
        _4: [
          item.clientHeight / 2 + item.clientHeight * 3,
          main.clientHeight -
            historico.clientHeight -
            expressaoAtual.clientHeight -
            dropBar.clientHeight,
        ],
      };
    } else {
      return 0;
    }
  }
  
  let pontosDeParada = {
    _0: 0,
    _1: item.clientHeight,
    _2: item.clientHeight * 2,
    _3: item.clientHeight * 3,
    _4: [
      item.clientHeight / 2 + item.clientHeight * 3,
      main.clientHeight -
        historico.clientHeight -
        expressaoAtual.clientHeight -
        dropBar.clientHeight,
    ],
  };;

  if (pontosDeParada === 0) {
    expressaoAtual.style.display = "none";
    list.height = pontosDeParada + "px";
  } else if (condisao > pontosDeParada._4[0] || condisao === pontosDeParada._4[0]) {
    list.height = pontosDeParada._4[1] + "px";
  } else if (condisao > pontosDeParada._3 || condisao === pontosDeParada._3) {
    list.height = pontosDeParada._3 + "px";
  } else if (condisao > pontosDeParada._2 || condisao === pontosDeParada._2) {
    list.height = pontosDeParada._2 + "px";
  } else if (condisao > pontosDeParada._1 || condisao === pontosDeParada._1) {
    list.height = pontosDeParada._1 + "px";
  } else if (condisao > pontosDeParada._0 || condisao === pontosDeParada._0) {
    expressaoAtual.style.display = "none";
    list.height = pontosDeParada._0 + "px";
  }
}

window.addEventListener("resize", function (event) {
  const targ = event.target;
  dimensionarLista();
});
/* ------------------------ */
let dropBarEvent = false;
let touchStartY = 0;

/* eventos de touch */

historico.addEventListener(
  "touchstart",
  function (event) {
    expressaoAtual.style.display = "block";
    lista.style.transition = "none";

    if (!event.target.closest("#" + lista.id)) {
      dropBarEvent = true;
      touchStartY = event.touches[0].clientY; // Obtém a posição inicial do toque
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  function (event) {
    if (dropBarEvent) {
      event.preventDefault(); // Impede o comportamento padrão de scroll

      let valor = lista.clientHeight;
      let valorMax =
        main.clientHeight -
        dropBar.clientHeight -
        historico.clientHeight -
        expressaoAtual.clientHeight;
      console.log(valorMax);
      let deltaY = event.touches[0].clientY - touchStartY; // Calcula a diferença de movimento no eixo Y

      if (deltaY > 0) {
        valor = valor + deltaY;
        lista.style.height = Math.min(valor, valorMax) + "px";
      } else {
        valor = valor - Math.abs(deltaY);
        lista.style.height = valor + "px";
      }
      touchStartY = event.touches[0].clientY; // Atualiza a posição inicial do toque
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchend",
  function (event) {
    document.body.style.userSelect = "initial";
    lista.style.transition = "1s";

    dropBarEvent = false;
    dimensionarLista();
  },
  { passive: false }
);

/* eventos de mouse */

historico.addEventListener("mousedown", function (event) {
  expressaoAtual.style.display = "block";
  lista.style.transition = "none";

  if (!event.target.closest("#" + lista.id)) {
    dropBarEvent = true;
  }
});

document.addEventListener("mousemove", function (event) {
  if (dropBarEvent) {
    document.body.style.userSelect = "none";

    let valor = lista.clientHeight;
    let valorMax =
      main.clientHeight -
      dropBar.clientHeight -
      historico.clientHeight -
      expressaoAtual.clientHeight;

    if (event.movementY > 0) {
      valor = valor + event.movementY;
      lista.style.height = Math.min(valor, valorMax) + "px";
    } else {
      valor = valor - Math.abs(event.movementY);
      lista.style.height = valor + "px";
    }
  }
});

document.addEventListener("mouseup", function (event) {
  document.body.style.userSelect = "initial";
  lista.style.transition = "1s";

  dropBarEvent = false;
  dimensionarLista();

  /*  if (condition) {
    
  } else {
    
  } */
});