window.addEventListener("DOMContentLoaded", (event) => {
    // Recupera o objeto software do sessionStorage
    const software = JSON.parse(sessionStorage.getItem("softwareAtualizacao"));

    if (software) {
        console.log("Objeto recuperado do sessionStorage:", software);

        // Preenche os campos do formulário
        document.querySelector(`#selectDispositivo option[value="${software.dispositivo}"]`).selected = true;
        document.getElementById("floatingInput").value = software.tempoUso;
        document.querySelector(`#selectFabricante option[value="${software.fabricante}"]`).selected = true;

        software.servicos.forEach((servico) => {
            const checkbox = document.querySelector(`input[name="servicos[]"][value="${servico}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });

        // Preenchendo o campo de texto de detalhes do serviço
        document.getElementById("exampleFormControlTextarea1").value = software.detalhesServico;
        console.log("Valor preenchido no campo de detalhes do serviço:", document.getElementById("exampleFormControlTextarea1").value);
    }

    // Captura o evento de submissão do formulário
    const form = document.getElementById("formularioServicoSoftware");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Coleta os dados do formulário
        const id = software.id;
        const dispositivo = document.getElementById("selectDispositivo").value;
        const tempoUso = document.getElementById("floatingInput").value;
        const fabricante = document.getElementById("selectFabricante").value;
        const detalhesServico = document.getElementById("exampleFormControlTextarea1").value;

        console.log("Dados coletados do formulário:");
        console.log("Dispositivo:", dispositivo);
        console.log("Tempo de Uso:", tempoUso);
        console.log("Fabricante:", fabricante);
        console.log("Detalhes do Serviço:", detalhesServico);

        // Captura os serviços selecionados
        const servicos = Array.from(document.querySelectorAll('input[name="servicos[]"]:checked'))
            .map((checkbox) => checkbox.value);

        console.log("Serviços selecionados:", servicos);

        // Monta o objeto para envio
        const data = {
            dispositivo,
            tempoUso,
            fabricante,
            detalhesServico,  // Corrigido aqui para não ter diferença no nome
            servicos
        };

        console.log("Objeto montado para envio:", data);

        try {
            const response = await fetch(`http://localhost:8080/software/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Dados atualizados com sucesso!");
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro de conexão com o servidor:", error);
            alert("Erro de conexão com o servidor.");
        }
    });
});
