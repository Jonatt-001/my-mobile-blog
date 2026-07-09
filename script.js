document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('article-list');
    if (!container) return;

    try {
        const res = await fetch('/articles.json?t=' + new Date().getTime());
        if (!res.ok) throw new Error('No articles found');
        
        const articles = await res.json();
        
        container.innerHTML = articles.map(art => `
            <div class="post-preview">
                <span class="category">${art.category}</span>
                <h2><a href="${art.url}">${art.title}</a></h2>
                <p class="excerpt">${art.excerpt}...</p>
                <time>${new Date(art.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = '<p style="text-align:center; color:#666;">Welcome to News.dyve.online. Our first articles are being published soon.</p>';
    }
});

