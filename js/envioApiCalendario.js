document.getElementById("formularioImpressao").addEventListener("submit", async function (event) {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData();

  var erroComEnum = "Material indefinido"

  const novaImpressao = {
      nomeCliente: form.nomeCliente.value,
      contatoCliente: form.contatoCliente.value,
      contatoAlternativoCliente: form.contatoAlternativo.value,
      emailCliente: form.emailCliente.value,
      cpf: form.cpf.value,
      materialImpressao: "Papel fotográfico 180g",
      unidades: parseInt(form.unidades.value),
      ladosImpressao: null,
      coresImpressao: form.corImpressao.value,
      produto: form.produto.value
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(novaImpressao)], { type: "application/json" })
  );
  
  const arquivo = form.arquivo.files[0];
  if (arquivo) {
      formData.append("arquivo", arquivo);
  }

  try {
    console.log("Enviando:", JSON.stringify(novaImpressao, null, 2));
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