// menu from config.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            //titulo site (meta) ## funcionou ##
            const projetoPrincipal = config.projetos[0];
            document.getElementById('site-title').textContent = projetoPrincipal.titulo;

            // menu ## nao funciona ##
            const contNavBar = document.getElementById('navBar');
            config.navBar.forEach(menu => {
                contNavBar.innerHTML = `
                    <a href="#${menu.menuName}">${menu.menuName}</a>
                `;
            });
        })
        .catch(err => {
            console.error('Erro ao carregar o arquivo de configuração:', err);
        });
});