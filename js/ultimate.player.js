const player = document.getElementById('videoMaster');
const gallery = document.getElementById('gallery');

async function initGallery() {
    try {
        const response = await fetch(`lives.txt?v=${new Date().getTime()}`);
        const data = await response.text();

        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line, index) => {
            const [id, title] = line.split(',');
            const cleanID = id.trim();
            const cleanTitle = title ? title.trim() : `Live ${index + 1}`;

            // criar o card
            const card = document.createElement('div');
            card.className = 'video-card';
            if (index === 0) card.classList.add('active');

            card.innerHTML = `
                <img class="thumb-preview" src="https://img.youtube.com{cleanID}/mqdefault.jpg" alt="Thumb">
                <span class="video-title">${cleanTitle}</span>
            `;

            card.onclick = () => {
                updatePlayer(cleanID);

                document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            };

            gallery.appendChild(card);

            if (index === 0) updatePlayer(cleanID);
        });
    } catch (err) {
        console.error("Erro crítico:", err);
        gallery.innerHTML = "<p>⚠️ Use o Live Server para carregar o arquivo .txt";
    }
}

function updatePlayer(id) {
    player.src = `https://www.youtube.com{id}?autoplay=1&mute=1&enablejsapi=1`
}

initGallery();