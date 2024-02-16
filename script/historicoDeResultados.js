export function addAoHistorico(elemento,valor) {
    let e = document.createElement("li");
    e.innerText = valor;
    elemento.append(e);
}