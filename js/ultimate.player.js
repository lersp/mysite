const player = document.getElementById('videoMaster');
const gallery = document.getElementById('gallery');

async function initGallery() {
    try {
        const response = await fetch('lives.txt');
        const data = await response.text();

        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line,index) => {
            const [id,title] = line.split(',');
            const cleanID = id.trim();
            if (index === 0) card.classList.add('active');

            card.innerHTML = `
                <img class="thumb-preview" src="https://img.youtube.com{cleanID}/mqdefault.jpg" alt="Thumb">
                <span class="video-title">${cleanTitle}</span>
            `;

        })
    }
}