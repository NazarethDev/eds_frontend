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


function renderizarResultadosConserto(dadosConsertos) {
    const respostaParaStatusConserto = document.getElementById("respostaParaStatusConserto");

    if (Array.isArray(dadosConsertos)) {
        dadosConsertos.forEach((conserto) => {
            //serviço de conserto de aparelhos
            var divConserto = document.createElement("div");
            divConserto.classList.add("row", "mb-2", "justify-content-center", "p-3", "border", "rounded", "border-orange-500");
            respostaParaStatusConserto.appendChild(divConserto);

            var tituloConserto = document.createElement("p");
            divConserto.appendChild(tituloConserto);

            var strongConserto = document.createElement("strong");
            strongConserto.textContent = "Serviço de conserto";
            tituloConserto.appendChild(strongConserto);

            var linhaInternaConserto = document.createElement("div");
            linhaInternaConserto.classList.add("row");
            divConserto.appendChild(linhaInternaConserto)


            //dados do cliente
            var divClienteConserto = document.createElement("div");
            divClienteConserto.classList.add("col-12", "col-md-4");
            linhaInternaConserto.appendChild(divClienteConserto);

            var nomeClienteConserto = document.createElement("p");
            nomeClienteConserto.textContent = `Nome: ${conserto.cliente.nomeCliente}`;
            divClienteConserto.appendChild(nomeClienteConserto);

            var emailClienteConserto = document.createElement("p");
            emailClienteConserto.textContent = `Email: ${conserto.cliente.emailCliente}`;
            divClienteConserto.appendChild(emailClienteConserto);

            var dataSolicitacaoConserto = document.createElement("p");
            dataSolicitacaoConserto.textContent = `Solicitado em: ${conserto.dataSolicitacao}`;
            divClienteConserto.appendChild(dataSolicitacaoConserto);

            var statusConserto = document.createElement("p");
            statusConserto.textContent = `Status: ${conserto.status}`;
            divClienteConserto.appendChild(statusConserto);


            //dados do serviço
            var dadosConserto = document.createElement("div");
            dadosConserto.classList.add("col-12", "col-md-8");
            linhaInternaConserto.appendChild(dadosConserto);

            var divFabricanteEDispositivo = document.createElement("div");
            divFabricanteEDispositivo.classList.add("row");
            dadosConserto.appendChild(divFabricanteEDispositivo);

            var divDispositivoConserto = document.createElement("div");
            divDispositivoConserto.classList.add("col-6");
            divFabricanteEDispositivo.appendChild(divDispositivoConserto);

            var dispositivoConserto = document.createElement("p");
            dispositivoConserto.textContent = `Dispositivo: ${conserto.tipoAparelho}`;
            divDispositivoConserto.appendChild(dispositivoConserto);

            var divFabricanteConserto = document.createElement("div");
            divFabricanteConserto.classList.add("col-6");
            divFabricanteEDispositivo.appendChild(divFabricanteConserto);

            var fabricanteConserto = document.createElement("p");
            fabricanteConserto.textContent = `Fabricante: ${conserto.fabricante}`;
            divFabricanteConserto.appendChild(fabricanteConserto);

            var divLinhaImagemETempoUso = document.createElement("div");
            divLinhaImagemETempoUso.classList.add("row");
            dadosConserto.appendChild(divLinhaImagemETempoUso);

            var divImagemConserto = document.createElement("div");
            divImagemConserto.classList.add("col-6");
            divLinhaImagemETempoUso.appendChild(divImagemConserto);

            var linkImagemConserto = document.createElement("a");
            linkImagemConserto.href = conserto.arquivo;
            linkImagemConserto.textContent = "Imagem do defeito";
            linkImagemConserto.target = "_blank";
            divImagemConserto.appendChild(linkImagemConserto);

            var divTempoUsoConserto = document.createElement("div");
            divTempoUsoConserto.classList.add("col-6");
            divLinhaImagemETempoUso.appendChild(divTempoUsoConserto);

            var tempoUsoConserto = document.createElement("p");
            tempoUsoConserto.textContent = `Tempo de uso: ${conserto.tempoDeUso}`;
            divTempoUsoConserto.appendChild(tempoUsoConserto);

            var detalhesServicoConserto = document.createElement("p");
            detalhesServicoConserto.textContent = `Detalhes do defeito: ${conserto.descricaoProblema}`;
            dadosConserto.appendChild(detalhesServicoConserto);

            var divAgendamentoVisita = document.createElement("div");
            divAgendamentoVisita.classList.add("row");
            dadosConserto.appendChild(divAgendamentoVisita);

            var divPeriodoConserto = document.createElement("div");
            divPeriodoConserto.classList.add("col-6");
            divAgendamentoVisita.appendChild(divPeriodoConserto);

            var periodoConserto = document.createElement("p");
            if (conserto.data == null) {
                periodoConserto.textContent = "Não foi solicitada visita técnica"
            } else {
                periodoConserto.textContent = `Periodo da visita: ${conserto.domicilio.periodo}`;
            }
            divPeriodoConserto.appendChild(periodoConserto);

            var divDataVisitaConserto = document.createElement("div");
            divDataVisitaConserto.classList.add("col-6");
            divAgendamentoVisita.appendChild(divDataVisitaConserto);

            var dataVisitaConserto = document.createElement("p");

            if (!conserto.domicilio || !conserto.domicilio.data) {
                dataVisitaConserto.textContent = "Data da visita não informada";
            } else {
                dataVisitaConserto.textContent = `Data da visita: ${conserto.domicilio.data}`;
            }

            divDataVisitaConserto.appendChild(dataVisitaConserto);

            var divBotoes = document.createElement("div");
            divBotoes.classList.add("d-flex", "justify-content-end", "mt-0", "w-100");

            // DIV para o form-floating
            var divSelectWrapper = document.createElement("div");
            divSelectWrapper.classList.add("form-floating", "mb-3"); // Adiciona o estilo do form-floating

            // SELECT de status
            var selectStatus = document.createElement("select");
            selectStatus.classList.add("form-select", "w-auto", "me-2");
            selectStatus.id = "statusSelect"; // ID para referenciar no label
            selectStatus.setAttribute("aria-label", "Status");

            // Adiciona as opções de status
            ["novo", "cliente contatado", "em espera", "pedido confirmado", "processando", "aguarda retirada", "entrega solicitada", "finalizado", "cancelado"].forEach(status => {
                var option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                selectStatus.appendChild(option);
            });

            // LABEL para o select
            var labelStatus = document.createElement("label");
            labelStatus.setAttribute("for", "statusSelect");
            labelStatus.textContent = "Status";

            // Adiciona o select e a label à div wrapper
            divSelectWrapper.appendChild(selectStatus);
            divSelectWrapper.appendChild(labelStatus);

            // BOTÃO de atualização
            var btnAtualizar = document.createElement("button");
            btnAtualizar.classList.add("btn", "btn-primary", "align-self-start");
            btnAtualizar.textContent = "Atualizar";

            // Evento do botão
            btnAtualizar.addEventListener("click", function () {
                const novoStatus = selectStatus.value;
                const tipoEntidade = conserto.tipoEntidade.toLowerCase(); // Ex: "software", "conserto"... 

                fetch(`http://localhost:8080/gestao/changestatus/${tipoEntidade}/${conserto.id}`, {
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

            // Adiciona a div de select e o botão na divBotoes
            divBotoes.appendChild(divSelectWrapper);
            divBotoes.appendChild(btnAtualizar);

            // Adiciona a divBotoes ao final da divResposta
            divConserto.appendChild(divBotoes);
        })
    }
}


document.getElementById("buscarPorConserto").addEventListener("click", async () => {
    const status = document.getElementById("statusConserto").value;
    const mes = document.getElementById("statusMesConserto").value;
    const ano = document.getElementById("anoConserto").value;

    const token = sessionStorage.getItem("token"); // recupera o token salvo

    if (!token) {
        alert("Usuário não autenticado!");
        return;
    }

    try {
        const url = `http://localhost:8080/gestao/findbyrepairstatus?status=${encodeURIComponent(status)}&mes=${encodeURIComponent(mes)}&ano=${encodeURIComponent(ano)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: getAuthHeader()
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados: " + response.status);
        }

        const resultado = await response.json();
        console.log("Dados recebidos:", resultado);


        // Salva os dados no localStorage
        sessionStorage.setItem("resultadoBusca", JSON.stringify(resultado));

        // Limpa os resultados anteriores
        const respostaParaStatusConserto = document.getElementById("respostaParaStatusConserto");
        respostaParaStatusConserto.innerHTML = "";

        // Executa o script de renderização novamente
        renderizarResultadosConserto(resultado);

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }


})