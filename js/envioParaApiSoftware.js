
document.getElementById('formularioServicoSoftware').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;

    const getValue = name => form.querySelector(`[name="${name}"]`)?.value || '';

    const servicosSelecionados = [...form.querySelectorAll('input[name="servicos[]"]:checked')]
        .map(cb => cb.value);

    const periodoSelecionado = form.querySelector('input[name="domicilio.periodo"]:checked')?.value || null;
    const dataSelecionada = document.getElementById('data')?.value || null;

    const payload = {
        nomeCliente: getValue('nomeCliente'),
        contatoCliente: getValue('contatoCliente'),
        contatoAlternativoCliente: getValue('contatoAlternativo'),
        emailCliente: getValue('emailCliente'),
        cpf: getValue('cpf'),
        detalhesServico: getValue('detalhesServico'),
        dispositivo: getValue('dispositivo'),
        servicos: servicosSelecionados,
        tempoUso: getValue('tempoUso'),
        domicilio: {
            logradouro: getValue('domicilio.logradouro'),
            numeroCasa: getValue('domicilio.numeroCasa'),
            cep: getValue('domicilio.cep'),
            complemento: getValue('domicilio.complemento'),
            periodo: periodoSelecionado,
            data: dataSelecionada
        },
        fabricante: getValue('fabricante')
    };

    try {
        const response = await fetch('http://localhost:8080/software', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Serviço enviado com sucesso!');
            form.reset();
        } else {
            const errorData = await response.json();
            console.error('Erro ao enviar:', errorData);
            alert('Erro ao enviar serviço. Verifique os dados.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor.');
    }
});