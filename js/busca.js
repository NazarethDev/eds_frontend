document.getElementById('form-busca').addEventListener('submit', function (e) {
    e.preventDefault(); // impede o envio padrão

    const valorBusca = document.getElementById('input-busca').value.trim();
    let url = '';

    if (valorBusca.includes('@')) {
        url = `http://localhost:8080/search?email=${encodeURIComponent(valorBusca)}`;
    } else {
        url = `http://localhost:8080/search?contato=${encodeURIComponent(valorBusca)}`;
    }

    // Chamada da API para buscar dados
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Erro na requisição');
            return res.json();
        })
        .then(data => {
            // salva o resultado temporariamente
            localStorage.setItem('resultadoBusca', JSON.stringify(data));
            // redireciona para a página de resultado
            window.location.href = 'resultadoBusca.html';
        })
        .catch(err => {
            alert('Erro ao buscar dados: ' + err.message);
        });
});
