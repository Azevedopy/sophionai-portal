// js/player.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Identificar qual aula carregar (via URL)
    const urlParams = new URLSearchParams(window.location.search);
    let aulaId = urlParams.get('aula');

    // Se não tiver ID na URL, pega a aula atual (em andamento) ou a primeira
    if (!aulaId) {
        const aulaAtual = cursoData.aulas.find(a => a.status === 'atual') || cursoData.aulas[0];
        aulaId = aulaAtual.id;
    }

    const currentIndex = cursoData.aulas.findIndex(a => a.id === aulaId);
    if (currentIndex === -1) return; // Aula não encontrada

    const aula = cursoData.aulas[currentIndex];

    // 2. Atualizar o DOM
    // Título e Descrição
    document.getElementById('aula-titulo').innerHTML = `${cursoData.titulo} - ${aula.titulo}`;
    document.getElementById('aula-descricao').innerHTML = aula.descricao;

    // Vídeo
    const videoContainer = document.getElementById('video-container');
    if (aula.status === 'bloqueada') {
        videoContainer.innerHTML = `
            <div class="video-placeholder" style="cursor: default;">
                <i class="fas fa-lock" style="font-size: 3rem;"></i>
                <h3 style="font-weight: 500; margin-top: 10px;">Aula Bloqueada</h3>
                <p style="font-size: 0.9rem; margin-top: 10px; text-align: center; max-width: 80%;">Conclua as aulas anteriores para liberar este conteúdo.</p>
            </div>
        `;
    } else if (aula.videoUrl) {
        // Verifica se é um vídeo local (.mp4) ou link externo (YouTube/Vimeo)
        if (aula.videoUrl.endsWith('.mp4') || aula.videoUrl.endsWith('.webm')) {
            videoContainer.innerHTML = `
                <video 
                    width="100%" 
                    height="100%" 
                    controls
                    controlsList="nodownload"
                    style="position: absolute; top: 0; left: 0; border-radius: 20px; background: black; object-fit: cover;">
                    <source src="${aula.videoUrl}" type="video/mp4">
                    Seu navegador não suporta a exibição de vídeos.
                </video>
            `;
        } else {
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${aula.videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="position: absolute; top: 0; left: 0; border-radius: 20px;">
                </iframe>
            `;
        }
    }

    // Material Complementar
    const materialContainer = document.getElementById('material-complementar');
    if (aula.material && aula.material.length > 0) {
        let materialHtml = '<h4>Recursos Adicionais</h4><div style="display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap;">';
        aula.material.forEach(mat => {
            const icon = mat.tipo === 'pdf' ? '<i class="fas fa-file-pdf" style="font-size: 1.5rem; color: var(--danger);"></i>' : '<i class="fas fa-headphones" style="font-size: 1.5rem; color: var(--accent);"></i>';
            materialHtml += `
                <a href="${mat.link}" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; border: 1px solid var(--border-light); border-radius: 12px; text-decoration: none; color: var(--primary); transition: background 0.2s;">
                    ${icon}
                    <div>
                        <strong style="display: block;">${mat.nome}</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${mat.tamanho}</span>
                    </div>
                </a>
            `;
        });
        materialHtml += '</div>';
        materialContainer.innerHTML = materialHtml;
    } else {
        materialContainer.innerHTML = '';
    }

    // Navegação (Botões Anterior/Próximo)
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    if (currentIndex > 0) {
        prevBtn.href = `?aula=${cursoData.aulas[currentIndex - 1].id}`;
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    } else {
        prevBtn.href = '#';
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    }

    if (currentIndex < cursoData.aulas.length - 1) {
        nextBtn.href = `?aula=${cursoData.aulas[currentIndex + 1].id}`;
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.innerHTML = `Próxima aula <i class="fas fa-arrow-right"></i>`;
    } else {
        nextBtn.href = '#';
        nextBtn.innerHTML = `Finalizar <i class="fas fa-check"></i>`;
    }

    // 3. Renderizar Sidebar dinamicamente
    const sidebarContainer = document.getElementById('sidebar-modulos');
    let sidebarHtml = '';
    
    // Agrupar aulas por módulo
    const modulos = {};
    const nomesModulos = {
        1: "Fundamentos",
        2: "Técnicas Avançadas"
    };

    cursoData.aulas.forEach(a => {
        if (!modulos[a.modulo]) modulos[a.modulo] = [];
        modulos[a.modulo].push(a);
    });

    Object.keys(modulos).forEach(modNum => {
        const aulasModulo = modulos[modNum];
        // Definir se está expandido (se a aula atual pertence a este módulo)
        const isExpanded = aulasModulo.some(a => a.id === aulaId);
        
        let listaHtml = `<ul class="module-list" style="display: ${isExpanded ? 'block' : 'none'};">`;
        aulasModulo.forEach(a => {
            let icon = '<i class="fas fa-play-circle"></i>';
            if (a.status === 'concluida') icon = '<i class="fas fa-check-circle"></i>';
            if (a.status === 'bloqueada') icon = '<i class="fas fa-lock"></i>';
            
            const itemClass = `module-list-item ${a.id === aulaId ? 'active' : ''} ${a.status === 'concluida' ? 'completed' : ''}`;
            const href = a.status === 'bloqueada' ? '#' : `?aula=${a.id}`;
            
            listaHtml += `
                <a href="${href}" class="${itemClass}">
                    ${icon} ${a.titulo}
                </a>
            `;
        });
        listaHtml += '</ul>';

        sidebarHtml += `
            <div class="module-group">
                <div class="module-group-title" onclick="toggleModule(this)">
                    <span>Módulo ${modNum}: ${nomesModulos[modNum] || ''}</span>
                    <i class="fas fa-chevron-${isExpanded ? 'up' : 'down'}"></i>
                </div>
                ${listaHtml}
            </div>
        `;
    });

    sidebarContainer.innerHTML = sidebarHtml;
    document.getElementById('progresso-texto').innerText = `Progresso: ${cursoData.progresso}% concluído`;
});

// Função para abrir/fechar módulos na sidebar
window.toggleModule = function(el) {
    const list = el.nextElementSibling;
    const icon = el.querySelector('i');
    if (list.style.display === 'none') {
        list.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        list.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
}
