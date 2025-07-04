    // Função para capturar os dados modificados do formulário e retornar o FormData
    const capturarDadosAtualizados = (consertoData) => {
        const formData = new FormData();

        const updateData = {
            nomeCliente: consertoData.cliente.nomeCliente,
            contatoCliente: consertoData.cliente.contatoCliente,
            descricaoProblema: document.getElementById("exampleFormControlTextarea1").value,
            tempoDeUso: document.getElementById("floatingInput").value,
            tipoAparelho: document.querySelector(`#floatingSelect[name="tipoAparelho"]`).value,
            fabricante: document.querySelector(`#floatingSelect[name="fabricante"]`).value
        };

        console.log("Dados a serem enviados:", updateData);

        // Adiciona o objeto JSON ao FormData
        formData.append("dados", new Blob([JSON.stringify(updateData)], {
            type: 'application/json'
        }));

        // Verifica se um novo arquivo foi selecionado
        const arquivoInput = document.getElementById("formFileDisabled");
        if (arquivoInput.files.length > 0) {
            formData.append("arquivo", arquivoInput.files[0]);
        }

        return formData;
    };

    // Evento de carregamento da página
    window.addEventListener("DOMContentLoaded", (event) => {
        const consertoData = JSON.parse(sessionStorage.getItem("consertoAtualizacao"));

        if (consertoData) {
            // Preenche os campos corretamente
            document.querySelector(`select[name="tipoAparelho"] option[value="${consertoData.tipoAparelho}"]`).selected = true;
            document.getElementById("floatingInput").value = consertoData.tempoDeUso;
            document.querySelector(`select[name="fabricante"] option[value="${consertoData.fabricante}"]`).selected = true;
            document.getElementById("exampleFormControlTextarea1").value = consertoData.descricaoProblema;

            if (consertoData.arquivo) {
                const fileInput = document.getElementById("formFileDisabled");

                const fileLink = document.createElement("a");
                fileLink.href = consertoData.arquivo;
                fileLink.textContent = "Arquivo Atual: Clique para acessar";
                fileLink.target = "_blank";
                fileLink.classList.add("d-block", "mt-2");

                fileInput.insertAdjacentElement('afterend', fileLink);
            }
        }

        // Submissão do formulário
        const form = document.getElementById("formAtualizacaoConserto"); // <---- Aqui é necessário um ID no form!
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log("Submissão iniciada...");

            try {
                const formData = capturarDadosAtualizados(consertoData);

                // Realiza o PUT para a API
                const response = await fetch(`http://localhost:8080/conserto/${consertoData.id}`, {
                    method: "PUT",
                    body: formData
                });

                if (response.ok) {
                    console.log("Resposta da API:", await response.json());
                    alert("Atualização realizada com sucesso!");
                } else {
                    console.error("Erro na resposta da API:", response.status, response.statusText);
                    alert("Erro ao atualizar os dados.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro de conexão.");
            }
        });
    });