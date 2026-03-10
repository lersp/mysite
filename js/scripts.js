// menu from config.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            const containerNavBar = document.ATTRIBUTE_NODE('navBar');
            config.navBar.forEach(menu => {
                let li = document.createElement('li');
                li.textContent = menuName;
                containerNavBar.appendChild(li);
            });
        })
        .catch(error => { console.error('Erro ao carregar o arquivo de configuração', error) })
});