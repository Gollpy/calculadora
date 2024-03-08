const main = document.querySelector(".main");
const historico = document.getElementById("historico");
const lista = document.getElementById("lista-de-resultados");
const item = document.querySelector(".historico__item");
const dropBar = document.querySelector(".historico__drop-bar");
const expressaoAtual = document.querySelector(".historico__expressao-atual");
const entrada = document.getElementById("entrada");

function dimensionarLista(params) {
  const list = lista.style;
  const condisao = lista.clientHeight;

  const historico = document.getElementById("historico");
  const item = document.querySelector(".historico__item");
  const dropBar = document.querySelector(".historico__drop-bar");
  const expressaoAtual = document.querySelector(".historico__expressao-atual");
  const main = document.querySelector(".main");

  let pontosDeParada;

  if (item) {
    pontosDeParada = {
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

    if (condisao >= pontosDeParada._4[0]) {
      console.log("c1");
      list.height = pontosDeParada._4[1] + "px";
    } else if (condisao >= pontosDeParada._3) {
      console.log("c2");
      list.height = pontosDeParada._3 + "px";
    } else if (condisao >= pontosDeParada._2) {
      console.log("c3");
      list.height = pontosDeParada._2 + "px";
    } else if (condisao >= pontosDeParada._1) {
      console.log("c4");
      list.height = pontosDeParada._1 + "px";
    } else if (condisao >= pontosDeParada._0) {
      console.log("c5");
      expressaoAtual.style.display = "none";
      list.height = pontosDeParada._0 + "px";
    }
  } else {
    console.log("anão a histórico");
    expressaoAtual.style.display = "none";
    list.height = 0 + "px";
  }
}

window.addEventListener("resize", function (event) {
  const targ = event.target;
  dimensionarLista();
});
/* ======================= */
let dropBarEvent = false;
let touchStartY = 0;

function eventStart(event) {
  if (!event.target.closest("#" + lista.id)) {
    expressaoAtual.style.display = "block";
    lista.style.transition = "none";
    dropBarEvent = true;
    touchStartY = event.touches[0].clientY; // Obtém a posição inicial do toque
  }
}

function eventEnd(event) {
  document.body.style.userSelect = "initial";
  lista.style.transition = "1s";

  dropBarEvent = false;
  dimensionarLista();
}

/* eventos de touch */

historico.addEventListener(
  "touchstart",
  function (event) {
    eventStart(event);
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
    eventEnd();
  },
  { passive: false }
);

/* eventos de mouse */

historico.addEventListener("mousedown", function (event) {
  eventStart(event);
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
  eventEnd(); 
});
