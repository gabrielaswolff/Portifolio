// API do GitHub para buscar repositórios
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/gabrielaswolff/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        displayGitHubRepos(repos);
    } catch (error) {
        console.log('Erro ao carregar repositórios do GitHub:', error);
    }
}

// Exibir repositórios do GitHub
function displayGitHubRepos(repos) {
    const container = document.getElementById('github-projetos');
    
    // Filtra repositórios que não são os principais já listados
    const excludedRepos = ['HabitFlow', 'TEKOMAP'];
    const filteredRepos = repos.filter(repo => 
        !excludedRepos.includes(repo.name) && 
        !repo.fork
    );
    
    if (filteredRepos.length === 0) {
        container.innerHTML = '<p>Nenhum outro projeto encontrado no GitHub.</p>';
        return;
    }
    
    container.innerHTML = filteredRepos.map(repo => `
        <div class="projeto-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Projeto no GitHub'}</p>
            <div class="projeto-techs">
                <span class="tech-tag">${repo.language || 'Várias'}</span>
            </div>
            <div class="projeto-links">
                <a href="${repo.html_url}" target="_blank" class="projeto-link">
                    📁 Ver Código
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="projeto-link">🌐 Ver Site</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Carregar projetos do GitHub quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubRepos();
});