// Função para preencher os campos do formulário com os dados armazenados no sessionStorage
window.addEventListener("DOMContentLoaded", () => {
    // Recupera os dados do sessionStorage
    const designData = JSON.parse(sessionStorage.getItem("designAtualizacao"));

    // Verifica se os dados estão presentes
    if (designData) {
        // Preencher os campos com os dados do objeto
        document.getElementById("materialImpressao").value = designData.materialImpressao;
        document.getElementById("produto").value = designData.produto;
        document.getElementById("unidades").value = designData.unidades;
        document.getElementById("descricao").value = designData.ideiasDesign;

        // Se o arquivo de referência estiver presente, criar o link para ele
        if (designData.arquivoReferencia) {
            const fileLink = document.createElement("a");
            fileLink.href = designData.arquivoReferencia;
            fileLink.textContent = "Arquivo de referência: Clique para visualizar";
            fileLink.target = "_blank";
            fileLink.classList.add("d-block", "mt-2");

            // Inserir o link logo após o campo de arquivo
            const fileInput = document.getElementById("formFile");
            fileInput.insertAdjacentElement('afterend', fileLink);
        }
    }

    // Adiciona o evento de submit para enviar os dados
    const form = document.getElementById("atualizacaoCriacaoDesign");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            // Criação do objeto FormData
            const formData = new FormData();
            
            // Criação do objeto JSON com os dados do formulário
            const updateData = {
                ideiasDesign: document.getElementById("descricao").value,
                novosDadosImpressao : {
                    materialImpressao: document.getElementById("materialImpressao").value,
                    produto: document.getElementById("produto").value,
                    unidades: document.getElementById("unidades").value,
                }

            };

            // Adiciona o JSON ao FormData
            formData.append("data", new Blob([JSON.stringify(updateData)], {
                type: 'application/json'
            }));

            // Verifica se um arquivo novo foi selecionado
            const arquivoInput = document.getElementById("formFile");
            if (arquivoInput.files.length > 0) {
                formData.append("file", arquivoInput.files[0]);
            }

            // Envia o PUT para a API
            const response = await fetch(`http://localhost:8080/design/${designData.id}`, {
                method: "PUT",
                body: formData
            });

            // Tratamento da resposta
            if (response.ok) {
                alert("Atualização realizada com sucesso!");
            } else {
                const errorData = await response.json();
                alert(`Erro ao atualizar os dados: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com o servidor.");
        }
    });
});

