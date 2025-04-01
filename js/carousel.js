/**
 * Industrial14 - Carosello dei piatti
 * Questo file gestisce il carosello automatico delle immagini dei piatti
 * con supporto per interazione touch e mouse
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
    
    const carouselWrapper = document.querySelector('.dishes-carousel');
    const cards = carousel.querySelectorAll('.dish-card');
    const dotsContainer = document.querySelector('.carousel-nav');
    
    if (cards.length === 0) return;
    
    // Calcola quante card mostrare in base alla larghezza dello schermo
    let visibleCards = getVisibleCardsCount();
    let currentIndex = 0;
    let autoplayInterval;
    let userInteracting = false;
    let interactionTimeout;
    
    // Variabili per il touch
    let touchStartX = 0;
    let touchEndX = 0;
    let touchThreshold = 50; // Soglia minima di spostamento per considerare uno swipe
    
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
    
    // Aggiungi eventi touch per lo scorrimento
    carouselWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselWrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
    carouselWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Aggiungi eventi mouse per lo scorrimento (per desktop)
    carouselWrapper.addEventListener('mousedown', handleMouseDown);
    carouselWrapper.addEventListener('mousemove', handleMouseMove);
    carouselWrapper.addEventListener('mouseup', handleMouseUp);
    carouselWrapper.addEventListener('mouseleave', handleMouseUp);
    
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
        
        // Imposta un nuovo intervallo solo se l'utente non sta interagendo
        if (!userInteracting) {
            autoplayInterval = setInterval(function() {
                const totalSlides = Math.ceil(cards.length / visibleCards);
                let nextIndex = currentIndex + 1;
                
                // Torna all'inizio se siamo alla fine
                if (nextIndex >= totalSlides) nextIndex = 0;
                
                moveToSlide(nextIndex);
            }, 5000); // Cambia slide ogni 5 secondi
        }
    }
    
    /**
     * Reimposta l'autoplay dopo un'interazione dell'utente
     */
    function resetAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        
        // Cancella eventuali timeout esistenti
        if (interactionTimeout) clearTimeout(interactionTimeout);
        
        // Imposta un flag per indicare che l'utente sta interagendo
        userInteracting = true;
        
        // Imposta un timeout per riavviare l'autoplay dopo 3 secondi di inattività
        interactionTimeout = setTimeout(function() {
            userInteracting = false;
            startAutoplay();
        }, 3000);
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
    
    /**
     * Gestisce l'evento touchstart
     */
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        resetAutoplay();
        
        // Aggiungi la classe grabbing durante il touch
        carousel.classList.add('grabbing');
    }
    
    /**
     * Gestisce l'evento touchmove
     */
    function handleTouchMove(e) {
        if (!touchStartX) return;
        touchEndX = e.touches[0].clientX;
    }
    
    /**
     * Gestisce l'evento touchend
     */
    function handleTouchEnd() {
        if (!touchStartX || !touchEndX) return;
        
        const swipeDistance = touchEndX - touchStartX;
        
        // Se lo swipe è abbastanza lungo, cambia slide
        if (Math.abs(swipeDistance) > touchThreshold) {
            if (swipeDistance > 0) {
                // Swipe verso destra (slide precedente)
                moveToSlide(currentIndex - 1);
            } else {
                // Swipe verso sinistra (slide successiva)
                moveToSlide(currentIndex + 1);
            }
        }
        
        // Rimuovi la classe grabbing quando finisce il touch
        carousel.classList.remove('grabbing');
        
        // Resetta le variabili touch
        touchStartX = 0;
        touchEndX = 0;
    }
    
    // Variabili per il mouse drag
    let isDragging = false;
    let startMouseX = 0;
    let endMouseX = 0;
    
    /**
     * Gestisce l'evento mousedown
     */
    function handleMouseDown(e) {
        isDragging = true;
        startMouseX = e.clientX;
        resetAutoplay();
        
        // Aggiungi la classe grabbing durante il trascinamento
        carousel.classList.add('grabbing');
        
        // Previeni il comportamento di default (selezione testo)
        e.preventDefault();
    }
    
    /**
     * Gestisce l'evento mousemove
     */
    function handleMouseMove(e) {
        if (!isDragging) return;
        endMouseX = e.clientX;
        e.preventDefault();
    }
    
    /**
     * Gestisce l'evento mouseup/mouseleave
     */
    function handleMouseUp(e) {
        if (!isDragging) return;
        
        const dragDistance = endMouseX - startMouseX;
        
        // Se il drag è abbastanza lungo, cambia slide
        if (Math.abs(dragDistance) > touchThreshold) {
            if (dragDistance > 0) {
                // Drag verso destra (slide precedente)
                moveToSlide(currentIndex - 1);
            } else {
                // Drag verso sinistra (slide successiva)
                moveToSlide(currentIndex + 1);
            }
        }
        
        // Rimuovi la classe grabbing quando finisce il trascinamento
        carousel.classList.remove('grabbing');
        
        // Resetta le variabili drag
        isDragging = false;
        startMouseX = 0;
        endMouseX = 0;
        e.preventDefault();
    }
}