document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            //perfil
            document.getElementById('nome').textContent = data.perfil.nome;
            document.getElementById('titulo').textContent = data.perfil.titulo;
            document.getElementById('resumo').textContent = data.perfil.resumo;

            //tecnologias
            const lista = document.getElementById('lista-tech');
            data.tecnologias.forEach(tech => {
                let li = document.createElement('li');
                li.textContent = tech;
                lista.appendChild(li);
            });

            //projetos
            const containerProjetos = document.getElementById('lista-projetos');
            data.projetos.forEach(proj => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <h4>${proj.titulo}</h4>
                    <p>${proj.descricao}</p>
                    <p>Techs: ${proj.tecnologias.join(', ')}</p>
                    <a href="${proj.link}" target="_blank">Ver projeto</a>
                `;
                containerProjetos.appendChild(div);
            });
                

        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo de configuração:', error);
        });
});

//