document.addEventListener("DOMContentLoaded", function () {

    function getAuthHeader() {
        const token = sessionStorage.getItem("token");

        if (!token) {
            alert("Usuário não autenticado! Efetue um novo login.");
            window.location.href = "loginPage.html";
        }

        return {
            Authorization: `Bearer ${token}`
        };
    }

    const todosEmUmStatus = document.getElementById("todosEmUmStatus");
    const statusSelect = document.getElementById("status");

    // ✅ Função para realizar a busca e renderizar os dados
    function fetchAndRenderData(status) {
        // Limpa o conteúdo anterior
        todosEmUmStatus.innerHTML = '';

        fetch(`http://localhost:8080/gestao/findallinatstatus?status=${status}`, {
            method: 'GET',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro na requisição por status");
                return res.json();
            })
            .then(info => {
                sessionStorage.setItem('todosNoStatus', JSON.stringify(info));

                if (Array.isArray(info.consertos)) {
                    info.consertos.forEach(conserto => renderConserto(conserto));
                }

                if (Array.isArray(info.softwares)) {
                    info.softwares.forEach(software => renderSoftware(software));
                }

                if (Array.isArray(info.impressoes)) {
                    info.impressoes.forEach(impressao => renderImpressao(impressao));
                }

                if (Array.isArray(info.criacoesdesign)) {
                    info.criacoesdesign.forEach(design => renderDesign(design));
                }

            })
            .catch(err => {
                alert('Erro ao buscar dados: ' + err.message);
            });
    }

    fetchAndRenderData(statusSelect.value);

    statusSelect.addEventListener("change", function () {
        const novoStatus = statusSelect.value;
        fetchAndRenderData(novoStatus);
    });

    function renderConserto(conserto) {
        const arquivoConserto = conserto.arquivo
            ? `<a href="http://localhost:8080${conserto.arquivo}" target="_blank"><strong>Imagem do defeito</strong></a>`
            : `<span style="color: gray;"><strong>Arquivo não disponível</strong></span>`;

        var novoConserto = `
         <div class="container border border-info rounded mt-2 mb-2">
                <p><strong>Conserto</strong></p>
                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>nome: </strong>${conserto.cliente.nomeCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato: </strong>${conserto.cliente.contatoCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato alternativo: </strong>${conserto.cliente.contatoAlternativo}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>email: </strong>${conserto.cliente.emailCliente}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>solicitação em: </strong> ${conserto.dataSolicitacao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>tempo de uso: </strong>${conserto.tempoDeUso}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>dispositivo: </strong>${conserto.tipoAparelho}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>fabricante: </strong>${conserto.fabricante}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>atualizado em: </strong>${conserto.dataAtualizacao || "sem atualização"}</p>
                    </div>
                    <div class="col-3 text-start">
                        ${arquivoConserto}
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>descrição do defeito: </strong>${conserto.descricaoProblema}</p>

                    </div>
                    <div class="col-3 text-start">
                        <p><strong>visita solicitada: </strong>${conserto.domicilio && conserto.domicilio.data ?
                `${conserto.domicilio.data} de ${conserto.domicilio.periodo}, em ${conserto.domicilio.logradouro}, ${conserto.domicilio.numeroCasa} -
                CEP ${conserto.domicilio.cep}` :
                "não solicitou visitas"
            }</p> 
                    </div>
                </div>
        
        `;

        todosEmUmStatus.insertAdjacentHTML('beforeend', novoConserto);

    }

    function renderSoftware(software) {

        var novoSoftware = `
            <div class="container border border-danger rounded mt-2 mb-2">
                <p><strong>Serviços com software</strong></p>
                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>nome: </strong>${software.cliente.nomeCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato: </strong>${software.cliente.contatoCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato alternativo:</strong>${software.cliente.contatoAlternativo}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>email: </strong>${software.cliente.emailCliente}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>solicitação em: </strong>${software.dataSolicitacao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>tempo de uso: </strong>${software.tempoUso}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>dispositivo: </strong>${software.dispositivo}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>fabricante: </strong>${software.fabricante}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>atualizado em: </strong>${software.dataAtualizacao || "sem atualização"}</p>

                    </div>
                    <div class="col-3 text-start" >
                        <p><strong>detalhes do serviço: </strong>${software.detalhesServico}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>serviços de software: </strong>${software.servicos.join(", ")}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>visita solicitada: </strong>${software.domicilio && software.domicilio.data ?
                `${software.domicilio.data} de ${software.domicilio.periodo}, em ${software.domicilio.logradouro}, ${software.domicilio.numeroCasa} - CEP
                             ${software.domicilio.cep}` :
                "não solicitou visitas"
            }</p>
                    </div>
                </div>
            </div>
        
        `;

        todosEmUmStatus.insertAdjacentHTML('beforeend', novoSoftware);


    }

    function renderImpressao(impressao) {

        const arquivoImpressaoLink = impressao.arquivoImpressao
            ? `<a href="http://localhost:8080${impressao.arquivoImpressao}" target="_blank"><strong>arquivo para impressão</strong></a>`
            : `<span style="color: gray;"><strong>Arquivo não disponível</strong></span>`;

        var novaImpressao = `
            <div class="container border border-warning rounded mt-2 mb-2">
                <p><strong>Impressão</strong></p>
                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>nome: </strong>${impressao.cliente.nomeCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato: </strong>${impressao.cliente.contatoCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato alternativo: </strong>${impressao.cliente.contatoCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>email: </strong>${impressao.cliente.emailCliente}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>solicitação em: </strong> ${impressao.dataSolicitacao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>material: </strong>${impressao.materialImpressao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>produto: </strong>${impressao.produto}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>unidades: </strong>${impressao.unidades}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>atualizado em: </strong>${impressao.dataAtualizacao || "sem atualização"}</p>
                   </div>
                    <div class="col-3 text-start">
                        <p><strong>cores: </strong>${impressao.coresImpressao}</p>
                    </div>                    
                    <div class="col-3 text-start">
                        <p><strong>lados: </strong>${impressao.ladosImpressao}</p>
                    </div>
                    <div class="col-3 text-start">
                        ${arquivoImpressaoLink}
                    </div>
                </div>

            </div>
        `;

        todosEmUmStatus.insertAdjacentHTML('beforeend', novaImpressao);

    }

    function renderDesign(design) {
        const arquivoReferencia = design.arquivoReferencia
            ? `<a href="http://localhost:8080${design.arquivoReferencia}" target="_blank"><strong>arquivo para impressão</strong></a>`
            : `<span style="color: gray;"><strong>Arquivo não disponível</strong></span>`;

        var novoDesign = `
            <div class="container border rounded border-success mt-2 mb-2">
                <p><strong>Criação de design</strong></p>
                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>nome: </strong> ${design.cliente.nomeCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato: </strong>${design.cliente.contatoCliente}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>contato alternativo: </strong>${design.cliente.contatoAlternativo}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>email: </strong>${design.cliente.emailCliente}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>solicitação em: </strong>${design.dataSolicitacao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>material: </strong>${design.materialImpressao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>produto: </strong>${design.produto}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>unidades: </strong>${design.unidades}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-start">
                        <p><strong>atualizado em: </strong>${design.dataAtualizacao || "sem atualização"}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>cores: </strong>${design.coresImpressao}</p>
                    </div>
                    <div class="col-3 text-start">
                        <p><strong>lados impressos: </strong>${design.ladosImpressao}</p>
                    </div>
                    <div class="col-3 text-start">
                        ${arquivoReferencia}

                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-start">
                        <p><strong>Ideias para o design: </strong>${design.ideiasDesign}</p>
                    </div>
                </div>
            </div>        
        `;

        todosEmUmStatus.insertAdjacentHTML('beforeend', novoDesign);


    }
});

function renderizarConserto(conserto) {
    const novoConserto = `
        <div id="${conserto.tipoEntidade}-card-${conserto.id}" class="row mb-2 justify-content-center p-3 border rounded border-info">
            <p><strong>Serviço de conserto</strong></p>
            
            <div class="row">
                <!-- Dados do Cliente -->
                <div class="col-12 col-md-4">
                    <p>Nome: ${conserto.cliente.nomeCliente}</p>
                    <p>Email: ${conserto.cliente.emailCliente}</p>
                    <p>Solicitado em: ${conserto.dataSolicitacao}</p>
                    <p>Status: ${conserto.status}</p>
                </div>

                <!-- Dados do Serviço -->
                <div class="col-12 col-md-8">
                    <div class="row">
                        <div class="col-6">
                            <p>Dispositivo: ${conserto.tipoAparelho}</p>
                        </div>
                        <div class="col-6">
                            <p>Fabricante: ${conserto.fabricante}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <a href="http://localhost:8080${conserto.arquivo}" target="_blank">Imagem do defeito</a>
                        </div>
                        <div class="col-6">
                            <p>Tempo de uso: ${conserto.tempoDeUso}</p>
                        </div>
                    </div>
                    <p>Detalhes do defeito: ${conserto.descricaoProblema}</p>

                    <div class="row">
                        <div class="col-6">
                            <p>Período da visita: ${conserto.domicilio?.periodo || "Não foi solicitada visita técnica"}</p>
                        </div>
                        <div class="col-6">
                            <p>Data da visita: ${conserto.domicilio?.data || "Data da visita não informada"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Seletor de Status e Botão de Atualização -->
            <div class="d-flex justify-content-end mt-0 w-100">
                <div class="form-floating mb-3">
                    <select class="form-select w-auto me-2" id="statusSelect-${conserto.id}" aria-label="Status">
                        ${["novo", "cliente contatado", "em espera", "pedido confirmado", "processando", "aguarda retirada", "entrega solicitada", "finalizado", "cancelado"]
            .map(status => `<option value="${status}" ${conserto.status === status ? "selected disabled" : ""}>${status}</option>`)
            .join('')}
                    </select>
                    <label for="statusSelect-${conserto.id}">Status</label>
                </div>
                <button class="btn btn-primary align-self-start" onclick="atualizarStatus('${conserto.tipoEntidade.toLowerCase()}', ${conserto.id})">
                    Atualizar
                </button>
            </div>
        </div>
    `;

    respostaParaStatusConserto.insertAdjacentHTML('beforeend', novoConserto);
}

function renderizarResultadosDesigns(design) {
    const respostaParaStatusDesign = document.getElementById("respostaParaStatusDesign");
    const currentStatus = design.status.trim().toLowerCase();


    const novoDesign = `
        <div id="${design.tipoEntidade}-card-${design.id}" class="row mb-2 justify-content-center p-3 border rounded">
            <p><strong>Criação de design</strong></p>
            <div class="row">
                <div class="col-12 col-md-4">
                    <p>Nome: ${design.cliente.nomeCliente}</p>
                    <p>Email: ${design.cliente.emailCliente}</p>
                    <p>Solicitado em: ${design.dataSolicitacao}</p>
                    <p>Status: ${design.status}</p>
                </div>
                <div class="col-12 col-md-8">
                    <p>Produto: ${design.produto}</p>
                    <div class="row">
                        <div class="col-6">
                            <p>Cores: ${design.coresImpressao}</p>
                            <p>Lados: ${design.ladosImpressao}</p>
                        </div>
                        <div class="col-6">
                            <p>Material: ${design.materialImpressao}</p>
                            <p>Unidades: ${design.unidades}</p>
                        </div>
                    </div>
                    <p>Ideias: ${design.ideiasDesign}</p>
                    <a href="http://localhost:8080${design.arquivoReferencia}" target="_blank">Arquivo de referência</a>
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-1 w-100">
                <div class="form-floating me-2">
<select class="form-select w-auto me-2" id="statusSelect-${design.id}" aria-label="Status">
  <option selected value="${design.status}" disabled>${design.status}</option>
  ${
    ["novo", "cliente contatado", "em espera", "pedido confirmado", "processando", "aguarda retirada", "entrega solicitada", "finalizado", "cancelado"]
      .filter(status => status.toLowerCase() !== currentStatus)
      .map(status => `<option value="${status}">${status}</option>`)
      .join('')
  }
</select>
                    <label for="statusSelect-${design.id}">Status</label>
                </div>
                <button class="btn btn-primary align-self-center" onclick="atualizarStatus('${design.tipoEntidade.toLowerCase()}', ${design.id})">
                    Atualizar
                </button>
            </div>
        </div>
    `;

    respostaParaStatusDesign.insertAdjacentHTML('beforeend', novoDesign);
}



function atualizarStatus(tipoEntidade, id) {
    const selectStatus = document.getElementById(`statusSelect-${id}`);
    const novoStatus = selectStatus.value;

    fetch(`http://localhost:8080/gestao/changestatus/${tipoEntidade}/${id}`, {
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
                const card = document.getElementById(`${tipoEntidade}-card-${id}`);
                if (card) {
                    card.remove();
                }
            } else {
                alert("Erro ao atualizar o status.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro na requisição.");
        });
}

document.getElementById("buscarPorConserto").addEventListener("click", async () => {
    const status = document.getElementById("statusConserto").value;
    const mes = document.getElementById("statusMesConserto").value;
    const ano = document.getElementById("anoConserto").value;

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

        // Salva os dados no sessionStorage
        sessionStorage.setItem("resultadoBusca", JSON.stringify(resultado));

        // Limpa os resultados anteriores
        const respostaParaStatusConserto = document.getElementById("respostaParaStatusConserto");
        respostaParaStatusConserto.innerHTML = "";

        // Renderiza cada objeto de conserto encontrado
        resultado.forEach(conserto => renderizarConserto(conserto));

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }
});

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

        // Salva os dados no sessionStorage
        sessionStorage.setItem("resultadoBusca", JSON.stringify(resultado));

        // Limpa os resultados anteriores
        const respostaParaStatusDesign = document.getElementById("respostaParaStatusDesign");
        respostaParaStatusDesign.innerHTML = "";

        // Renderiza os resultados
        resultado.forEach(design => renderizarResultadosDesigns(design));

    } catch (error) {
        alert("Erro: " + error.message);
        console.error(error);
    }
});


