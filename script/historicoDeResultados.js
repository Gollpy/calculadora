export function addAoHistorico(expressao, resultado) {
  return `
  <li class="historico__item">
    <svg
        class="historico__icon-More-Horiz icon-More-Horiz"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24">
        <path
        d="M209.425-385Q170-385 142-412.906T114-480q0-40 27.906-67.5T209-575q39.6 0 67.8 27.5 28.2 27.5 28.2 67T276.925-413q-28.075 28-67.5 28Zm271.075 0q-39.5 0-67.5-27.906T385-480q0-40 27.906-67.5T480-575q40 0 67.5 27.5t27.5 67q0 39.5-27.5 67.5t-67 28Zm270.783 0q-39.717 0-68-27.906T655-480q0-40 28.283-67.5t68-27.5Q791-575 818.5-547.5t27.5 67q0 39.5-27.5 67.5t-67.217 28Z"
        />
    </svg>
    <div class="historico__botoes">
        <button
        class="historico__botao copiar"
        data-valor="${expressao}">
        copiar expressao
        </button>
        <button
        class="historico__botao copiar"
        data-valor="${resultado}">
        copiar resultado
        </button>
    </div>
    <div class="historico__valores">
        <samp class="historico__texto">${expressao} =</samp>
        <samp class="historico__texto">${resultado} =</samp>
    </div>
</li>`;
}


