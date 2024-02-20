export function addAoHistorico(expressao, resultado) {
  return (`
    <li>
        <div>
            <p>${expressao} =</p>
            <button class="copiarResultado" value="${expressao}">copiar</button>
            <button class="addResultado" value="${expressao}">add</button>
        </div>
        <div>
            <p>${resultado}</p>
            <button class="copiarResultado" value="${resultado}">copiar</button>
            <button class="addResultado" value="${resultado}">add</button>
        </div>
    </li>`);
}
