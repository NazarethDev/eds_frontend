document.getElementById("formularioImpressao").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede envio padrão

    const form = event.target;
    const formData = new FormData();

    // Captura os valores do formulário
    const dadosImpressao = {
        nomeCliente: form.nomeCliente.value.trim(),
        contatoCliente: form.contatoCliente.value.trim(),
        contatoAlternativoCliente: form.contatoAlternativo.value.trim(),
        emailCliente: form.emailCliente.value.trim(),
        cpf: form.cpf.value.trim(),
        materialImpressao: form.materialImpressao.value,
        unidades: parseInt(form.unidades.value),
        ladosImpressao: form.ladosImpressao.value,
        coresImpressao: "colorido",
        produto: form.produto.value
    };

    // Adiciona o JSON como campo textual "data"
    formData.append("data", new Blob([JSON.stringify(dadosImpressao)], {
        type: "application/json"
    }));

    // Adiciona o arquivo
    const arquivo = form.formFile.files[0];
    if (arquivo) {
        formData.append("arquivo", arquivo);
    }

    try {
        const response = await fetch("http://localhost:8080/print", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Formulário enviado com sucesso!");
            form.reset();
        } else {
            const msg = await response.text();
            alert("Erro ao enviar: " + msg);
        }
    } catch (error) {
        alert("Erro ao enviar: " + error.message);
    }
});