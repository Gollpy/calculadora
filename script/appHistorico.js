const item = document.querySelectorAll(".historico__item");
const entrada = document.getElementById("entrada");
const botoes = document.querySelector(".historico__botoes");
const moreHoriz = document.querySelector(".historico__icon-More-Horiz");

const lista = document.getElementById("lista-de-resultados");
const dropBar = document.querySelector(".historico__drop-bar");

function type(event) {
  let target = event.target;
  let addValue = target.dataset.value;

  const element = (params) => [...target.classList].includes(params);

  if (element("action-transfer") && event.type === "dblclick") {
    transfer(addValue);
  } else if (element("icon-More-Horiz") && event.type === "click") {
    /* função xxxxxxxxxxxxxxx */
   //  mostrarBotao(target);
   console.log(target.closest(".icon-More-Horiz"));

  } else if (element("action-copy") && event.type === "click") {
    copy(addValue);
  }
}

function copy(params) {
  navigator.clipboard
    .writeText(params)
    .then(() => {
      /* função a ser executada */
      /* uma mensagem "Copiado!" é exibida na localização do ponteiro do mouse*/
      console.log("good");
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
}

function transfer(params) {
  entrada.value += params;

  let eventInput = new Event("input");
  entrada.dispatchEvent(eventInput);
}

function mostrarBotao(params) {
  // const target = params.style.visibilit
}

function bloquearSeleçao(params) {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
  params.preventDefault();
}
/* --- eventos --- */
item.forEach((element) => {
  element.addEventListener("dblclick", (event) => {
    bloquearSeleçao(event);
    type(event);
  });

  element.addEventListener("click", (event) => {
    type(event);
  });
});

document.addEventListener("click", (event) => {});

document.addEventListener("mousedown", (event) => {});
