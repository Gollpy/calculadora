// const mensagemElemento = document.getElementById()
export function mensagemDeErro(msg) {
  const MsgError = document.getElementById("msg-error");
  MsgError.innerText += `erro: ${msg}`
  MsgError.classList.add("msg-error--on");
    setTimeout(function(){
      MsgError.classList.remove("msg-error--on");
      MsgError.innerText += ``
  }, 2000);
}
