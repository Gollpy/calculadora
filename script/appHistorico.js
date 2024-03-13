const item = document.querySelectorAll(".historico__item");

const entrada = document.getElementById("entrada");
const botoes = document.querySelectorAll(".historico__botoes");

const moreHoriz = document.querySelector(".historico__icon-More-Horiz");
const lista = document.getElementById("lista-de-resultados");
const dropBar = document.querySelector(".historico__drop-bar");

let buttonVisibility = false;
let msgCopiado = true;

function type(event) {
  let target = event.target;
  const type = event.type;

  const element = (params) => target.closest(`.${params}`);

  if (element("action-transfer") && type === "dblclick") {
    transfer(event);
  } else if (element("icon-More-Horiz") && type === "click") {
    mostrarBotao(event);
  } else if (element("action-copy") && type === "click") {
    copy(event);
  }
  console.log(element());
}

function copy(params) {
  const mensagem = document.querySelector(".msg-copiado");
  const addValue = params.target.dataset.value;
  const localzc = {
    x: params.clientX - mensagem.clientWidth - 3,
    y: params.clientY - mensagem.clientHeight - 3,
  };

  navigator.clipboard
    .writeText(addValue)
    .then(() => {
      mensagem.style.cssText = `visibility: visible; top: ${localzc.y}px; left: ${localzc.x}px;`;

      setTimeout(function (r) {
        mensagem.style.cssText = `visibility: hidden; top: 0; left: 0;`;
      }, 500);
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
}

function transfer(params) {
  const addValue = params.target.dataset.value;
  entrada.value += addValue;

  let eventInput = new Event("input");
  entrada.dispatchEvent(eventInput);
}

function mostrarBotao(params) {
  const localzc =
    params.target.closest(".historico__item").getBoundingClientRect().top -
    params.currentTarget.getBoundingClientRect().top +
    params.target.closest(".icon-More-Horiz").clientHeight;
  let target = params.target
    .closest(".historico__item")
    .querySelector(".historico__botoes");

  buttonVisibility = !buttonVisibility;

  if (buttonVisibility) {
    target.style.visibility = "visible";
    target.style.top = `${localzc}px`;
  } else {
    target.style.visibility = "hidden";
  }
}

function bloquearSelecao(params) {
  params.preventDefault();
  const target = params.target
    .closest(".historico__item")
    .querySelector(".historico__valores");

  target.style.userSelect = "none";
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }

  setInterval(function (params) {
    target.style.userSelect = "";
  }, 1000);
}
/* --- eventos --- */
lista.addEventListener("dblclick", (event) => {
  bloquearSelecao(event);
  type(event);
});

lista.addEventListener("click", (event) => {
  type(event);
});

document.addEventListener("click", (event) => {});

document.addEventListener("mousedown", (event) => {});
