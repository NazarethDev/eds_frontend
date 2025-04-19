document.getElementById("formularioImpressao").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita envio padrão do form

    const form = event.target;
    const formData = new FormData();

    // Montando o objeto do DTO
    const dadosImpressao = {
        nomeCliente: form.nomeCliente.value.trim(),
        contatoCliente: form.contatoCliente.value.trim(),
        contatoAlternativoCliente: form.contatoAlternativo.value.trim(),
        emailCliente: form.emailCliente.value.trim(),
        cpf: form.cpf.value.trim(),

        materialImpressao: form.materialImpressao.value,
        unidades: parseInt(form.unidades.value),
        ladosImpressao: form.ladosImpressap.value,
        coresImpressao: form.coresImpressao.value,
        produto: "Folhas avulsas" // Valor fixo, pois o campo é obrigatório no DTO
    };

    // Enviando o JSON como blob no campo "data"
    formData.append("data", new Blob([JSON.stringify(dadosImpressao)], {
        type: "application/json"
    }));

    // Pegando o arquivo (se houver)
    const arquivo = form.formFile.files[0];
    if (arquivo) {
        formData.append("arquivo", arquivo);
    }

    try {
        const response = await fetch(form.action, {
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