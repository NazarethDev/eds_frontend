document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    const dadosLogin = {
        email: email,
        senha: senha
    };

    try {
        const response = await fetch("https://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        if (!response.ok) {
            throw new Error("Falha no login" + response.status);
        }

        const data = await response.json();
        const token = data.token;

        sessionStorage.setItem("token", token);

        window.location.href = "statusPedidos.html";
    } catch (error) {
        alert("Erro ao realizar login: " + error.message);
    }
});