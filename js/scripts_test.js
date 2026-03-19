document.addEventListener("DOMContentLoaded", () => {
  // Carrega os arquivos de configuração e dados em paralelo para mais eficiência.
  Promise.all([
    fetch("config.json").then((response) => response.json()),
    fetch("data.json").then((response) => response.json()),
  ])
    .then(([config, data]) => {
      // ####### Inicio carregar dados do config.json #######

      // Define o título do site.
      document.getElementById("site-title").textContent = config.title;

      // Gera o menu de navegação dinamicamente, iterando sobre o array.
      const navBarContainer = document.getElementById("navBar");
      navBarContainer.innerHTML = config.navBar
        .map((item) => `
            <li class="nav-item">
              <a href="${item.target}" class="nav-link">${item.label}</a>
            </li>`)
        .join("");
      // ####### fim dados config.json #######
      // ####### Inicio carregar dados do data.json #######
      const { perfil } = data;

      // Seção #home
      document.getElementById("nome").textContent = perfil.nome;
      document.getElementById("titulo").textContent = perfil.titulo;
      document.getElementById("resumo").textContent = perfil.resumo;

      // Seção #about
      // Pessoal & hobbies
      const hobbiesList = document.getElementById("lista-personal");
      hobbiesList.innerHTML = perfil.hobbies
        .map((hobby) => `<li>${hobby}</li>`)
        .join("");

      // Tecnologia & Habilidades
      const techList = document.getElementById("lista-tech");
      const allSkills = [
        ...perfil.competencias.especialidades,
        ...perfil.competencias.tecnicas,
      ];
      const uniqueSkills = [...new Set(allSkills)]; // Remove duplicatas
      techList.innerHTML = uniqueSkills
        .map((skill) => `<li>${skill}</li>`)
        .join("");
      
      // Formação e certificações
      const studyList = document.getElementById("lista-study");
      const formacaoHtml = perfil.formacao
        .map(
          (f) =>
            `<li><b>${f.curso}</b> - ${f.instituicao} (${f.periodo || "Previsão: " + f.previsao_conclusao})</li>`,
        )
        .join("");
      const certsHtml = perfil.certificacoes
        .map((c) => `<li>${c}</li>`)
        .join("");
      studyList.innerHTML = formacaoHtml + certsHtml;

      const idiomList = document.getElementById("lista-idiom");
      idiomList.innerHTML = perfil.idiomas
        .map((i) => `<li><b>${i.idioma}:</b> ${i.nivel}</li>`)
        .join("");

      // Seção #work 
      /*
      const expList = document.getElementById("lista-exp");
      perfil.experiencia.forEach((exp) => {
        const expDiv = document.createElement("div");
        let content = `<h4 class="job-title">${exp.cargo || ""}<span class="job-title-junction"> na </span> ${exp.empresa}</h4>`;

        if (exp.periodo) {
          content += `<p><em>${exp.periodo}</em></p>`;
        }
        if (exp.descricao) {
          content += `<p>${exp.descricao}</p>`;
        }

        if (exp.historico) {
          content += "<ul>";
          exp.historico.forEach((h) => {
            content += `
                        <li>
                            <h5 class="job-title">${h.cargo} <span class="job-title-junction">(${h.periodo})</span></h5>
                            ${h.descricao ? `<p>${h.descricao}</p>` : ""}
                        </li>
                    `;
          });
          content += "</ul>";
        }

        expDiv.innerHTML = content;
        expList.appendChild(expDiv);
      });

      const containerProjetos = document.getElementById("lista-projetos");
      perfil.projetos.forEach((proj) => {
        const div = document.createElement("div");
        div.className = "projeto-card";
        div.innerHTML = `
                <h4>${proj.titulo}</h4>
                <p>${proj.descricao}</p>
                <div class="tech-tags">
                    ${proj.tecnologias.map((t) => `<span class="badge">${t}</span>`).join("")}
                </div>
                <a href="${proj.link}" target="_blank" class="btn-projeto">Ver projeto</a>
            `;
        containerProjetos.appendChild(div);
      });
      */

      // Seção #contact
      const redes = perfil.contato;
      const contArea = document.getElementById("social-links");
      contArea.innerHTML = `
            <a href="mailto:${redes.email}" target="_blank"><span><i class="fa-brands fa-youtube">Email</i></span></a> | 
            <a href="${redes.linkedin}" target="_blank"><span><i class="fa-brands fa-youtube">LinkedIn</i></span></a> | 
            <a href="${redes.github}" target="_blank"><span><i class="fa-brands fa-youtube">GitHub</i></span></a> | 
            <a href="${redes.youtube}" target="_blank">YouTube</a>
        `;

      // --- Lógica para animação de Fade-in ao rolar a página ---
      const sections = document.querySelectorAll("section");

      const observerOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: "0px",
        threshold: 0.1, // A animação dispara quando 10% da seção está visível
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // Se a seção está visível na tela
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Anima apenas uma vez
          }
        });
      }, observerOptions);

      // Inicia a observação para cada seção
      sections.forEach((section) => {
        observer.observe(section);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os arquivos de dados:", error);
      // Opcional: Exibir uma mensagem de erro para o usuário na página.
      const body = document.querySelector("body");
      body.innerHTML = `<div style="text-align: center; padding: 40px; font-family: sans-serif;"><h1>Erro ao carregar o conteúdo</h1><p>Não foi possível carregar as informações do site. Tente novamente mais tarde.</p></div>`;
    });
});
