
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('button[type="submit"]');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        function getValue(selector) {
            const element = document.querySelector(selector);
            return element ? element.value.trim() : null;
        }

        function getCheckedValue(name) {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            return checked ? checked.value : null;
        }

        function getCheckedValues(name) {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                        .map(el => el.value);
        }

        function formatDate(isoDate) {
            if (!isoDate) return null;
            const [year, month, day] = isoDate.split('-');
            return `${day}/${month}/${year}`;
        }

        const requestBody = {
            nomeCliente: getValue('input[name="nomeCliente"]'),
            contatoCliente: getValue('input[name="contatoCliente"]'),
            emailCliente: getValue('input[name="contatoCliente"]'),
            contatoAlternativoCliente: getValue('input[name="contatoAlternativo"]'),
            cpf: getValue('input[name="cpf"]') || null,
            detalhesServico: getValue('textarea[name="detalhesServico"]'),
            dispositivo: getValue('select[name="dispositivo"]'),
            servicos: getCheckedValues('servicos[]'),
            tempoUso: getValue('input[name="tempoUso"]'),
            fabricante: getValue('select[name="fabricante"]'),

            domicilio: {
                logradouro: getValue('input[name="logradouro"]'),
                numeroCasa: getValue('input[name="numeroCasa"]'),
                cep: getValue('input[name="cep"]'),
                complemento: getValue('input[name="complemento"]'),
                periodo: getCheckedValue('domicilio.periodo'),
                data: formatDate(getValue('input[name="domicilio.data"]'))
            }
        };

        fetch('http://localhost:8080/software', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                alert('Formulário enviado com sucesso!');
                 window.location.reload(); // se quiser limpar
            } else {
                return response.text().then(text => {
                    throw new Error('Erro ao enviar: ' + text);
                });
            }
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao enviar o formulário.');
        });
    });
});

