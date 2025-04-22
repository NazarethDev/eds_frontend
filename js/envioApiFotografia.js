document.getElementById('formularioImpressao').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Monta o objeto com os dados
    const data = {
        nomeCliente: form.nomeCliente.value,
        contatoCliente: form.contatoCliente.value,
        contatoAlternativoCliente: form.contatoAlternativo.value,
        emailCliente: form.emailCliente.value,
        cpf: form.cpf.value || "não informado",
        materialImpressao: form.materialImpressao.value,
        unidades: parseInt(form.unidades.value),
        ladosImpressao: form.ladosImpressap.value,
        coresImpressao: "colorido", 
        produto: "Fotografias" 
    };

    // Adiciona o JSON ao FormData
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    // Adiciona o arquivo
    const arquivo = document.getElementById("formFile").files[0];
    if (arquivo) {
        formData.append("arquivo", arquivo);
    }

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        alert("Impressão enviada com sucesso!");
        console.log(result);
    } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar: " + error.message);
    }
});