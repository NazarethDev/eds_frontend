document.getElementById('formularioImpressao').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;

    const dadosImpressao = {
        nomeCliente: form.nomeCliente.value,
        contatoCliente: form.contatoCliente.value,
        contatoAlternativoCliente: form.contatoAlternativo.value,
        emailCliente: form.emailCliente.value.trim(),
        cpf: form.cpf.value,
        materialImpressao: form.materialImpressao.value,
        unidades: parseInt(form.unidades.value),
        ladosImpressao: form.ladosImpressao.value,
        coresImpressao: form.coresImpressao ? form.coresImpressao.value : "colorido", // <- Verifique se existe um campo para isso
        produto: form.produto.value
    };

    const payload = {
        ideiasDesign: form.descricao.value,
        dadosImpressao: dadosImpressao
    };

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    formData.append("arquivo", form.arquivo.files[0] || new Blob());

    try {
        const response = await fetch("http://localhost:8080/design", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Enviado com sucesso!");
            form.reset();
        } else {
            const errorText = await response.text();
            console.error("Erro na requisição:", errorText);
            alert("Erro ao enviar: " + errorText);
        }
    } catch (error) {
        console.error("Erro geral:", error);
        alert("Erro ao enviar os dados.");
    }
});
