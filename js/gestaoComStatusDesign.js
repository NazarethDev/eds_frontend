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

function renderizarResultadosDesigns(dadosDesign) {
    const respostaParaStatusDesign = document.getElementById("respostaParaStatusDesign");

    if (Array.isArray(dadosDesign)) {
        dadosDesign.forEach((design) => {
            
            var divDesign = document.createElement("div");
            divDesign.classList.add("row", "mb-2", "justify-content-center", "p-3", "border", "rounded");
            respostaParaStatusDesign.appendChild(divDesign);

            var tituloDesign = document.createElement("p");
            divDesign.appendChild(tituloDesign);

            var strongDesign = document.createElement("strong");
            strongDesign.textContent = "Criação de design";
            tituloDesign.appendChild(strongDesign);

            var linhaInternaDesign = document.createElement("div");
            linhaInternaDesign.classList.add("row")
            divDesign.appendChild(linhaInternaDesign);

            var divClienteDesign = document.createElement("div");
            divClienteDesign.classList.add("col-12", "col-md-4");
            linhaInternaDesign.appendChild(divClienteDesign);

            var nomeClienteDesign = document.createElement("p");
            nomeClienteDesign.textContent = `Nome: ${design.cliente.nomeCliente}`
            divClienteDesign.appendChild(nomeClienteDesign);

            var emailClienteDesign = document.createElement("p");
            emailClienteDesign.textContent = `Email: ${design.cliente.emailCliente}`;
            divClienteDesign.appendChild(emailClienteDesign);

            var dataSolicitacaoDesign = document.createElement("p");
            dataSolicitacaoDesign.textContent = `Solicitado em: ${design.dataSolicitacao}`;
            divClienteDesign.appendChild(dataSolicitacaoDesign);

            var statusDesign = document.createElement("p");
            statusDesign.textContent = `Status: ${design.status}`;
            divClienteDesign.appendChild(statusDesign);



            //detalhes do serviço de design
            var dadosDesign = document.createElement("div");
            dadosDesign.classList.add("col-12", "col-md-8")
            linhaInternaDesign.appendChild(dadosDesign)

            var produtoDesign = document.createElement("p");
            produtoDesign.textContent = `Produto: ${design.produto}`;
            dadosDesign.appendChild(produtoDesign);

            var designCorLadoMaterialUnidades = document.createElement("div");
            designCorLadoMaterialUnidades.classList.add("row");
            dadosDesign.appendChild(designCorLadoMaterialUnidades);

            var corELado = document.createElement("div");
            corELado.classList.add("col-6");
            designCorLadoMaterialUnidades.appendChild(corELado);

            var corDesign = document.createElement("p");
            corDesign.textContent = `Cores: ${design.coresImpressao}`;
            corELado.appendChild(corDesign);


            var ladosDesign = document.createElement("p");
            ladosDesign.textContent = `Lados: ${design.ladosImpressao}`;
            corELado.appendChild(ladosDesign);


            var unidadesMaterialDesign = document.createElement("div");
            unidadesMaterialDesign.classList.add("col-6");
            designCorLadoMaterialUnidades.appendChild(unidadesMaterialDesign)

            var materialDesign = document.createElement("p");
            materialDesign.textContent = `Material: ${design.materialImpressao}`;
            unidadesMaterialDesign.appendChild(materialDesign);

            var unidadesDesign = document.createElement("p");
            unidadesDesign.textContent = `Unidades: ${design.unidades}`;
            unidadesMaterialDesign.appendChild(unidadesDesign);

            var ideiasDesign = document.createElement("p");
            ideiasDesign.textContent = `Ideias: ${design.ideiasDesign}`;
            dadosDesign.appendChild(ideiasDesign);

            var arquivoReferencia = document.createElement("a");
            arquivoReferencia.href = "http://localhost:8080" + design.arquivoReferencia;
            arquivoReferencia.textContent = "Arquivo de referência"
            arquivoReferencia.target = "_blank";
            dadosDesign.appendChild(arquivoReferencia);

            var divFloatingSelect = document.createElement("div");
            divFloatingSelect.classList.add("form-floating", "me-2");

            var selectStatus = document.createElement("select");
            selectStatus.classList.add("form-select");
            selectStatus.id = `floatingSelect-${design.id}`;
            selectStatus.setAttribute("aria-label", "Floating label select example");

            ["novo", "cliente contatado", "em espera", "pedido confirmado", "processando", "aguarda retirada", "entrega solicitada", "finalizado", "cancelado"].forEach(status => {
                var option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                selectStatus.appendChild(option);
            });

            var labelSelect = document.createElement("label");
            labelSelect.setAttribute("for", selectStatus.id);
            labelSelect.textContent = "Status";

            divFloatingSelect.appendChild(selectStatus);
            divFloatingSelect.appendChild(labelSelect);

            var btnAtualizar = document.createElement("button");
            btnAtualizar.classList.add("btn", "btn-primary", "align-self-center");
            btnAtualizar.textContent = "Atualizar";

            btnAtualizar.addEventListener("click", function () {
                const novoStatus = selectStatus.value;
                const tipoEntidade = design.tipoEntidade.toLowerCase();

                fetch(`http://localhost:8080/gestao/changestatus/${tipoEntidade}/${design.id}`, {
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

            var divBotoes = document.createElement("div");
            divBotoes.classList.add("d-flex", "justify-content-end", "align-items-center", "mt-1", "w-100");

            divBotoes.appendChild(divFloatingSelect);
            divBotoes.appendChild(btnAtualizar);
            divDesign.appendChild(divBotoes);


        });
    }
}

document.getElementById("buscarPorDesign").addEventListener("click", async () => {
    const status = document.getElementById("statusDesign").value;
    const mes = document.getElementById("mesStatusDesign").value;
    const ano = document.getElementById("anoDesign").value;

    try {
        const url = `http://localhost:8080/gestao/findbydesignstatus?status=${encodeURIComponent(status)}&mes=${encodeURIComponent(mes)}&ano=${encodeURIComponent(ano)}`;

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
        const respostaParaStatusDesign = document.getElementById("respostaParaStatusDesign");
        respostaParaStatusDesign.innerHTML = "";

        // Executa o script de renderização novamente
        renderizarResultadosDesigns(resultado);

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }


})