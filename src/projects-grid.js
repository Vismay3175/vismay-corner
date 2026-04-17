import { projects, aiLabProjects } from './projects-data.js';

function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (grid) {
    projects.forEach((project, index) => {
      const card = createProjectCard(project, index, 'standard');
      grid.appendChild(card);
    });
  }

  const aiGrid = document.getElementById('ai-projects-grid');
  if (aiGrid) {
    aiLabProjects.forEach((project, index) => {
      const card = createProjectCard(project, index, 'ai');
      aiGrid.appendChild(card);
    });
  }
}

function createProjectCard(project, index, type) {
  const card = document.createElement('div');
  card.className = type === 'ai' 
    ? 'playground-card relative bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden p-8 hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10'
    : 'group relative bg-surface-container-low border border-outline-variant/30 rounded-[2rem] overflow-hidden hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10';
  
  const label = type === 'ai' ? 'AI Lab' : (project.status === 'Offline' ? 'Offline' : null);
  const labelClass = type === 'ai' ? 'bg-secondary/90' : 'bg-rose-500/90';

  card.innerHTML = `
    ${type !== 'ai' ? `
      <div class="relative overflow-hidden p-8 ${project.bgColor} flex items-center justify-center h-56 transition-colors duration-500">
        <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        ${label ? `
          <div class="absolute top-4 right-4 z-20 px-3 py-1 ${labelClass} backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
            ${label}
          </div>
        ` : ''}
        <img src="${project.image}" alt="${project.title}" class="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
      </div>
    ` : `
      <div class="relative z-10">
        <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
          ${project.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap text-secondary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'}
        </div>
        <h3 class="font-headline text-2xl font-bold text-on-surface mb-4">${project.title}</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 opacity-80">${project.description}</p>
        <div class="aspect-video rounded-2xl overflow-hidden mb-8 border border-outline-variant/20">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" loading="lazy">
        </div>
      </div>
    `}
    <div class="${type !== 'ai' ? 'p-8' : ''}">
      ${type === 'ai' ? '' : `
        <h3 class="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-secondary transition-colors">${project.title}</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6 opacity-80">${project.description}</p>
      `}
      <div class="flex flex-wrap gap-2 mb-6">
        ${(project.techStack || project.features || []).slice(0, 5).map(f => `<span class="px-3 py-1 bg-surface-container-high text-[10px] font-bold text-on-surface-variant rounded-full uppercase tracking-wider border border-outline-variant/20">${f}</span>`).join('')}
      </div>
      <a href="project-detail.html?id=${index}${type === 'ai' ? '&type=ai' : ''}" class="inline-flex items-center gap-2 text-secondary font-label text-[10px] font-black uppercase tracking-widest group/btn">
        View Details
        <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </a>
    </div>
  `;
  return card;
}

document.addEventListener('DOMContentLoaded', initProjects);
