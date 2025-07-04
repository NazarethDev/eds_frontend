document.addEventListener("DOMContentLoaded", function () {
    // Seleciona a div com id resultadosBusca
    var resultadosBusca = document.getElementById("resultadosBusca");
    console.log("Resuldatos da busca");

    const dadosSalvos = sessionStorage.getItem("resultadoBusca");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        // Verifica se a div "semResultados" já existe e remove ela se necessário
        if (document.getElementById("semResultados")) {
            document.getElementById("semResultados").remove();
        }

        let encontrouResultado = false;

        if (Array.isArray(dados.softwares)) {
            dados.softwares.forEach((software) => {

                if (software.status && software.status.toLowerCase() === "cancelado") {
                    return; // não renderiza esse item
                }

                encontrouResultado = true;

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

                if (software.dataAtualizacao != null) {
                    var dataAtualizacao = document.createElement("p");
                    dataAtualizacao.textContent = `Atualizado em: ${software.dataAtualizacao}`;
                    divDadosCliente.appendChild(dataAtualizacao);

                }

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


                //cria div dos botões
                var divBotoesSoftware = document.createElement("div");
                divBotoesSoftware.classList.add("row", "justify-content-end", "mt-0", "w-100");
                divSoftware.appendChild(divBotoesSoftware);

                //cria botão para atualizar o pedido
                var botaoAtualizarSoftware = document.createElement("button");
                botaoAtualizarSoftware.classList.add("btn", "btn-outline-warning", "col-3", "text-center", "g-5", "me-3");
                botaoAtualizarSoftware.textContent = "Atualizar";
                divBotoesSoftware.appendChild(botaoAtualizarSoftware);

                //evento do botão atualizar
                botaoAtualizarSoftware.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlSoftware = `
                           <div class="modal fade" id="modalAtualizar" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true">
                               <div class="modal-dialog modal-dialog-centered">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                       </div>
                                       <div class="modal-body">
   
                                           <p>Para atualizar o serviço de software solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                           
                                           <form>
                                               <div class="form-floating mb-2" name="contatoInformadoSoftware">
                                                   <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoSoftware"  placeholder=" " required>
                                                   <label for="contatoInformadoSoftware">Contato informado</label>
                                               </div>
                                           </form>
   
                                       </div>
                                       <div class="modal-footer">
                                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                          <button type="button" class="btn btn-primary" id="confirmarAtualizacaoSoftware" data-id="${software.id}" data-contato="${software.cliente.contatoCliente}" >Atualizar</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlSoftware);

                    // Inicializa o modal com Bootstrap
                    var modalAtualizarSoftware = new bootstrap.Modal(document.getElementById('modalAtualizar'));
                    modalAtualizarSoftware.show();

                    // Lógica quando clicar em "Confirmar"
                    document.getElementById("confirmarAtualizacaoSoftware").addEventListener("click", function () {
                        // Pegando o ID diretamente do botão no modal
                        const idSoftware = parseInt(event.currentTarget.dataset.id);
                        const contatoSoftware = event.currentTarget.dataset.contato;
                        console.log("ID capturado para atualização:", idSoftware);

                        const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                        const softwareAtualizacao = dadosSalvos.softwares.find(soft => parseInt(soft.id) === idSoftware);

                        if (softwareAtualizacao) {
                            console.log("Software encontrado para atualização:", softwareAtualizacao);

                            if (document.getElementById("contatoInformadoSoftware").value === contatoSoftware) {
                                sessionStorage.setItem("softwareAtualizacao", JSON.stringify(softwareAtualizacao));
                                window.location.href = "atualizacaoSoftware.html";
                            } else {
                                alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                            }
                        } else {
                            console.error("Software não encontrado para o ID:", idSoftware);
                            alert("Não foi possível encontrar o software para atualização. Tente novamente.");
                        }
                    });

                });

                //cria botão para cancelar o pedido
                var botaoCancelarSoftware = document.createElement("button");
                botaoCancelarSoftware.classList.add("btn", "btn-outline-danger", "col-3", "text-center", "g-5");
                botaoCancelarSoftware.textContent = "Cancelar";
                divBotoesSoftware.appendChild(botaoCancelarSoftware);

                //evento do botão cancelar
                botaoCancelarSoftware.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlSoftware = `
                    <div class="modal fade" id="modalCancelar" tabindex="-1" aria-labelledby="modalCancelarLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalCancelarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">

                                    <p>Para cancelar o serviço de software solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                    
                                    <form>
                                        <div class="form-floating mb-2" name="contatoInformadoSoftware">
                                            <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoCancelamentoSoftware" placeholder=" " required>
                                            <label for="contatoInformadoCancelamentoSoftware">Contato informado</label>
                                        </div>
                                    </form>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                                    <button type="button" class="btn btn-danger" id="confirmarCancelamentoSoftware" data-id="${software.id}" data-contato="${software.cliente.contatoCliente}">Cancelar Serviço</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlSoftware);

                    // Inicializa o modal com Bootstrap
                    var modalCancelarSoftware = new bootstrap.Modal(document.getElementById('modalCancelar'));
                    modalCancelarSoftware.show();

                    // Lógica quando clicar em "Confirmar Cancelamento"
                    document.getElementById("confirmarCancelamentoSoftware").addEventListener("click", function () {
                        const idSoftware = parseInt(event.currentTarget.dataset.id);
                        const contatoSoftware = event.currentTarget.dataset.contato;
                        console.log("ID capturado para cancelamento:", idSoftware);

                        const contatoInformado = document.getElementById("contatoInformadoCancelamentoSoftware").value;

                        if (contatoInformado === contatoSoftware) {
                            if (contatoInformado === contatoSoftware) {
                                if (confirm("Tem certeza de que deseja cancelar este serviço? Esta ação não poderá ser desfeita.")) {
                                    fetch(`http://localhost:8080/software/${idSoftware}`, {
                                        method: 'DELETE',
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                alert("Serviço cancelado com sucesso.");

                                                // Remove a div correspondente do DOM
                                                divSoftware.remove();

                                                // Atualiza o sessionStorage
                                                const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                                                const novosDados = dadosSalvos.softwares.filter(soft => parseInt(soft.id) !== idSoftware);
                                                dadosSalvos.softwares = novosDados;
                                                sessionStorage.setItem("resultadoBusca", JSON.stringify(dadosSalvos));

                                                bootstrap.Modal.getInstance(document.getElementById('modalCancelar')).hide();


                                            } else {
                                                alert("Erro ao cancelar o serviço. Tente novamente.");
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Erro ao realizar a requisição:", error);
                                            alert("Não foi possível cancelar o serviço. Verifique sua conexão.");
                                        });
                                }
                            }

                        } else {
                            alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                        }
                    });
                });

            });
        }

        if (Array.isArray(dados.impressoes)) {
            dados.impressoes.forEach((impressao) => {

                if (impressao.status && impressao.status.toLowerCase() === "cancelado") {
                    return; // não renderiza esse item
                }

                encontrouResultado = true;

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

                if (impressao.dataAtualizacao != null) {
                    var dataAtualizacao = document.createElement("p");
                    dataAtualizacao.textContent = `Atualizado em: ${impressao.dataAtualizacao}`;
                    divDadosClienteImpressao.appendChild(dataAtualizacao);
                }

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

                // Seleciona o link
                var arquivoImpressao = document.createElement("a");
                arquivoImpressao.href = "#";
                arquivoImpressao.textContent = "arquivo a imprimir";
                arquivoImpressao.target = "_blank";
                divDadosImpressao.appendChild(arquivoImpressao);

                // Adiciona o evento de clique para abrir o modal
                arquivoImpressao.addEventListener("click", function (event) {
                    event.preventDefault(); // Impede a navegação padrão

                    // Criação dinâmica do modal
                    const modalTemplate = `
                    <div class="modal fade" id="modalImagem" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true"> 
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Para visualizar a imagem da impressão solicitada, confirme o número de telefone inserido no momento de seu primeiro contato:</p> 
                                    <form>
                                    <div class="form-floating mb-2" name="contatoInformadoImpressao">
                                        <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoImpressao" placeholder=" " required>
                                        <label for="contatoInformadoImpressao">Contato informado</label>
                                    </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" id="confirmarAtualizacaoImpressao">ver imagem</button> 
                                </div>
                            </div>
                        </div>
                    </div>`;

                    // Insere o modal no body
                    document.body.insertAdjacentHTML("beforeend", modalTemplate);

                    // Inicializa o modal com Bootstrap
                    const modalElement = new bootstrap.Modal(document.getElementById("modalImagem"));
                    modalElement.show();

                    // Evento de clique no botão "ver imagem"
                    document.getElementById("confirmarAtualizacaoImpressao").addEventListener("click", function () {
                        const contatoInformado = document.getElementById("contatoInformadoImpressao").value;

                        // Verifica se o contato informado é igual ao do objeto
                        if (contatoInformado === impressao.cliente.contatoCliente) {
                            modalElement.hide();
                            window.open("http://localhost:8080" + impressao.arquivoImpressao, "_blank");
                        } else {
                            alert("Contato informado não confere. Verifique e tente novamente.");
                        }
                    });

                    // Remover o modal do DOM ao fechar para evitar duplicações
                    document.getElementById("modalImagem").addEventListener("hidden.bs.modal", function () {
                        document.getElementById("modalImagem").remove();
                    });
                });

                //cria div dos botões
                var divBotoesImpressao = document.createElement("div");
                divBotoesImpressao.classList.add("row", "justify-content-end", "mt-0", "w-100");
                divImpressao.appendChild(divBotoesImpressao);

                //cria botão para atualizar o pedido
                var botaoAtualizarImpressao = document.createElement("button");
                botaoAtualizarImpressao.classList.add("btn", "btn-outline-warning", "col-3", "text-center", "g-5", "me-3");
                botaoAtualizarImpressao.textContent = "Atualizar";
                divBotoesImpressao.appendChild(botaoAtualizarImpressao);

                //evento do botão atualizar
                botaoAtualizarImpressao.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlImpressao = `
                           <div class="modal fade" id="modalAtualizar" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true">
                               <div class="modal-dialog modal-dialog-centered">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                       </div>
                                       <div class="modal-body">
   
                                           <p>Para atualizar o serviço de impressão solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                           
                                           <form>
                                               <div class="form-floating mb-2" name="contatoInformadoImpressao">
                                                   <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoImpressao"  placeholder=" " required>
                                                   <label for="contatoInformadoImpressao">Contato informado</label>
                                               </div>
                                           </form>
   
                                       </div>
                                       <div class="modal-footer">
                                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                     -                      <button type="button" class="btn btn-primary" id="confirmarAtualizacaoImpressao" data-id="${impressao.id}" data-contato="${impressao.cliente.contatoCliente}">Atualizar</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlImpressao);

                    // Inicializa o modal com Bootstrap
                    var modalAtualizarImpressao = new bootstrap.Modal(document.getElementById('modalAtualizar'));
                    modalAtualizarImpressao.show();

                    // Lógica quando clicar em "Confirmar"
                    document.getElementById("confirmarAtualizacaoImpressao").addEventListener("click", function () {

                        // ação caso o contato tenha funcionado.
                        // Pegando o ID diretamente do botão no modal
                        const idImpressao = parseInt(event.currentTarget.dataset.id);
                        const contatoImpressao = event.currentTarget.dataset.contato;
                        console.log("ID capturado para atualização:", idImpressao);

                        const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                        const impressaoAtualizacao = dadosSalvos.impressoes.find(print => parseInt(print.id) === idImpressao);

                        if (impressaoAtualizacao) {
                            console.log("Serviç de impressão encontrado para atualização:", impressaoAtualizacao);

                            if (document.getElementById("contatoInformadoImpressao").value === contatoImpressao) {
                                sessionStorage.setItem("impressaoAtualizacao", JSON.stringify(impressaoAtualizacao));

                                window.location.href = "updatePrint.html";

                            } else {
                                alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                            }
                        } else {
                            console.error("Impressap não encontrado para o ID:", idImpressao);
                            alert("Não foi possível encontrar a impressao para atualização. Tente novamente.");
                        }

                    });


                });

                //cria botão para cancelar o pedido
                var botaoCancelarImpressao = document.createElement("button");
                botaoCancelarImpressao.classList.add("btn", "btn-outline-danger", "col-3", "text-center", "g-5");
                botaoCancelarImpressao.textContent = "Cancelar";
                divBotoesImpressao.appendChild(botaoCancelarImpressao);

                //evento do botão cancelar
                botaoCancelarImpressao.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlImpressao = `
                    <div class="modal fade" id="modalCancelar" tabindex="-1" aria-labelledby="modalCancelarLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalCancelarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">

                                    <p>Para cancelar o serviço de impressao solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                    
                                    <form>
                                        <div class="form-floating mb-2" name="contatoInformadoSoftware">
                                            <input type="text" class="form-control" name="contatoInformadoCancelamentoImpressao" id="contatoInformadoCancelamentoImpressao" placeholder=" " required>
                                            <label for="contatoInformadoCancelamentoImpressao">Contato informado</label>
                                        </div>
                                    </form>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                                    <button type="button" class="btn btn-danger" id="botaoCancelarImpressao" data-id="${impressao.id}" data-contato="${impressao.cliente.contatoCliente}">Cancelar Serviço</button>                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlImpressao);

                    // Inicializa o modal com Bootstrap
                    var modalCancelarImpressao = new bootstrap.Modal(document.getElementById('modalCancelar'));
                    modalCancelarImpressao.show();

                    // Lógica quando clicar em "Confirmar Cancelamento"
                    document.getElementById("botaoCancelarImpressao").addEventListener("click", function () {
                        const idImpressao = parseInt(event.currentTarget.dataset.id);
                        const contatoImpressao = event.currentTarget.dataset.contato;
                        console.log("ID capturado para cancelamento:", idImpressao);

                        const contatoInformado = document.getElementById("contatoInformadoCancelamentoImpressao").value;

                        if (contatoInformado === contatoImpressao) {
                            if (confirm("Tem certeza de que deseja cancelar este serviço? Esta ação não poderá ser desfeita.")) {
                                fetch(`http://localhost:8080/print/${idImpressao}`, {
                                    method: 'DELETE',
                                })
                                    .then(async response => {
                                        const responseText = await response.text(); // Captura o texto da resposta para análise
                                        if (response.ok) {
                                            alert("Serviço cancelado com sucesso.");

                                            divImpressao.remove();

                                            // Atualiza o status no sessionStorage
                                            const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));

                                            // Encontra o item no array e altera o status
                                            dadosSalvos.impressoes.forEach(print => {
                                                if (parseInt(print.id) === idImpressao) {
                                                    print.status = "Cancelado";
                                                }

                                            });

                                            // Atualiza o sessionStorage
                                            sessionStorage.setItem("resultadoBusca", JSON.stringify(dadosSalvos));

                                            // Opcional: Atualiza o status visualmente sem precisar recarregar
                                            const statusElemento = divImpressao.querySelector('.status-classe'); // substitua pelo seletor correto
                                            if (statusElemento) {
                                                statusElemento.textContent = "Status: Cancelado";
                                            }
                                            bootstrap.Modal.getInstance(document.getElementById('modalCancelar')).hide();

                                        } else {
                                            console.error(`Erro ao cancelar o serviço. Status: ${response.status}. Resposta: ${responseText}`);
                                            alert(`Erro ao cancelar o serviço. Status: ${response.status}. Verifique o console para mais detalhes.`);
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Erro ao realizar a requisição:", error);
                                        alert("Não foi possível cancelar o serviço. Verifique sua conexão.");
                                    });
                            }
                        } else {
                            alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                        }
                    });
                });

            });
        }

        if (Array.isArray(dados.criacoesDesign)) {
            dados.criacoesDesign.forEach((design) => {

                if (design.status && design.status.toLowerCase() === "cancelado") {
                    return; // não renderiza esse item
                }

                encontrouResultado = true;


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

                if (design.dataAtualizacao != null) {
                    var dataAtualizacao = document.createElement("p");
                    dataAtualizacao.textContent = `Atualizado em: ${design.dataAtualizacao}`;
                    divClienteDesign.appendChild(dataAtualizacao);
                }

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


                // Seleciona o link
                var arquivoReferencia = document.createElement("a");
                arquivoReferencia.href = "#";
                arquivoReferencia.textContent = "arquivo de referência";
                arquivoReferencia.target = "_blank";
                dadosDesign.appendChild(arquivoReferencia);

                // Adiciona o evento de clique para abrir o modal
                arquivoReferencia.addEventListener("click", function (event) {
                    event.preventDefault(); // Impede a navegação padrão

                    // Criação dinâmica do modal
                    const modalTemplate = `
                    <div class="modal fade" id="modalImagem" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true"> 
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Para visualizar a imagem de referência enviada, confirme o número de telefone inserido no momento de seu primeiro contato:</p> 
                                    <form>
                                    <div class="form-floating mb-2" name="contatoInformadoImpressao">
                                        <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoImpressao" placeholder=" " required>
                                        <label for="contatoInformadoImpressao">Contato informado</label>
                                    </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" id="confirmarAtualizacaoImpressao">ver imagem</button> 
                                </div>
                            </div>
                        </div>
                    </div>`;

                    // Insere o modal no body
                    document.body.insertAdjacentHTML("beforeend", modalTemplate);

                    // Inicializa o modal com Bootstrap
                    const modalElement = new bootstrap.Modal(document.getElementById("modalImagem"));
                    modalElement.show();

                    // Evento de clique no botão "ver imagem"
                    document.getElementById("confirmarAtualizacaoImpressao").addEventListener("click", function () {
                        const contatoInformado = document.getElementById("contatoInformadoImpressao").value;

                        // Verifica se o contato informado é igual ao do objeto
                        if (contatoInformado === design.cliente.contatoCliente) {
                            modalElement.hide();
                            window.open("http://localhost:8080" + design.arquivoReferencia, "_blank");
                        } else {
                            alert("Contato informado não confere. Verifique e tente novamente.");
                        }
                    });

                    // Remover o modal do DOM ao fechar para evitar duplicações
                    document.getElementById("modalImagem").addEventListener("hidden.bs.modal", function () {
                        document.getElementById("modalImagem").remove();
                    });
                });







                //cria div dos botões
                var divBotoesDesign = document.createElement("div");
                divBotoesDesign.classList.add("row", "justify-content-end", "mt-0", "w-100");
                divDesign.appendChild(divBotoesDesign);

                //cria botão para atualizar o pedido
                var botaoAtualizarDesign = document.createElement("button");
                botaoAtualizarDesign.classList.add("btn", "btn-outline-warning", "col-3", "text-center", "g-5", "me-3");
                botaoAtualizarDesign.textContent = "Atualizar";
                divBotoesDesign.appendChild(botaoAtualizarDesign);

                //evento do botão atualizar
                botaoAtualizarDesign.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlDesign = `
                          <div class="modal fade" id="modalAtualizar" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                      </div>
                                      <div class="modal-body">
  
                                          <p>Para atualizar o serviço de design solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                          
                                          <form>
                                              <div class="form-floating mb-2" name="contatoInformadoDesign">
                                                  <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoDesign"  placeholder=" " required>
                                                  <label for="contatoInformadoDesign">Contato informado</label>
                                              </div>
                                          </form>
  
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                          <button type="button" class="btn btn-primary" id="confirmarAtualizacao" data-id="${design.id}" data-contato="${design.cliente.contatoCliente}" >Atualizar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlDesign);

                    // Inicializa o modal com Bootstrap
                    var modalAtualizarDesign = new bootstrap.Modal(document.getElementById('modalAtualizar'));
                    modalAtualizarDesign.show();

                    // Lógica quando clicar em "Confirmar"
                    document.getElementById("confirmarAtualizacao").addEventListener("click", function () {
                        // Pegando o ID diretamente do botão no modal
                        const idDesign = parseInt(event.currentTarget.dataset.id);
                        const contatoDesign = event.currentTarget.dataset.contato;
                        console.log("ID capturado para atualização:", idDesign);

                        const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                        const designAtualizacao = dadosSalvos.criacoesDesign.find(des => parseInt(des.id) === idDesign);

                        if (designAtualizacao) {
                            console.log("Design encontrado para atualização:", designAtualizacao);

                            if (document.getElementById("contatoInformadoDesign").value === contatoDesign) {
                                sessionStorage.setItem("designAtualizacao", JSON.stringify(designAtualizacao));
                                window.location.href = "atualizacaoDesign.html";
                            } else {
                                alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                            }
                        } else {
                            console.error("Design não encontrado para o ID:", idDesign);
                            alert("Não foi possível encontrar o serviço de criação de design para atualização. Tente novamente.");
                        }

                    });

                });

                //cria botão para cancelar o pedido
                var botaoCancelarDesign = document.createElement("button");
                botaoCancelarDesign.classList.add("btn", "btn-outline-danger", "col-3", "text-center", "g-5");
                botaoCancelarDesign.textContent = "Cancelar";
                divBotoesDesign.appendChild(botaoCancelarDesign);


                //evento do botão cancelar
                botaoCancelarDesign.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlImpressao = `
                                    <div class="modal fade" id="modalCancelar" tabindex="-1" aria-labelledby="modalCancelarLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="modalCancelarLabel">Confirmação de identidade</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                                </div>
                                                <div class="modal-body">
                
                                                    <p>Para cancelar o serviço de impressao solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                                    
                                                    <form>
                                                        <div class="form-floating mb-2" name="contatoInformadoDesign">
                                                            <input type="text" class="form-control" name="contatoInformadoCancelamentoDesign" id="contatoInformadoCancelamentoDesign" placeholder=" " required>
                                                            <label for="contatoInformadoCancelamentoDesign">Contato informado</label>
                                                        </div>
                                                    </form>
                
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                                                    <button type="button" class="btn btn-danger" id="botaoCancelarDesign" data-id="${design.id}" data-contato="${design.cliente.contatoCliente}">Cancelar Serviço</button>                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlImpressao);

                    // Inicializa o modal com Bootstrap
                    var modalCancelarImpressao = new bootstrap.Modal(document.getElementById('modalCancelar'));
                    modalCancelarImpressao.show();

                    // Lógica quando clicar em "Confirmar Cancelamento"
                    document.getElementById("botaoCancelarDesign").addEventListener("click", function () {
                        const idDesign = parseInt(event.currentTarget.dataset.id);
                        const contatoDesign = event.currentTarget.dataset.contato;
                        console.log("ID capturado para cancelamento:", idDesign);

                        const contatoInformado = document.getElementById("contatoInformadoCancelamentoDesign").value;

                        if (contatoInformado === contatoDesign) {
                            if (confirm("Tem certeza de que deseja cancelar este serviço? Esta ação não poderá ser desfeita.")) {
                                fetch(`http://localhost:8080/design/${idDesign}`, {
                                    method: 'DELETE',
                                })
                                    .then(async response => {
                                        const responseText = await response.text(); // Captura o texto da resposta para análise
                                        if (response.ok) {
                                            alert("Serviço cancelado com sucesso.");


                                            divDesign.remove();

                                            // Atualiza o status no sessionStorage
                                            const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));

                                            // Encontra o item no array e altera o status
                                            dadosSalvos.criacoesDesign.forEach(design => {
                                                if (parseInt(design.id) === idDesign) {
                                                    print.design = "Cancelado";
                                                }

                                                bootstrap.Modal.getInstance(document.getElementById('modalCancelar')).hide();

                                            });

                                            // Atualiza o sessionStorage
                                            sessionStorage.setItem("resultadoBusca", JSON.stringify(dadosSalvos));

                                            // Opcional: Atualiza o status visualmente sem precisar recarregar
                                            const statusElemento = divDesign.querySelector('.status-classe'); // substitua pelo seletor correto
                                            if (statusElemento) {
                                                statusElemento.textContent = "Status: Cancelado";
                                            }

                                        } else {
                                            console.error(`Erro ao cancelar o serviço. Status: ${response.status}. Resposta: ${responseText}`);
                                            alert(`Erro ao cancelar o serviço. Status: ${response.status}. Verifique o console para mais detalhes.`);
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Erro ao realizar a requisição:", error);
                                        alert("Não foi possível cancelar o serviço. Verifique sua conexão.");
                                    });
                            }
                        } else {
                            alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                        }
                    });
                });

            });
        }

        if (Array.isArray(dados.consertos)) {
            dados.consertos.forEach((conserto) => {

                if (conserto.status && conserto.status.toLowerCase() === "cancelado") {
                    return; // não renderiza esse item
                }

                encontrouResultado = true;

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

                if (conserto.dataAtualizacao != null) {
                    var dataAtualizacao = document.createElement("p");
                    dataAtualizacao.textContent = `Atualizado em: ${conserto.dataAtualizacao}`;
                    divClienteConserto.appendChild(dataAtualizacao);
                }

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

                // Seleciona o link
                var linkImagemConserto = document.createElement("a");
                linkImagemConserto.href = "#";
                linkImagemConserto.textContent = "imagem do defeito";
                linkImagemConserto.target = "_blank";
                divImagemConserto.appendChild(linkImagemConserto);

                // Adiciona o evento de clique para abrir o modal
                linkImagemConserto.addEventListener("click", function (event) {
                    event.preventDefault(); // Impede a navegação padrão

                    // Criação dinâmica do modal
                    const modalTemplate = `
                    <div class="modal fade" id="modalImagem" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true"> 
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Para visualizar a imagem da impressão solicitada, confirme o número de telefone inserido no momento de seu primeiro contato:</p> 
                                    <form>
                                    <div class="form-floating mb-2" name="contatoInformadoImpressao">
                                        <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoImpressao" placeholder=" " required>
                                        <label for="contatoInformadoImpressao">Contato informado</label>
                                    </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" id="confirmarAtualizacaoImpressao">ver imagem</button> 
                                </div>
                            </div>
                        </div>
                    </div>`;

                    // Insere o modal no body
                    document.body.insertAdjacentHTML("beforeend", modalTemplate);

                    // Inicializa o modal com Bootstrap
                    const modalElement = new bootstrap.Modal(document.getElementById("modalImagem"));
                    modalElement.show();

                    // Evento de clique no botão "ver imagem"
                    document.getElementById("confirmarAtualizacaoImpressao").addEventListener("click", function () {
                        const contatoInformado = document.getElementById("contatoInformadoImpressao").value;

                        // Verifica se o contato informado é igual ao do objeto
                        if (contatoInformado === conserto.cliente.contatoCliente) {
                            modalElement.hide();
                            window.open("http://localhost:8080" + conserto.arquivo, "_blank");
                        } else {
                            alert("Contato informado não confere. Verifique e tente novamente.");
                        }
                    });

                    // Remover o modal do DOM ao fechar para evitar duplicações
                    document.getElementById("modalImagem").addEventListener("hidden.bs.modal", function () {
                        document.getElementById("modalImagem").remove();
                    });
                });

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
                if (conserto.domicilio.data == null) {
                    dataVisitaConserto.textContent = "";
                } else {
                    dataVisitaConserto.textContent = `Data da visita: ${conserto.domicilio.data}`;
                }
                divAgendamentoVisita.appendChild(dataVisitaConserto);


                //cria div dos botões
                var divBotoesConserto = document.createElement("div");
                divBotoesConserto.classList.add("row", "justify-content-end", "mt-0", "w-100");
                divConserto.appendChild(divBotoesConserto);

                //cria botão para atualizar o pedido
                var botaoAtualizarConserto = document.createElement("button");
                botaoAtualizarConserto.classList.add("btn", "btn-outline-warning", "col-3", "text-center", "g-5", "me-3");
                botaoAtualizarConserto.textContent = "Atualizar";
                divBotoesConserto.appendChild(botaoAtualizarConserto);

                //evento do botão atualizar
                botaoAtualizarConserto.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlConserto = `
                           <div class="modal fade" id="modalAtualizar" tabindex="-1" aria-labelledby="modalAtualizarLabel" aria-hidden="true">
                               <div class="modal-dialog modal-dialog-centered">
                                   <div class="modal-content">
                                       <div class="modal-header">
                                           <h5 class="modal-title" id="modalAtualizarLabel">Confirmação de identidade</h5>
                                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                       </div>
                                       <div class="modal-body">
   
                                           <p>Para atualizar o serviço de impressão solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                           
                                           <form>
                                               <div class="form-floating mb-2" name="contatoInformadoImpressao">
                                                   <input type="text" class="form-control" name="contatoInformado" id="contatoInformadoImpressao"  placeholder=" " required>
                                                   <label for="contatoInformadoImpressao">Contato informado</label>
                                               </div>
                                           </form>
   
                                       </div>
                                       <div class="modal-footer">
                                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                          <button type="button" class="btn btn-primary" id="confirmarAtualizacaoConserto" data-id="${conserto.id}" data-contato="${conserto.cliente.contatoCliente}">Atualizar</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlConserto);

                    // Inicializa o modal com Bootstrap
                    var modalAtualizarConserto = new bootstrap.Modal(document.getElementById('modalAtualizar'));
                    modalAtualizarConserto.show();

                    // Lógica quando clicar em "Confirmar"
                    document.getElementById("confirmarAtualizacaoConserto").addEventListener("click", function () {

                        // ação caso o contato tenha funcionado.
                        // Pegando o ID diretamente do botão no modal
                        const idConserto = parseInt(event.currentTarget.dataset.id);
                        const contatoConserto = event.currentTarget.dataset.contato;
                        console.log("ID capturado para atualização:", idConserto);

                        const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                        const consertoAtualizacao = dadosSalvos.consertos.find(repair => parseInt(repair.id) === idConserto);

                        if (consertoAtualizacao) {
                            console.log("Serviç de impressão encontrado para atualização:", consertoAtualizacao);

                            if (document.getElementById("contatoInformadoImpressao").value === contatoConserto) {
                                sessionStorage.setItem("consertoAtualizacao", JSON.stringify(consertoAtualizacao));

                                window.location.href = "atualizacaoConserto.html";

                            } else {
                                alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                            }
                        } else {
                            console.error("Impressap não encontrado para o ID:", idConserto);
                            alert("Não foi possível encontrar a impressao para atualização. Tente novamente.");
                        }

                    });


                });

                //cria botão para cancelar o pedido
                var botaoCancelarConserto = document.createElement("button");
                botaoCancelarConserto.classList.add("btn", "btn-outline-danger", "col-3", "text-center", "g-5");
                botaoCancelarConserto.textContent = "Cancelar";
                divBotoesConserto.appendChild(botaoCancelarConserto);

                //evento do botão cancelar
                botaoCancelarConserto.addEventListener("click", function () {
                    // Remove modais anteriores, se houver
                    document.querySelectorAll('.modal').forEach(m => m.remove());

                    // Cria estrutura do modal
                    var modalHtmlConserto = `
                    <div class="modal fade" id="modalCancelar" tabindex="-1" aria-labelledby="modalCancelarLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalCancelarLabel">Confirmação de identidade</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">

                                    <p>Para cancelar o serviço de impressao solicitado, confirme o número de telefone inserido no momento de seu primeiro contato:</p>
                                    
                                    <form>
                                        <div class="form-floating mb-2" name="contatoInformadoSoftware">
                                            <input type="text" class="form-control" name="contatoInformadoCancelamentoImpressao" id="contatoInformadoCancelamentoImpressao" placeholder=" " required>
                                            <label for="contatoInformadoCancelamentoImpressao">Contato informado</label>
                                        </div>
                                    </form>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                                    <button type="button" class="btn btn-danger" id="botaoCancelarImpressao" data-id="${conserto.id}" data-contato="${conserto.cliente.contatoCliente}">Cancelar Serviço</button>                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    // Insere o modal no final do body
                    document.body.insertAdjacentHTML('beforeend', modalHtmlConserto);

                    // Inicializa o modal com Bootstrap
                    var modalCancelarConserto = new bootstrap.Modal(document.getElementById('modalCancelar'));
                    modalCancelarConserto.show();

                    // Lógica quando clicar em "Confirmar Cancelamento"
                    document.getElementById("botaoCancelarImpressao").addEventListener("click", function (event) {
                        const idConserto = parseInt(event.currentTarget.dataset.id);
                        const contatoConserto = event.currentTarget.dataset.contato;
                        console.log("ID capturado para cancelamento:", idConserto);

                        const contatoInformado = document.getElementById("contatoInformadoCancelamentoImpressao").value;

                        if (contatoInformado === contatoConserto) {
                            if (confirm("Tem certeza de que deseja cancelar este serviço? Esta ação não poderá ser desfeita.")) {
                                fetch(`http://localhost:8080/conserto/${idConserto}`, {
                                    method: 'DELETE',
                                })
                                    .then(async response => {
                                        const responseText = await response.text();
                                        if (response.ok) {
                                            alert("Serviço cancelado com sucesso.");

                                            // Remove o elemento do DOM
                                            divConserto.remove();

                                            // Fecha o modal corretamente
                                            const instance = bootstrap.Modal.getInstance(document.getElementById('modalCancelar'));
                                            if (instance) {
                                                instance.hide();
                                            }

                                            // Atualiza o status no sessionStorage
                                            const dadosSalvos = JSON.parse(sessionStorage.getItem("resultadoBusca"));
                                            dadosSalvos.consertos.forEach(repair => {
                                                if (parseInt(repair.id) === idConserto) {
                                                    repair.status = "Cancelado";
                                                }
                                            });

                                            sessionStorage.setItem("resultadoBusca", JSON.stringify(dadosSalvos));

                                            // Atualiza o status visualmente
                                            const statusElemento = divConserto.querySelector('.status-classe');
                                            if (statusElemento) {
                                                statusElemento.textContent = "Status: Cancelado";
                                            }

                                        } else {
                                            console.error(`Erro ao cancelar o serviço. Status: ${response.status}. Resposta: ${responseText}`);
                                            alert(`Erro ao cancelar o serviço. Status: ${response.status}. Verifique o console para mais detalhes.`);
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Erro ao realizar a requisição:", error);
                                        alert("Não foi possível cancelar o serviço. Verifique sua conexão.");
                                    });
                            }
                        } else {
                            alert("Contato informado incorreto. Por favor, indique o mesmo número do momento da solicitação inicial.");
                        }
                    });
                });


            });




            if (!encontrouResultado) {
                var mensagemSemResultados = document.createElement("div");
                mensagemSemResultados.classList.add("mensagem-sem-resultados");
                resultadosBusca.appendChild(mensagemSemResultados);

                var tituloMensagemSemResultados = document.createElement("h2");
                tituloMensagemSemResultados.textContent = "Sem resultados para a busca.";
                tituloMensagemSemResultados.classList.add("text-center", "mb-3");
                mensagemSemResultados.appendChild(tituloMensagemSemResultados);

                var mensagemExplicativa = document.createElement("h6");
                mensagemExplicativa.textContent = "não foram encontrados resultados para o email ou telefone pesquisado. Tente novamente com um email ou número diferente."
                mensagemExplicativa.classList.add("text-center")
                mensagemSemResultados.appendChild(mensagemExplicativa);
                resultadosBusca.appendChild(divSemResultados);
            }

        }

    }
});