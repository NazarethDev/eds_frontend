// Recupera os dados do sessionStorage
const impressaoData = JSON.parse(sessionStorage.getItem("impressaoAtualizacao"));

if (impressaoData.produto === "Cartão de visitas") {
    window.onload = () => {
        if (impressaoData) {
            // Cria o formulário dinamicamente
            const formHTML = `
            <form id="updatePrintForm" class="row mb-4 justify-content-center p-3 border rounded">
                <h3 class="text-center">Detalhes da impressão dos cartões de visita</h3>
                <div class="row mb-2 mt-3">
                    <div class="col-12 col-sm-6">
                        <div class="form-floating">
                            <select class="form-select" id="materialImpressao" aria-label="Material da impressão"
                                name="materialImpressao" required>
                                <option value="Papel sulfite 90g">Papel sulfite 90g</option>
                                <option value="Papel sulfite 75g">Papel sulfite 75g</option>
                                <option value="Papel sulfite 120g">Papel sulfite 120g</option>
                                <option value="Papel offset 180g">Papel offset 180g</option>
                                <option value="Papel opaline 240g">Papel opaline 240g</option>
                                <option value="Papel canson 240g">Papel canson 240g</option>
                                <option value="Papel canson 300g">Papel canson 300g</option>
                            </select>
                            <label for="materialImpressao">Material</label>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div class="form-floating">
                            <select class="form-select" id="corImpressao" aria-label="Cores" name="corImpressao" required>
                                <option value="colorido">Colorido</option>
                                <option value="preto e branco">Preto e branco</option>
                            </select>
                            <label for="corImpressao">Cor da impressão</label>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div class="row">
                            <div class="mb-2 justify-content-center col-12">
                                <div class="form-floating mb-2">
                                    <input type="number" min="1" class="form-control" name="unidades" id="unidades"
                                        placeholder=" " required>
                                    <label for="unidades">Quantidade de cópias</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 justify-content-center">
                        <div class="form-floating">
                            <select class="form-select" id="ladosImpressao" aria-label="Lados" name="ladosImpressao" required>
                                <option value="frente e verso">Frente e verso</option>
                                <option value="frente">Só frente</option>
                            </select>
                            <label for="ladosImpressao">Lados da impressão</label>
                        </div>
                    </div>
                </div>

                <div class="mb-3 text-center justify-content-center">
                    <label for="formFile" class="form-label">Arquivo para impressão</label>
                    <input class="form-control" type="file" id="formFile" name="arquivo">
                </div>

                <div class="row justify-content-center text-center">
                    <div class="col-12 justify-content-center text-center">
                        <button type="submit" class="btn btn-primary w-50">Enviar</button>
                    </div>
                </div>
            </form>`;

            // Insere o formulário no container específico
            document.getElementById("updatePrint").innerHTML = formHTML;

            // Preenche os campos do formulário com os valores do objeto
            document.getElementById("materialImpressao").value = impressaoData.materialImpressao;
            document.getElementById("corImpressao").value = impressaoData.coresImpressao;
            document.getElementById("unidades").value = impressaoData.unidades;
            document.getElementById("ladosImpressao").value = impressaoData.ladosImpressao;

            if (impressaoData.arquivoImpressao) {
                const fileLink = document.createElement("a");
                fileLink.href = "http://localhost:8080" + impressaoData.arquivoImpressao;
                fileLink.target = "_blank";
                fileLink.textContent = "Clique aqui para acessar o arquivo";
                fileLink.classList.add("btn", "btn-link", "mt-2");

                document.getElementById("formFile").insertAdjacentElement("afterend", fileLink);
            }

            // Envio do formulário
            const form = document.getElementById("updatePrintForm");
            form.onsubmit = async (event) => {
                event.preventDefault(); // Evita o reload da página

                // Cria um objeto FormData para envio multipart
                const formData = new FormData();
                formData.append("dados", new Blob([JSON.stringify({
                    materialImpressao: document.getElementById("materialImpressao").value,
                    coresImpressao: document.getElementById("corImpressao").value,
                    unidades: document.getElementById("unidades").value,
                    ladosImpressao: document.getElementById("ladosImpressao").value,
                })], { type: "application/json" }));

                // Adiciona o arquivo ao formData, caso ele tenha sido selecionado
                const fileInput = document.getElementById("formFile");
                if (fileInput.files.length > 0) {
                    formData.append("file", fileInput.files[0]);
                }

                try {
                    // Envio da requisição PUT
                    const response = await fetch(`http://localhost:8080/print/${impressaoData.id}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (response.ok) {
                        alert("Impressão atualizada com sucesso!");
                    } else {
                        alert("Erro ao atualizar a impressão.");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao enviar os dados.");
                }
            };
        }
    };
}

if (impressaoData.produto.includes("Calendário")) {
    window.onload = () => {
        if (impressaoData) {
            // Cria o formulário dinamicamente
            const formHTML = `
            <form id="updatePrintForm" class="row mb-4 justify-content-center p-3 border rounded">
                <h3 class="text-center">Detalhes da impressão dos calendários</h3>
                <div class="row mb-2 mt-3">
                    <div class="col-12">
                        <div class="form-floating">
                            <select class="form-select" id="produto" aria-label="Material da impressão" name="produto"
                                required>
                                <option value="Calendário A4 com foto">Calendário A4 com foto</option>
                                <option value="Calendário A4 sem foto">Calendário A4 sem foto</option>
                                <option value="Calendário A4 com foto em um dos lados">Calendário A4 com foto em
                                    um dos lados</option>
                                <option value="Calendário 15x20 sem foto">Calendário 15x20 sem foto</option>
                                <option value="Calendário 6,8x7,5 cm com foto (geladeira)">Calendário 6,8x7,5 cm
                                    com foto (geladeira)</option>
                                <option value="Calendário 9x15 com foto">Calendário 9x15 com foto</option>
                                <option value="Calendário 15x20 com foto">Calendário 15x20 com foto</option>
                                <option value="Calendário 15x20 sem foto">Calendário 15x20 sem foto</option>
                                <option value="Calendário com 12 fotos">Calendário com 12 fotos</option>
                                <option value="Calendário de mesa A4 colado">Calendário de mesa A4 colado
                                </option>
                            </select>
                            <label for="produto">Tipo de calendário</label>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div class="row">
                            <div class="mb-2 justify-content-center col-12">
                                <div class="form-floating mb-2">
                                    <input type="number" min="1" class="form-control" name="unidades" id="unidades"
                                        placeholder=" " required>
                                    <label for="nomeCliente">Quantidade de cópias</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 justify-content-center">
                        <div class="form-floating">
                            <select class="form-select" id="corImpressao" aria-label="Cores" name="corImpressao" required>
                                <option value="colorido">Colorido</option>
                                <option value="preto e branco">Preto e branco</option>
                            </select>
                            <label for="corImpressao">Cor da impressão</label>
                        </div>
                    </div>
                </div>

                <div class="mb-3 text-center justify-content-center">
                    <label for="formFile" class="form-label">Arquivo para impressão</label>
                    <input class="form-control" type="file" id="formFile" name="arquivo">
                </div>

                <div class="row justify-content-center text-center">
                    <div class="col-12 justify-content-center text-center">
                        <button type="submit" class="btn btn-primary w-50">Enviar</button>
                    </div>
                </div>
            </form>`;

            // Insere o formulário no container específico
            document.getElementById("updatePrint").innerHTML = formHTML;

            // Preenche os campos do formulário com os valores do objeto
            document.getElementById("produto").value = impressaoData.produto;
            document.getElementById("corImpressao").value = impressaoData.coresImpressao;
            document.getElementById("unidades").value = impressaoData.unidades;

            if (impressaoData.arquivoImpressao) {
                const fileLink = document.createElement("a");
                fileLink.href = "http://localhost:8080" + impressaoData.arquivoImpressao;
                fileLink.target = "_blank";
                fileLink.textContent = "Clique aqui para acessar o arquivo";
                fileLink.classList.add("btn", "btn-link", "mt-2");

                document.getElementById("formFile").insertAdjacentElement("afterend", fileLink);
            }

            // Envio do formulário
            const form = document.getElementById("updatePrintForm");
            form.onsubmit = async (event) => {
                event.preventDefault(); // Evita o reload da página

                // Cria um objeto FormData para envio multipart
                const formData = new FormData();
                formData.append("dados", new Blob([JSON.stringify({
                    produto: document.getElementById("produto").value,
                    coresImpressao: document.getElementById("corImpressao").value,
                    unidades: document.getElementById("unidades").value,
                })], { type: "application/json" }));

                // Adiciona o arquivo ao formData, caso ele tenha sido selecionado
                const fileInput = document.getElementById("formFile");
                if (fileInput.files.length > 0) {
                    formData.append("file", fileInput.files[0]);
                }

                try {
                    // Envio da requisição PUT
                    const response = await fetch(`http://localhost:8080/print/${impressaoData.id}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (response.ok) {
                        alert("Impressão atualizada com sucesso!");
                    } else {
                        alert("Erro ao atualizar a impressão.");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao enviar os dados.");
                }
            };
        }
    };
}

if (impressaoData.produto.includes("Flyer")) {
    window.onload = () => {
        if (impressaoData) {
            // Cria o formulário dinamicamente
            const formHTML = `
                 <form id="updateFlyerForm" class="row mb-4 justify-content-center p-3 border rounded">
                    <h3 class="text-center">Detalhes da impressão dos flyers</h3>

                    <div class="row mb-2 mt-3">
                        <div class="col-12 col-sm-6">
                            <div class="form-floating">
                                <select class="form-select" id="materialImpressao" aria-label="Material da impressão"
                                    name="materialImpressao" required>
                                    <option value="Alta alvura 150g">Alta alvura 150g</option>
                                    <option value="Couché brilho 90g">Couché brilho 90g</option>
                                    <option value="Couché brilho 115g">Couché brilho 115g</option>
                                    <option value="Couché brilho 150g">Couché brilho 150g</option>
                                    <option value="Couché brilho 250g">Couché brilho 250g</option>
                                    <option value="Couché fosco 115g">Couché fosco 115g</option>
                                    <option value="Couché fosco 150g">Couché fosco 150g</option>
                                    <option value="Couché fosco 170g">Couché fosco 170g</option>
                                    <option value="Reciclado 90g">Reciclado 90g</option>
                                    <option value="Reciclado 240g">Reciclado 240g</option>
                                    <option value="Kraft 135g">Kraft 135g</option>
                                </select>
                                <label for="materialImpressao">Material</label>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6">
                            <div class="form-floating">
                                <select class="form-select" id="produto" aria-label="Tamanho do produto" name="produto" required>
                                    <option value="Flyer 105x148mm">105x148mm</option>
                                    <option value="Flyer 105x210mm">105x210mm</option>
                                    <option value="Flyer 148x210mm">148x210mm </option>
                                    <option value="Flyer 210x294mm">210x294mm</option>
                                    <option value="Flyer 297x420mm">297x420mm</option>
                                </select>
                                <label for="produto">Tamanho</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-6">
                            <h4 class="text-center justify-content-center">Quantidade de cópias</h4>
                            <div class="row">
                                <div class="mb-2 justify-content-center col-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio50" value="50">
                                        <label class="form-check-label" for="radio50">50 unidades</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio100" value="100">
                                        <label class="form-check-label" for="radio100">100 unidades</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio200" value="200">
                                        <label class="form-check-label" for="radio200">200 unidades</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio300" value="300">
                                        <label class="form-check-label" for="radio300">300 unidades</label>
                                    </div>
                                </div>
                                <div class="mb-2 justify-content-center col-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio500" value="500">
                                        <label class="form-check-label" for="radio500">500 unidades</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio1000" value="1000">
                                        <label class="form-check-label" for="radio1000">1000 unidades</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="unidades" id="radio2000" value="2000">
                                        <label class="form-check-label" for="radio2000">2000 unidades</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 justify-content-center">
                            <h4 class="text-center justify-content-center">Lados impressos</h4>
                            <select class="form-select" aria-label="Lados de impressão" name="ladosImpressao">
                                <option value="frente">Frente</option>
                                <option value="frente e verso" selected>Frente e verso</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 text-center justify-content-center">
                        <label for="formFile" class="form-label">Arquivo para impressão</label>
                        <input class="form-control" type="file" id="formFile" name="arquivo">
                    </div>

                    <div class="row justify-content-center text-center">
                        <div class="col-12 justify-content-center text-center">
                            <button type="submit" class="btn btn-primary w-50">Enviar</button>
                        </div>
                    </div>
                </form>`;

            // Insere o formulário no container
            document.getElementById("updatePrint").innerHTML = formHTML;

            document.getElementById("materialImpressao").value = impressaoData.materialImpressao;
            document.getElementById("produto").value = impressaoData.produto;

            // ** Ajuste para selecionar o botão de rádio **
            const radioButton = document.querySelector(`input[name='unidades'][value='${impressaoData.unidades}']`);
            if (radioButton) {
                radioButton.checked = true; // Aqui marcamos o botão corretamente
            }

            document.querySelector("select[name='ladosImpressao']").value = impressaoData.ladosImpressao;

            if (impressaoData.arquivoImpressao) {
                const fileLink = document.createElement("a");
                fileLink.href = "http://localhost:8080" + impressaoData.arquivoImpressao;
                fileLink.target = "_blank";
                fileLink.textContent = "Clique aqui para acessar o arquivo";
                fileLink.classList.add("btn", "btn-link", "mt-2");

                document.getElementById("formFile").insertAdjacentElement("afterend", fileLink);
            }

            // Envio do formulário
            const form = document.getElementById("updateFlyerForm");
            form.onsubmit = async (event) => {
                event.preventDefault(); // Evita o reload da página

                const formData = new FormData();
                formData.append("dados", new Blob([JSON.stringify({
                    materialImpressao: document.getElementById("materialImpressao").value,
                    produto: document.getElementById("produto").value,
                    unidades: document.querySelector("input[name='unidades']:checked").value,
                    ladosImpressao: document.querySelector("select[name='ladosImpressao']").value,
                })], { type: "application/json" }));

                const fileInput = document.getElementById("formFile");
                if (fileInput.files.length > 0) {
                    formData.append("file", fileInput.files[0]);
                }

                try {
                    const response = await fetch(`http://localhost:8080/print/${impressaoData.id}`, {
                        method: "PUT",
                        body: formData,
                    });

                    if (response.ok) {
                        alert("Impressão de flyer atualizada com sucesso!");
                    } else {
                        alert("Erro ao atualizar a impressão.");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao enviar os dados.");
                }
            };
        }
    };
}

if (impressaoData.produto == "Folhas avulsas") {
    window.onload = () => {
        if (impressaoData) {
            // Cria o formulário dinamicamente
            const formHTML = `
            <form id="updatePrintForm" class="row mb-4 justify-content-center p-3 border rounded">
                <h3 class="text-center">Detalhes da impressão dos arquivos</h3>
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-floating">
                            <select class="form-select" id="materialImpressao" aria-label="Material da impressão"
                                name="materialImpressao" required>
                                <option value="Papel sulfite 90g">Papel sulfite 90g</option>
                                <option value="Papel sulfite 75g">Papel sulfite 75g</option>
                                <option value="Papel sulfite 120g">Papel sulfite 120g</option>
                                <option value="Papel monolúcido 90g">Papel monolúcido 90g</option>
                                <option value="Papel fotográfico auto adesivo 130g">Papel fotográfico auto
                                    adesivo 130g</option>
                                <option value="Papel fotográfico 180g">Papel fotográfico 180g</option>
                                <option value="Papel offset 180g">Papel offset 180g</option>
                                <option value="Papel opaline 240g">Papel opaline 240g</option>
                                <option value="Papel canson 240g">Papel canson 240g</option>
                                <option value="Papel canson 300g">Papel canson 300g</option>
                                <option value="Papel fotográfico dupla face 180g">Papel fotográfico dupla face
                                    180g</option>
                            </select>
                            <label for="materialImpressao">Material</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating">
                            <select class="form-select" id="coresImpressao" aria-label="Lados impressos"
                                name="coresImpressao" required>
                                <option value="Colorido">Colorido</option>
                                <option value="Preto e branco">Preto e branco</option>
                            </select>
                            <label for="coresImpressao">Lados impressos</label>
                        </div>
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-floating mb-2">
                            <input type="number" min="1" class="form-control" name="unidades" id="unidades" placeholder=" "
                                required>
                            <label for="nomeCliente">Quantidade de cópias</label>
                        </div>
                    </div>
                    <div class="col-6 justify-content-center">
                        <div class="form-floating">
                            <select class="form-select" id="ladosImpressap" aria-label="Lados impressos"
                                name="ladosImpressap" required>
                                <option value="Frente e verso">Frente e verso</option>
                                <option value="Frente">Frente</option>
                            </select>
                            <label for="ladosImpressap">Lados impressos</label>
                        </div>
                    </div>
                </div>

                <div class="mb-3 text-center justify-content-center">
                    <label for="formFile" class="form-label">Arquivo para impressão</label>
                    <input class="form-control" type="file" id="formFile" name="arquivo" required>
                </div>

                <div class="row justify-content-center text-center">
                    <div class="col-12 justify-content-center text-center">
                        <button type="submit" class="btn btn-primary w-50">Enviar</button>
                    </div>
                </div>
            </form>`;

            // Insere o formulário no container específico
            document.getElementById("updatePrint").innerHTML = formHTML;

            // Preenche os campos do formulário com os valores do objeto
            // Preenche os campos do formulário com os valores do objeto
            document.getElementById("materialImpressao").value = impressaoData.materialImpressao;
            document.getElementById("coresImpressao").value = impressaoData.coresImpressao;
            document.getElementById("unidades").value = impressaoData.unidades;
            document.getElementById("ladosImpressap").value = impressaoData.ladosImpressao;


            if (impressaoData.arquivoImpressao) {
                const fileLink = document.createElement("a");
                fileLink.href = "http://localhost:8080" + impressaoData.arquivoImpressao;
                fileLink.target = "_blank";
                fileLink.textContent = "Clique aqui para acessar o arquivo";
                fileLink.classList.add("btn", "btn-link", "mt-2");

                document.getElementById("formFile").insertAdjacentElement("afterend", fileLink);
            }

            // Envio do formulário
            const form = document.getElementById("updatePrintForm");
            form.onsubmit = async (event) => {
                event.preventDefault(); // Evita o reload da página

                // Cria um objeto FormData para envio multipart
                const formData = new FormData();
                formData.append("dados", new Blob([JSON.stringify({
                    materialImpressao: document.getElementById("materialImpressao").value,
                    coresImpressao: document.getElementById("corImpressao").value,
                    unidades: document.getElementById("unidades").value,
                    ladosImpressao: document.getElementById("ladosImpressao").value,
                })], { type: "application/json" }));

                // Adiciona o arquivo ao formData, caso ele tenha sido selecionado
                const fileInput = document.getElementById("formFile");
                if (fileInput.files.length > 0) {
                    formData.append("file", fileInput.files[0]);
                }

                try {
                    // Envio da requisição PUT
                    const response = await fetch(`http://localhost:8080/print/${impressaoData.id}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (response.ok) {
                        alert("Impressão atualizada com sucesso!");
                    } else {
                        alert("Erro ao atualizar a impressão.");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao enviar os dados.");
                }
            };
        }
    };
}

if (impressaoData.produto == "Fotografias") {
    window.onload = () => {
        if (impressaoData) {
            // Cria o formulário dinamicamente
            const formHTML = `
            <form id="updatePrintForm" class="row mb-4 justify-content-center p-3 border rounded">
                <div class="row mb-2 mt-3">
                    <div class="col-12">
                        <div class="form-floating">
                            <select class="form-select" id="materialImpressao" aria-label="Material da impressão"
                                name="materialImpressao" required>
                                <option value="Papel sulfite 90g">Papel sulfite 90g</option>
                                <option value="Papel sulfite 75g">Papel sulfite 75g</option>
                                <option value="Papel sulfite 120g">Papel sulfite 120g</option>
                                <option value="Papel monolúcido 90g">Papel monolúcido 90g</option>
                                <option value="Papel fotográfico auto adesivo 130g">Papel fotográfico auto
                                    adesivo 130g</option>
                                <option value="Papel fotográfico 180g">Papel fotográfico 180g</option>
                                <option value="Papel offset 180g">Papel offset 180g</option>
                                <option value="Papel opaline 240g">Papel opaline 240g</option>
                                <option value="Papel fotográfico dupla face 180g">Papel fotográfico dupla
                                    face
                                    180g</option>
                            </select>
                            <label for="materialImpressao">Material</label>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-floating mb-2">
                            <input type="number" min="1" class="form-control" name="unidades" id="unidades" placeholder=" "
                                required>
                            <label for="unidades">Quantidade de cópias</label>
                        </div>
                    </div>
                    <div class="col-6 justify-content-center">
                        <div class="form-floating">
                            <select class="form-select" id="ladosImpressap" aria-label="Lados impressos"
                                name="ladosImpressap" required>
                                <option value="Frente e verso">Frente e verso</option>
                                <option value="Frente">Frente</option>
                            </select>
                            <label for="ladosImpressap">Lados impressos</label>
                        </div>
                    </div>
                </div>

                <div class="mb-3 text-center justify-content-center">
                    <label for="formFile" class="form-label">Arquivo para impressão</label>
                    <input class="form-control" type="file" id="formFile" name="arquivo">
                </div>

                <div class="row justify-content-center text-center">
                    <div class="col-12 justify-content-center text-center">
                        <button type="submit" class="btn btn-primary w-50">Enviar</button>
                    </div>
                </div>
            </form>`;

            // Insere o formulário no container específico
            document.getElementById("updatePrint").innerHTML = formHTML;

            // Preenche os campos do formulário com os valores do objeto
            document.getElementById("materialImpressao").value = impressaoData.materialImpressao;
            document.getElementById("unidades").value = impressaoData.unidades;
            document.getElementById("ladosImpressap").value = impressaoData.ladosImpressao

            if (impressaoData.arquivoImpressao) {
                const fileLink = document.createElement("a");
                fileLink.href = "http://localhost:8080" + impressaoData.arquivoImpressao;
                fileLink.target = "_blank";
                fileLink.textContent = "Clique aqui para acessar o arquivo";
                fileLink.classList.add("btn", "btn-link", "mt-2");

                document.getElementById("formFile").insertAdjacentElement("afterend", fileLink);
            }

            // Envio do formulário
            const form = document.getElementById("updatePrintForm");
            form.onsubmit = async (event) => {
                event.preventDefault(); // Evita o reload da página

                // Cria um objeto FormData para envio multipart
                const formData = new FormData();
                formData.append("dados", new Blob([JSON.stringify({
                    materialImpressao: document.getElementById("materialImpressao").value,
                    unidades: document.getElementById("unidades").value,
                    ladosImpressao: document.getElementById("ladosImpressap").value,
                })], { type: "application/json" }));

                // Adiciona o arquivo ao formData, caso ele tenha sido selecionado
                const fileInput = document.getElementById("formFile");
                if (fileInput.files.length > 0) {
                    formData.append("file", fileInput.files[0]);
                }

                try {
                    // Envio da requisição PUT
                    const response = await fetch(`http://localhost:8080/print/${impressaoData.id}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (response.ok) {
                        alert("Impressão atualizada com sucesso!");
                    } else {
                        alert("Erro ao atualizar a impressão.");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao enviar os dados.");
                }
            };
        }
    };
}


