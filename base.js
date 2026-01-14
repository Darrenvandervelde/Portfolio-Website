  // ---------------------------
  // Dark Mode Toggle Script
  // ---------------------------
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    const btn = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-theme')) {
      btn.textContent = 'Light Mode';
    } else {
      btn.textContent = 'Dark Mode';
    }
  }

  // ---------------------------
  // Fetch Latest GitHub Projects
  // ---------------------------
 async function loadGitHubRepos() {
    const username = 'darrenvandervelde';
    const repoContainer = document.getElementById('repo-list');

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const repos = await response.json();

        if (!repos.length) {
            repoContainer.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        repoContainer.innerHTML = '';

        repos.slice(0, 20).forEach(repo => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            // Tech/Language badges
            const badges = repo.language ? `<span>${repo.language}</span>` : '';

            // Last updated
            const updated = new Date(repo.updated_at).toLocaleDateString();

            projectDiv.innerHTML = `
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description ? repo.description : 'No description available.'}</p>
                    <div class="repo-badges">
                        ${badges}
                    </div>
                </div>

                <div class="project-footer">
                    <div class="repo-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener">View Repo</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">Live Demo</a>` : ''}
                    </div>
                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        <span>${updated}</span>
                    </div>
                </div>
            `;


            repoContainer.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        repoContainer.innerHTML = '<p>Failed to load repositories.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadGitHubRepos);
