document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM totalmente carregado!");


    console.log("scipt carregado")


    // Seleciona a div com id resultadosBusca
    var resultadosBusca = document.getElementById("resultadosBusca");
    console.log("Resuldatos da busca")


    const dadosSalvos = localStorage.getItem("resultadoBusca");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);


        dados.criacoesDesign.forEach((design) => {


            //serviço de criação de design
            var divDesign = document.createElement("div");
            divDesign.classList.add("row", "mb-4", "justify-content-center", "p-3", "border", "rounded");
            resultadosBusca.appendChild(divDesign);

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
            arquivoReferencia.href = design.arquivoReferencia;
            arquivoReferencia.textContent = "Arquivo de referência"
            arquivoReferencia.target = "_blank";
            dadosDesign.appendChild(arquivoReferencia);

        });


        dados.softwares.forEach((software) => {

            var divSoftware = document.createElement("div");
            divSoftware.classList.add("row", "mb-4", "justify-content-center", "p-3", "border", "rounded");
            resultadosBusca.appendChild(divSoftware);

            var textoTitulo = document.createElement("p");
            var strongTitulo = document.createElement("strong");
            strongTitulo.textContent = "Serviço de software";
            textoTitulo.appendChild(strongTitulo);

            divSoftware.appendChild(textoTitulo);

            var divLinhaInterna = document.createElement("div");
            divLinhaInterna.classList.add("row");

            //coluna filha de linha interna para colunas  - dados cliente
            var divDadosCliente = document.createElement("div");
            divDadosCliente.classList.add("col-12", "col-md-4");
            divSoftware.appendChild(divLinhaInterna);


            //conteúdo da coluna de dados do cliente
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


            //cria coluna com dados do serviço
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
            servicosSoftware.textContent = `Serviços: ${software.servicos.join(",")}`;
            divDadosSoftwareService.appendChild(servicosSoftware);

            var detalhesServico = document.createElement("p");
            detalhesServico.textContent = `Detalhes do serviço: ${software.detalhesServico}`;
            divDadosSoftwareService.appendChild(detalhesServico);

            var periodoSoftware = document.createElement("p");
            if (software.domicilio.periodo == null) {
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


        });


        dados.consertos.forEach((conserto) => {

            //serviço de conserto de aparelhos
            var divConserto = document.createElement("div");
            divConserto.classList.add("row", "mb-4", "justify-content-center", "p-3", "border", "rounded");
            resultadosBusca.appendChild(divConserto);

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
            dispositivoConserto.textContent = `Dispositivo: ${conserto.dispositivo}`;
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
            if (conserto.domicilio == null) {
                periodoConserto.textContent = "Não foi solicitada visita técnica"
            } else {
                periodoConserto.textContent = "periodo visita";
            }
            divPeriodoConserto.appendChild(periodoConserto);

            var divDataVisitaConserto = document.createElement("div");
            divDataVisitaConserto.classList.add("col-6");
            divAgendamentoVisita.appendChild(divDataVisitaConserto);

            var dataVisitaConserto = document.createElement("p");
            if (conserto.domicilio.data == null) {
                dataVisitaConserto = "";
            } else {
                dataVisitaConserto.textContent = `Data da visita: ${conserto.domicilio.data}`;
            }
            divDataVisitaConserto.appendChild(dataVisitaConserto);

        });

        dados.impressoes.forEach((impressao) => {

            //serviço de impressão
            var divImpressao = document.createElement("div");
            divImpressao.classList.add("row", "mb-4", "justify-content-center", "p-3", "border", "rounded");
            resultadosBusca.appendChild(divImpressao)

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
            unidadesImpressao.textContent =  `Unidades: ${impressao.unidades}`;
            colUnidadesEMaterial.appendChild(unidadesImpressao);

            var arquivoImpressao = document.createElement("a");
            arquivoImpressao.href = "arquivoImpressao";
            arquivoImpressao.textContent = "arquivo a imprimir";
            arquivoImpressao.target = "_blank";
            divDadosImpressao.appendChild(arquivoImpressao)
        });

    }

});