document.getElementById("formularioImpressao").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita o reload da página

        // Captura os valores do formulário
        const nomeCliente = document.getElementById("nomeCliente").value;
        const contatoCliente = document.getElementById("contatoCliente").value;
        const contatoAlternativoCliente = document.getElementById("contatoAlternativo").value;
        const emailCliente = document.getElementById("emailCliente").value;
        const cpf = document.getElementById("cpfCliente").value;
        const produto = document.getElementById("produto").value;
        const unidades = parseInt(document.getElementById("unidades").value);
        const coresImpressao = document.getElementById("corImpressao").value;
        const arquivo = document.getElementById("formFile").files[0];

        // Criação do objeto de dados (DTO)
        const novaImpressao = {
            nomeCliente,
            contatoCliente,
            contatoAlternativoCliente,
            emailCliente,
            cpf,
            produto,
            unidades,
            coresImpressao,
            materialImpressao: "Papel fotográfico 180g",
            ladosImpressao: null     
        };

        // Preparação do FormData para envio multipart
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(novaImpressao)], {
            type: "application/json"
        }));
        formData.append("arquivo", arquivo);

        try {
            const response = await fetch("http://localhost:8080/print", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                alert("Impressão cadastrada com sucesso!");
                console.log(result);
            } else {
                const errorData = await response.json();
                alert("Erro ao cadastrar impressão.");
                console.error(errorData);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Não foi possível se conectar ao servidor.");
        }
    });