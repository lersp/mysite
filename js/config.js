// menu from config.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            //titulo site (meta)
            const projetoPrincipal = config.projetos[0];
            document.getElementById('site-title').textContent = projetoPrincipal.titulo;
            
            // menu
            const containerNavBar = document.getElementById('navBar');
            config.navBar.forEach(menu => {
                let li = document.createElement('li');
                li.textContent = menuName;
                containerNavBar.appendChild(li);
            });
        })
        .catch(error => { console.error('Erro ao carregar o arquivo de configuração', error) })
});