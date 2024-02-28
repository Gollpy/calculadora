export function addAoHistorico(expressao, resultado) {
  return `
    <li class="historico__item">
        <div class="historico__container">
            <p class="historico__resul">${expressao} =</p>
            <div class="historico__container">
                <button class="historico__cop-resultado" value="${expressao}">copiar</button>
                <button class="historico__add-resultado" value="${expressao}">add</button>
            </div>
        </div>
        <div class="historico__container">
            <p class="historico__resul">${resultado} =</p>
            <div class="historico__container">
                <button class="historico__cop-resultado" value="${resultado}">copiar</button>
                <button class="historico__add-resultado" value="${resultado}">add</button>
            </div>
        </div>
    </li>`;
}
