function getAuthHeader() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado!");
        throw new Error("Token ausente. Usuário não autenticado.");
    }

    return {
        Authorization: `Bearer ${token}`
    };
}

function renderizarResultadoSoftware(dados) {
    const respostaParaStatusSoftware = document.getElementById("respostaParaStatusSoftware");

    if (Array.isArray(dados)) {
        dados.forEach((software) => {
            var divSoftware = document.createElement("div");
            divSoftware.classList.add("row", "mb-2", "justify-content-center", "p-3", "border", "rounded");
            respostaParaStatusSoftware.appendChild(divSoftware);

            var textoTitulo = document.createElement("p");
            var strongTitulo = document.createElement("strong");
            strongTitulo.textContent = "Serviço de software";
            textoTitulo.appendChild(strongTitulo);

            divSoftware.appendChild(textoTitulo);

            var divLinhaInterna = document.createElement("div");
            divLinhaInterna.classList.add("row");

            var divDadosCliente = document.createElement("div");
            divDadosCliente.classList.add("col-12", "col-md-4");
            divSoftware.appendChild(divLinhaInterna);

            var nomeCliente = document.createElement("p");
            nomeCliente.textContent = `Nome: ${software.cliente.nomeCliente}`;

            var emailCliente = document.createElement("p");
            emailCliente.textContent = `Email: ${software.cliente.emailCliente}`;
            var dataSolicitacaoSoftware = document.createElement("p");
            dataSolicitacaoSoftware.textContent = `Solicitado em: ${software.dataSolicitacao}`;
            var statusSoftware = document.createElement("p");
            statusSoftware.textContent = `Status: ${software.status}`;

            divDadosCliente.append(nomeCliente, emailCliente, dataSolicitacaoSoftware, statusSoftware);

            divLinhaInterna.appendChild(divDadosCliente);

            var divDadosSoftwareService = document.createElement("div");
            divDadosSoftwareService.classList.add("col-12", "col-md-8");
            divLinhaInterna.appendChild(divDadosSoftwareService);

            var divLinhaDispositivoETempoUso = document.createElement("div");
            divLinhaDispositivoETempoUso.classList.add("row");
            divDadosSoftwareService.appendChild(divLinhaDispositivoETempoUso)

            var divDispositivoSoftware = document.createElement("div");
            divDispositivoSoftware.classList.add("col-6");
            divLinhaDispositivoETempoUso.appendChild(divDispositivoSoftware);

            var dispositivoSoftware = document.createElement("p");
            dispositivoSoftware.textContent = `Dispositivo: ${software.dispositivo}`;
            divDispositivoSoftware.appendChild(dispositivoSoftware);

            var divTempoUsoSoftware = document.createElement("div");
            divTempoUsoSoftware.classList.add("col-6");
            divLinhaDispositivoETempoUso.appendChild(divTempoUsoSoftware);

            var tempoUsoSoftware = document.createElement("p");
            tempoUsoSoftware.textContent = `Tempo de uso: ${software.tempoUso}`;
            divTempoUsoSoftware.appendChild(tempoUsoSoftware);

            var servicosSoftware = document.createElement("p");
            servicosSoftware.textContent = `Serviços: ${software.servicos.join(", ")}`;
            divDadosSoftwareService.appendChild(servicosSoftware);

            var detalhesServico = document.createElement("p");
            detalhesServico.textContent = `Detalhes do serviço: ${software.detalhesServico}`;
            divDadosSoftwareService.appendChild(detalhesServico);

            var periodoSoftware = document.createElement("p");
            if (software.domicilio.data == null) {
                periodoSoftware.textContent = "Não foi solicitada visita técnica"
            } else {
                periodoSoftware.textContent = `Período da visita: ${software.domicilio.periodo}`
            }
            divDadosSoftwareService.appendChild(periodoSoftware);

            var dataSoftware = document.createElement("p");
            if (software.domicilio.data == null) {
                dataSoftware.textContent = "";
            } else {
                dataSoftware.textContent = `Data da visita: ${software.domicilio.data}`;
            }

            divDadosSoftwareService.appendChild(dataSoftware);

           // Cria a div que conterá o form-floating (select + label)
var divFloatingSelect = document.createElement("div");
divFloatingSelect.classList.add("form-floating", "me-2");

// SELECT de status
var selectStatus = document.createElement("select");
selectStatus.classList.add("form-select");
selectStatus.id = `floatingSelect-${software.id}`; // ID único por item
selectStatus.setAttribute("aria-label", "Floating label select example");

["novo", "cliente contatado", "em espera", "pedido confirmado", "processando", "aguarda retirada", "entrega solicitada", "finalizado", "cancelado"].forEach(status => {
    var option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    selectStatus.appendChild(option);
});

// LABEL para o select
var labelSelect = document.createElement("label");
labelSelect.setAttribute("for", selectStatus.id);
labelSelect.textContent = "Status";

// Adiciona o select e label na div form-floating
divFloatingSelect.appendChild(selectStatus);
divFloatingSelect.appendChild(labelSelect);

// BOTÃO de atualização
var btnAtualizar = document.createElement("button");
btnAtualizar.classList.add("btn", "btn-primary", "align-self-center");
btnAtualizar.textContent = "Atualizar";

// Evento do botão
btnAtualizar.addEventListener("click", function () {
    const novoStatus = selectStatus.value;
    const tipoEntidade = software.tipoEntidade.toLowerCase();

    fetch(`http://localhost:8080/gestao/changestatus/${tipoEntidade}/${software.id}`, {
        method: "PUT",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: novoStatus })
    })
        .then(response => {
            if (response.ok) {
                alert("Status atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar o status.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro na requisição.");
        });
});

// Cria a div de botões (linha flexível)
var divBotoes = document.createElement("div");
divBotoes.classList.add("d-flex", "justify-content-end", "align-items-center", "mt-1", "w-100");

// Adiciona o select e o botão à div
divBotoes.appendChild(divFloatingSelect);
divBotoes.appendChild(btnAtualizar);

// Adiciona a divBotoes ao final do divSoftware
divSoftware.appendChild(divBotoes);


        });
    }
}

document.getElementById("buscarPorSoftware").addEventListener("click", async () => {
    const status = document.getElementById("statusSoftwareServico").value;
    const mes = document.getElementById("mesStatusSoftwareServico").value;
    const ano = document.getElementById("anoSoftware").value;

    try {
        const url = `http://localhost:8080/gestao/findbysoftwarestatus?status=${encodeURIComponent(status)}&mes=${encodeURIComponent(mes)}&ano=${encodeURIComponent(ano)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: getAuthHeader()
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados: " + response.status);
        }

        const resultado = await response.json();
        console.log("Dados recebidos:", resultado); // ADICIONE ESTA LINHA


        // Salva os dados no localStorage
        sessionStorage.setItem("resultadoBusca", JSON.stringify(resultado));

        // Limpa os resultados anteriores
        const respostaParaStatusSoftware = document.getElementById("respostaParaStatusSoftware");
        respostaParaStatusSoftware.innerHTML = "";

        // Executa o script de renderização novamente
        renderizarResultadoSoftware(resultado);

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }


})