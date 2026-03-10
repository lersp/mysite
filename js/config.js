document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            document.getElementById('nome').textContent = config.perfil.nome;
            document.getElementById('cargo').textContent = config.perfil.cargo;

            const lista = document.getElementById('lista-tech');
            config.tecnologias.forEach(tech => {
                let li = document.createElement('li');
                li.textContent = tech;
                lista.appendChild(li);
            });

        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo de configuração:', error);
        });
});

//