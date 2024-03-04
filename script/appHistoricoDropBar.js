const main = document.querySelector(".main");
const historico = document.getElementById("historico");

const lista = document.getElementById("lista-de-resultados");
const dropBar = document.querySelector(".historico__drop-bar");

let dropBarEvent = false;
let touchStartY = 0;

/* eventos de touch */

historico.addEventListener(
  "touchstart",
  (event) => {
    if (!event.target.closest("#" + lista.id)) {
      dropBarEvent = true;
      touchStartY = event.touches[0].clientY; // Obtém a posição inicial do toque
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (dropBarEvent) {
      event.preventDefault(); // Impede o comportamento padrão de scroll

      let valor = lista.clientHeight;
      let valorMax =
        main.clientHeight - dropBar.clientHeight - historico.clientHeight;
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
  () => {
    dropBarEvent = false;
  },
  { passive: false }
);

/* eventos de mouse */

historico.addEventListener("mousedown", (event) => {
  if (!event.target.closest("#" + lista.id)) {
    dropBarEvent = true;
  }
});

document.addEventListener("mousemove", (event) => {
  if (dropBarEvent) {
    document.body.style.userSelect = "none";

    let valor = lista.clientHeight;
    let valorMax =
      main.clientHeight - dropBar.clientHeight - historico.clientHeight;

    if (event.movementY > 0) {
      valor = valor + event.movementY;
      lista.style.height = Math.min(valor, valorMax) + "px";
    } else {
      valor = valor - Math.abs(event.movementY);
      lista.style.height = valor + "px";
    }
  }
});

document.addEventListener("mouseup", (event) => {
  document.body.style.userSelect = "initial";
  dropBarEvent = false;
});
