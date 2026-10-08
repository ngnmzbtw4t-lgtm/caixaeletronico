let saldo = 10000;

function sacar() {

    let valor = Number(
        document.getElementById("valor").value
    );

    let resultado =
        document.getElementById("resultado");

    resultado.innerHTML = "";

    // Verifica se o valor é válido
    if (valor <= 0 || isNaN(valor)) {

        resultado.innerHTML =
            '<p class="erro">Digite um valor válido para o saque.</p>';

        return;
    }

    // Verifica se o valor é inteiro
    if (!Number.isInteger(valor)) {

        resultado.innerHTML =
            '<p class="erro">O saque deve ser um valor inteiro.</p>';

        return;
    }

    // Verifica o saldo
    if (valor > saldo) {

        resultado.innerHTML =
            '<p class="erro">Saldo insuficiente.</p>';

        return;
    }

    let valorOriginal = valor;

    // Notas disponíveis
    let notas = [100, 50, 20, 10, 5, 2];

    let quantidadeNotas = [];

    // Calcula as notas
    for (let nota of notas) {

        let quantidade =
            Math.floor(valor / nota);

        quantidadeNotas.push({
            nota: nota,
            quantidade: quantidade
        });

        valor = valor % nota;
    }

    // Verifica se é possível formar o valor
    if (valor !== 0) {

        resultado.innerHTML =
            '<p class="erro">Valor inválido! Não é possível formar esse valor com as notas disponíveis.</p>';

        return;
    }

    // Retira o dinheiro do saldo
    saldo -= valorOriginal;

    // Atualiza o saldo na tela
    document.getElementById("saldo").textContent =
        `R$ ${saldo.toLocaleString("pt-BR")},00`;

    // Cria o resultado
    let html = `
        <p class="sucesso">
            <strong>
                Saque realizado com sucesso!
            </strong>
        </p>

        <p>
            Valor sacado:
            <strong>
                R$ ${valorOriginal.toLocaleString("pt-BR")},00
            </strong>
        </p>

        <p>
            <strong>Notas entregues:</strong>
        </p>

        <ul>
    `;

    // Mostra as notas
    for (let item of quantidadeNotas) {

        if (item.quantidade > 0) {

            html += `
                <li>
                    ${item.quantidade}
                    nota(s) de R$ ${item.nota},00
                </li>
            `;
        }
    }

    html += `
        </ul>

        <p>
            Saldo restante:
            <strong>
                R$ ${saldo.toLocaleString("pt-BR")},00
            </strong>
        </p>
    `;

    resultado.innerHTML = html;

    // Limpa o campo
    document.getElementById("valor").value = "";
}