document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });

    // --- On-Scroll Animations (AOS) ---
    const aosElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    aosElements.forEach(el => observer.observe(el));

    // --- Portfolio Page Logic ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        let portfolioItems = [];

        fetch('assets/data/images.json')
            .then(response => response.json())
            .then(data => {
                portfolioItems = data;
                displayPortfolioItems(portfolioItems);
            });

        const displayPortfolioItems = (items) => {
            portfolioGrid.innerHTML = '';
            items.forEach((item) => {
                const div = document.createElement('div');
                div.className = 'portfolio-item';
                div.setAttribute('data-aos', 'fade-up');
                div.innerHTML = `
                    <img src="${item.url}" alt="${item.alt}">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                    </div>
                `;
                div.addEventListener('click', () => openLightbox(item));
                portfolioGrid.appendChild(div);
            });
            document.querySelectorAll('.portfolio-item[data-aos]').forEach(el => observer.observe(el));
        };

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                
                const filteredItems = (filterValue === '*')
                    ? portfolioItems
                    : portfolioItems.filter(item => item.category === filterValue);
                
                displayPortfolioItems(filteredItems);
            });
        });
    }

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxClose = document.querySelector('.lightbox-close');

        window.openLightbox = (item) => {
            lightboxImg.src = item.url;
            lightboxTitle.textContent = item.title;
            lightbox.classList.add('show');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('show');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
