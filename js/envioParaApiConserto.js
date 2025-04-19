document.getElementById("formularioServicoSoftware").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede envio tradicional

    const form = event.target;

    // Captura o arquivo, se existir
    const arquivo = form.querySelector("input[name='arquivo']").files[0];

    // Cria o objeto JSON com os dados esperados
    const jsonData = {
        nomeCliente: form.nomeCliente.value,
        contatoCliente: form.contatoCliente.value,
        contatoAlternativoCliente: form.contatoAlternativo.value,
        emailCliente: form.emailCliente.value,
        cpf: form.cpf.value,
        descricaoProblema: form.descricaoProblema.value,
        tempoDeUso: form.tempoDeUso.value,
        tipoAparelho: form.tipoAparelho.value,
        fabricante: form.fabricante.value,
        domiciliar: {
            logradouro: form["domicilio.logradouro"].value,
            numeroCasa: form["domicilio.numeroCasa"].value,
            cep: form["domicilio.cep"].value,
            complemento: form["domicilio.complemento"].value,
            periodo: form.querySelector("input[name='domicilio.periodo']:checked")?.value,
            dataVisita: form.querySelector("#data")?.value
        }
    };

    // Cria um FormData e anexa o JSON e o arquivo
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));
    if (arquivo) {
        formData.append("arquivo", arquivo);
    }

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Pedido de conserto enviado com sucesso!");
            form.reset();
        } else {
            const error = await response.text();
            console.error("Erro:", error);
            alert("Erro ao enviar. Veja o console para detalhes.");
        }
    } catch (err) {
        console.error("Erro de rede:", err);
        alert("Erro de rede ao enviar o formulário.");
    }
});