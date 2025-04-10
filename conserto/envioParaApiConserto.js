document.getElementById('formularioServicoSoftware').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData();

    const novoConserto = {
      nomeCliente: form.nomeCliente.value,
      contatoCliente: form.contatoCliente.value,
      emailCliente: form.emailCliente.value,
      contatoAlternativo: form.contatoAlternativo.value,
      cpf: form.cpf.value,
      domicilio: {
        logradouro: form['domicilio.logradouro'].value,
        numeroCasa: form['domicilio.numeroCasa'].value,
        cep: form.querySelector('[name="domicilio.cep"]').value,
        complemento: form.querySelector('[name="domicilio.complemento"]').value,
        data: form['domicilio.data'].value,
        periodo: form.querySelector('input[name="domicilio.periodo"]:checked').value
      },
      tipoAparelho: form.tipoAparelho.value,
      tempoDeUso: form.tempoDeUso.value,
      fabricante: form.fabricante.value,
      descricaoProblema: form.descricaoProblema.value
    };

    formData.append('data', new Blob([JSON.stringify(novoConserto)], { type: 'application/json' }));

    const arquivoInput = form.querySelector('input[name="arquivo"]');
    if (arquivoInput.files.length > 0) {
      formData.append('arquivo', arquivoInput.files[0]);
    }

    try {
      const response = await fetch('http://localhost:8080/conserto', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Conserto registrado com sucesso!');
        form.reset();
      } else {
        const err = await response.text();
        alert('Erro ao registrar conserto: ' + err);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro inesperado: ' + error.message);
    }
  });