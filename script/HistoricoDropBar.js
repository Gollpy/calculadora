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
  let newHeight;

  if (item) {
    pontosDeParada = {
      _0: 0,
      _1: item.clientHeight + 20,
      _2: item.clientHeight * 2 + 20,
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
      newHeight = pontosDeParada._4[1];
    } else if (condisao >= pontosDeParada._3) {
      newHeight = pontosDeParada._3;
    } else if (condisao >= pontosDeParada._2) {
      newHeight = pontosDeParada._2;
    } else if (condisao >= pontosDeParada._1) {
      newHeight = pontosDeParada._1;
    } else if (condisao >= pontosDeParada._0) {
      expressaoAtual.style.display = "none";
      newHeight = pontosDeParada._0;
    }

    list.height = newHeight + "px";
   
  } else {
    console.log("não a histórico");
    expressaoAtual.style.display = "none";
    list.height = 0 + "px";
  }
}
/* animação */
let animatedCssRotate = {
  _0deg: "transition: 0.250s; rotate: 0deg;",
  _180deg: "transition: 0.250s; rotate: -180deg;",
};

let iea = false;

function iconExpandAnimated(params) {
  const icon = dropBar.querySelector(".icon-expandir");
  if (params == true) {
    icon.style.cssText = animatedCssRotate._180deg;
    iea = true;
  } else if (params == false) {
    icon.style.cssText = animatedCssRotate._0deg;
    iea = false;
  } else if (params == "auto" || params == undefined) {
    iea = !iea;
  }
}
/* =======================*/

/* ======================= */
let dropBarEvent = false;
let touchStartY = 0;

function eventStart(event) {
  if (!event.target.closest("#" + lista.id)) {
    expressaoAtual.style.display = "block";
    lista.style.transition = "none";
    dropBarEvent = true;

    switch (event.type) {
      case "touchstart":
        touchStartY = event.touches[0].clientY;
        break;
      case "mousedown":
        touchStartY = event.clientY;
        break;
    }
  }
}
function eventEnd(event) {
  iconExpandAnimated(false);
  document.body.style.userSelect = "initial";
  lista.style.transition = "1s";

  dropBarEvent = false;
  dimensionarLista();
}

//xxxxxxxxx

function eventMovement(event) {
  let touch;

  switch (event.type) {
    case "touchmove":
      touch = event.touches[0];
      break;
    case "mousemove":
      touch = event;
      break;
  }

  if (dropBarEvent) {
    // document.body.style.userSelect = "none";
    event.preventDefault();

    let valor = lista.clientHeight;
    let valorMax =
      main.clientHeight -
      dropBar.clientHeight -
      historico.clientHeight -
      expressaoAtual.clientHeight;

    let touchMov = touch.clientY - touchStartY;

    if (touchMov > 0) {
      iconExpandAnimated(false);
      valor = valor + touchMov;
      lista.style.height = Math.min(valor, valorMax) + "px";
    } else {
      iconExpandAnimated(true);
      valor = valor - Math.abs(touchMov);
      lista.style.height = valor + "px";
    }

    touchStartY = touch.clientY;
  }
}

/* --- eventos --- */
historico.addEventListener('click', function() {
/* 
  a lista devera crescer quando dropBar receber um click
  armazenar informações em um objeto
*/
})

window.addEventListener("resize", function (event) {
  const targ = event.target;
  dimensionarLista();
});

/*--- eventos de touch ----*/
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
    eventMovement(event);
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
/* ----------------------- */
/*--- eventos de mouse ---*/
historico.addEventListener("mousedown", function (event) {
  eventStart(event);
});

document.addEventListener("mousemove", function (event) {
  eventMovement(event);
});

document.addEventListener("mouseup", function (event) {
  eventEnd(event);
});
/* ----------------------- */
