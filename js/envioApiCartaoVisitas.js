document.getElementById("formularioImpressao").addEventListener("submit", async function (event) {
    event.preventDefault(); // impede o envio padrão
  
    const form = event.target;
    const formData = new FormData();
  
    // Monta objeto JavaScript com os dados do formulário
    const novaImpressao = {
      nomeCliente: form.nomeCliente.value,
      contatoCliente: form.contatoCliente.value,
      contatoAlternativoCliente: form.contatoAlternativo.value,
      emailCliente: form.emailCliente.value,
      cpf: form.cpf.value,
      materialImpressao: form.materialImpressao.value,
      unidades: parseInt(form.unidades.value),
      ladosImpressao: form.ladosImpressao.value,
      coresImpressao: form.corImpressao.value,
      produto: "Cartão de visitas"
    };
  
    // Anexa o JSON como string no campo "data"
    formData.append("data", new Blob([JSON.stringify(novaImpressao)], { type: "application/json" }));
  
    // Anexa o arquivo (se houver)
    const arquivo = form.arquivo.files[0];
    if (arquivo) {
      formData.append("arquivo", arquivo);
    }
  
    try {
      // Envia o FormData para o backend
      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });
  
      if (response.ok) {
        alert("Impressão enviada com sucesso!");
        form.reset();
      } else {
        const error = await response.text();
        console.error("Erro:", error);
        alert("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de rede ao tentar enviar o formulário.");
    }
  });
  