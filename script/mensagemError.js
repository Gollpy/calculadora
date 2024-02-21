// const mensagemElemento = document.getElementById()
export function mensagemDeErro(elemento) {
    elemento.classList.add("MsgErrorOn");
    setTimeout(function(){
      elemento.classList.remove("MsgErrorOn");
  }, 2000);
}
