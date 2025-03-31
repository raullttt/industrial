/**
 * Industrial14 - Carosello dei piatti
 * Questo file gestisce il carosello automatico delle immagini dei piatti
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il carosello dopo che il DOM è completamente caricato
    initDishesCarousel();
});

/**
 * Inizializza il carosello dei piatti
 */
function initDishesCarousel() {
    const carousel = document.querySelector('.dishes-carousel-container');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.dish-card');
    const dotsContainer = document.querySelector('.carousel-nav');
    
    if (cards.length === 0) return;
    
    // Calcola quante card mostrare in base alla larghezza dello schermo
    let visibleCards = getVisibleCardsCount();
    let currentIndex = 0;
    let autoplayInterval;
    
    // Crea i punti di navigazione
    createNavigationDots();
    
    // Imposta la larghezza del container in base al numero di card
    updateCarouselLayout();
    
    // Avvia lo scorrimento automatico
    startAutoplay();
    
    // Aggiorna il layout quando la finestra viene ridimensionata
    window.addEventListener('resize', function() {
        visibleCards = getVisibleCardsCount();
        updateCarouselLayout();
        moveToSlide(currentIndex);
    });
    
    /**
     * Crea i punti di navigazione per il carosello
     */
    function createNavigationDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(cards.length / visibleCards);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                moveToSlide(i);
                resetAutoplay();
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    /**
     * Aggiorna il layout del carosello
     */
    function updateCarouselLayout() {
        // Ricrea i punti di navigazione quando cambia il numero di card visibili
        createNavigationDots();
    }
    
    /**
     * Sposta il carosello a un indice specifico
     */
    function moveToSlide(index) {
        const totalSlides = Math.ceil(cards.length / visibleCards);
        currentIndex = index;
        
        // Assicurati che l'indice sia valido
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= totalSlides) currentIndex = totalSlides - 1;
        
        // Calcola lo spostamento
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = 20; // Gap tra le card (come definito nel CSS)
        const offset = currentIndex * (cardWidth * visibleCards + gapWidth * (visibleCards - 1));
        
        // Applica la trasformazione
        carousel.style.transform = `translateX(-${offset}px)`;
        
        // Aggiorna i punti di navigazione
        updateDots();
    }
    
    /**
     * Aggiorna lo stato attivo dei punti di navigazione
     */
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * Avvia lo scorrimento automatico
     */
    function startAutoplay() {
        // Pulisci eventuali intervalli esistenti
        if (autoplayInterval) clearInterval(autoplayInterval);
        
        // Imposta un nuovo intervallo
        autoplayInterval = setInterval(function() {
            const totalSlides = Math.ceil(cards.length / visibleCards);
            let nextIndex = currentIndex + 1;
            
            // Torna all'inizio se siamo alla fine
            if (nextIndex >= totalSlides) nextIndex = 0;
            
            moveToSlide(nextIndex);
        }, 5000); // Cambia slide ogni 5 secondi
    }
    
    /**
     * Reimposta l'autoplay dopo un'interazione dell'utente
     */
    function resetAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    /**
     * Determina quante card mostrare in base alla larghezza dello schermo
     */
    function getVisibleCardsCount() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth < 480) {
            return 2; // Mostra 2 card su schermi molto piccoli
        } else if (windowWidth < 768) {
            return 3; // Mostra 3 card su schermi piccoli
        } else if (windowWidth < 1024) {
            return 4; // Mostra 4 card su schermi medi
        } else {
            return 5; // Mostra 5 card su schermi grandi
        }
    }
}