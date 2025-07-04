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

function renderizarResultadosImpressao(dadosImpressao) {
    const dadosDaImpressao = document.getElementById("respostaParaStatusImpressao");

    if (Array.isArray(dadosImpressao)) {
        dadosImpressao.forEach((impressao) => {


            //serviço de impressão
            var divImpressao = document.createElement("div");
            divImpressao.classList.add("row", "mb-2", "justify-content-center", "p-3", "border", "rounded");
            dadosDaImpressao.appendChild(divImpressao)

            var tituloImpressao = document.createElement("p");
            divImpressao.appendChild(tituloImpressao);

            var strongImpressao = document.createElement("strong");
            strongImpressao.textContent = "Serviço de impressão";
            tituloImpressao.appendChild(strongImpressao);

            var linhaInternaImpressao = document.createElement("div");
            linhaInternaImpressao.classList.add("row");
            divImpressao.appendChild(linhaInternaImpressao);

            var divDadosClienteImpressao = document.createElement("div");
            divDadosClienteImpressao.classList.add("col-12", "col-md-4");
            linhaInternaImpressao.appendChild(divDadosClienteImpressao);

            var nomeClienteImpressao = document.createElement("p");
            nomeClienteImpressao.textContent = `Nome: ${impressao.cliente.nomeCliente}`;
            divDadosClienteImpressao.appendChild(nomeClienteImpressao)

            var emailClienteImpressao = document.createElement("p");
            emailClienteImpressao.textContent = `Email: ${impressao.cliente.emailCliente}`;
            divDadosClienteImpressao.appendChild(emailClienteImpressao);

            var dataSolicitacaoImpressao = document.createElement("p");
            dataSolicitacaoImpressao.textContent = `Solicitado em: ${impressao.dataSolicitacao}`;
            divDadosClienteImpressao.appendChild(dataSolicitacaoImpressao);

            var statusImpressao = document.createElement("p");
            statusImpressao.textContent = `Status: ${impressao.status}`;
            divDadosClienteImpressao.appendChild(statusImpressao);


            //dados impressao
            var divDadosImpressao = document.createElement("div");
            divDadosImpressao.classList.add("col-12", "col-md-8");
            linhaInternaImpressao.appendChild(divDadosImpressao);

            var produtoImpressao = document.createElement("p");
            produtoImpressao.textContent = `Produto: ${impressao.produto}`;
            divDadosImpressao.appendChild(produtoImpressao);

            var divCorLadoUnidadeMaterial = document.createElement("div");
            divCorLadoUnidadeMaterial.classList.add("row");
            divDadosImpressao.appendChild(divCorLadoUnidadeMaterial);

            var colCorELados = document.createElement("div");
            colCorELados.classList.add("col-6");
            divCorLadoUnidadeMaterial.appendChild(colCorELados);

            var corImpressao = document.createElement("p");
            corImpressao.textContent = `Cores: ${impressao.coresImpressao}`;
            colCorELados.appendChild(corImpressao);

            var ladosImpressao = document.createElement("p");
            ladosImpressao.textContent = `Lados: ${impressao.ladosImpressao}`;
            colCorELados.appendChild(ladosImpressao);

            var colUnidadesEMaterial = document.createElement("div");
            colUnidadesEMaterial.classList.add("col-6");
            divCorLadoUnidadeMaterial.appendChild(colUnidadesEMaterial);

            var materialImpressao = document.createElement("p");
            materialImpressao.textContent = `Material: ${impressao.materialImpressao}`;
            colUnidadesEMaterial.appendChild(materialImpressao);

            var unidadesImpressao = document.createElement("p");
            unidadesImpressao.textContent = `Unidades: ${impressao.unidades}`;
            colUnidadesEMaterial.appendChild(unidadesImpressao);

            var arquivoImpressao = document.createElement("a");
            // Define o link recebido pela API (relativo ao backend)
            arquivoImpressao.href = "http://localhost:8080" + impressao.arquivoImpressao;
            arquivoImpressao.textContent = "arquivo a imprimir";
            arquivoImpressao.target = "_blank";
            divDadosImpressao.appendChild(arquivoImpressao)

            // Cria a div que conterá o form-floating (select + label)
            var divFloatingSelect = document.createElement("div");
            divFloatingSelect.classList.add("form-floating", "me-2");

            // SELECT de status
            var selectStatus = document.createElement("select");
            selectStatus.classList.add("form-select");
            selectStatus.id = `floatingSelect-${dadosImpressao.id}`; // ID único por item
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
                const tipoEntidade = impressao.tipoEntidade.toLowerCase();

                fetch(`http://localhost:8080/gestao/changestatus/${tipoEntidade}/${impressao.id}`, {
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
            divBotoes.classList.add("d-flex", "justify-content-end", "align-items-center", "mt-0", "w-100");

            // Adiciona o select e o botão à div
            divBotoes.appendChild(divFloatingSelect);
            divBotoes.appendChild(btnAtualizar);

            // Adiciona a divBotoes ao final do divImpressao
            divImpressao.appendChild(divBotoes);


        });
    }
}

document.getElementById("buscarPorImpressao").addEventListener("click", async () => {
    const status = document.getElementById("statusImpressao").value;
    const mes = document.getElementById("mesStatusImpressao").value;
    const ano = document.getElementById("anoImpressao").value;

    try {
        const url = `http://localhost:8080/gestao/findbyprintstatus?status=${encodeURIComponent(status)}&mes=${encodeURIComponent(mes)}&ano=${encodeURIComponent(ano)}`;


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
        const respostaParaStatusImpressao = document.getElementById("respostaParaStatusImpressao");
        respostaParaStatusImpressao.innerHTML = "";

        // Executa o script de renderização novamente
        renderizarResultadosImpressao(resultado);

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }


})