// const mensagemElemento = document.getElementById()
export function mensagemDeErro(elemento) {
    elemento.classList.add("msg-error--on");
    setTimeout(function(){
      elemento.classList.remove("msg-error--on");
  }, 2000);
}
