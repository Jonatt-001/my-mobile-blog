document.addEventListener('DOMContentLoaded', async () => {
            const container = document.getElementById('article-list');
            
            try {
                const res = await fetch('/articles.json?t=' + new Date().getTime());
                if (!res.ok) throw new Error('No articles');
                
                const articles = await res.json();
                
                if (articles.length === 0) {
                    container.innerHTML = `
                        <div class="no-articles" style="grid-column: 1/-1;">
                            <p>No articles yet. Check back soon!</p>
                        </div>
                    `;
                    return;
                }
                
                container.innerHTML = articles.map(art => {
                    const hasImage = art.image && art.image.trim() !== '';
                    const imageHtml = hasImage 
                        ? `<img src="${art.image}" alt="${art.title}" class="article-image" loading="lazy">`
                        : '';
                    const cardClass = hasImage ? 'article-card' : 'article-card no-image';
                    
                    return `
                        <a href="${art.url}" class="${cardClass}">
                            ${imageHtml}
                            <span class="article-category">${art.category}</span>
                            <h2>${art.title}</h2>
                            <p class="article-excerpt">${art.excerpt}...</p>
                            <div class="article-meta">
                                <span class="article-date">${new Date(art.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span class="read-more">
                                    Read Story
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            </div>
                        </a>
                    `;
                }).join('');
            } catch (e) {
                container.innerHTML = `
                    <div class="no-articles" style="grid-column: 1/-1;">
                        <p>Welcome to Dyve News</p>
                    </div>
                `;
            }
        });


