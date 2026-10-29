/**
 * Developer Portfolio Interactive Logic
 * Supports dynamic fetching from data/projects.json with fallback for direct file:// access.
 */

// Global state
let allProjects = [];
let currentCategory = 'all';
let searchQuery = '';

// Icons mapping (using Lucide / SVG inline icons)
const icons = {
  brain: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  calculator: `<svg class="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`,
  zap: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  smartphone: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`,
  wallet: `<svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>`,
  database: `<svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
  users: `<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  server: `<svg class="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
  "book-open": `<svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
  layout: `<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>`,
  code: `<svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`
};

// Init application
document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
  renderFeaturedSpotlight();
  renderProjectGrid();
  setupEventListeners();
  updateStats();
});

// Load projects from JSON with fallback
async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Network response error');
    allProjects = await res.json();
  } catch (err) {
    console.warn('Could not fetch projects.json (likely running via file://). Using embedded projects data.', err);
    if (window.FALLBACK_PROJECTS) {
      allProjects = window.FALLBACK_PROJECTS;
    }
  }
}

// Update top statistics
function updateStats() {
  const totalProjectsEl = document.getElementById('statTotalProjects');
  if (totalProjectsEl) {
    totalProjectsEl.textContent = allProjects.length + '+';
  }
}

// Render 3 Featured Hero Projects
function renderFeaturedSpotlight() {
  const container = document.getElementById('spotlightContainer');
  if (!container) return;

  const featured = allProjects.filter(p => p.featured);
  container.innerHTML = featured.map(p => `
    <div class="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group" onclick="openProjectModal('${p.id}')">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
            ${icons[p.icon] || icons.code}
          </div>
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            ★ Featured
          </span>
        </div>
        <h3 class="text-xl font-bold text-white group-hover:text-sky-400 transition-colors mb-2">
          ${p.title}
        </h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          ${p.summary}
        </p>
      </div>

      <div>
        <div class="flex flex-wrap gap-2 mb-6">
          ${p.techStack.slice(0, 4).map(t => `
            <span class="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/50">
              ${t}
            </span>
          `).join('')}
          ${p.techStack.length > 4 ? `
            <span class="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-500">
              +${p.techStack.length - 4}
            </span>
          ` : ''}
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-800 text-sm font-medium text-sky-400 group-hover:translate-x-1 transition-transform">
          <span>Lihat Detail Arsitektur</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Filtered Projects Grid
function renderProjectGrid() {
  const container = document.getElementById('projectGrid');
  if (!container) return;

  const filtered = allProjects.filter(p => {
    const matchesCategory = (currentCategory === 'all') || (p.category === currentCategory);
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <p class="text-base font-medium">Tidak ada project yang sesuai dengan kata kunci "${searchQuery}".</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20">
          Reset Filter & Pencarian
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group" onclick="openProjectModal('${p.id}')">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform">
            ${icons[p.icon] || icons.code}
          </div>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
            ${p.categoryLabel}
          </span>
        </div>
        <h4 class="text-lg font-bold text-white group-hover:text-sky-400 transition-colors mb-2 line-clamp-1">
          ${p.title}
        </h4>
        <p class="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
          ${p.summary}
        </p>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${p.techStack.slice(0, 3).map(t => `
            <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/40">
              ${t}
            </span>
          `).join('')}
          ${p.techStack.length > 3 ? `
            <span class="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-500">
              +${p.techStack.length - 3}
            </span>
          ` : ''}
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-semibold text-slate-400 group-hover:text-sky-400 transition-colors">
          <span>Eksplorasi Project</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  `).join('');
}

// Setup Interactive Filter and Search
function setupEventListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProjectGrid();
    });
  });

  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProjectGrid();
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function resetFilters() {
  currentCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) searchInput.value = '';

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(b => {
    if (b.getAttribute('data-category') === 'all') b.classList.add('active');
    else b.classList.remove('active');
  });

  renderProjectGrid();
}

// Open Detail Modal
window.openProjectModal = function(projectId) {
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const category = document.getElementById('modalCategory');
  const description = document.getElementById('modalDescription');
  const techStack = document.getElementById('modalTechStack');
  const features = document.getElementById('modalFeatures');
  const challenges = document.getElementById('modalChallenges');
  const localPath = document.getElementById('modalLocalPath');

  if (title) title.textContent = project.title;
  if (category) category.textContent = project.categoryLabel;
  if (description) description.textContent = project.description || project.summary;
  if (challenges) challenges.textContent = project.challenges || 'Dirancang dengan arsitektur modular yang skalabel untuk mendukung penambahan fitur di masa depan.';
  if (localPath) localPath.textContent = project.localPath || '-';

  if (techStack) {
    techStack.innerHTML = project.techStack.map(t => `
      <span class="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-sky-300 border border-slate-700/80">
        ${t}
      </span>
    `).join('');
  }

  if (features) {
    features.innerHTML = project.features.map(f => `
      <li class="flex items-start text-sm text-slate-300">
        <svg class="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        <span>${f}</span>
      </li>
    `).join('');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// Close Modal
window.closeModal = function() {
  const modal = document.getElementById('projectModal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

