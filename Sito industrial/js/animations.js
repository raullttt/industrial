/**
 * Industrial14 - Animazioni avanzate
 * Questo file contiene animazioni personalizzate per migliorare l'esperienza utente
 */

document.addEventListener('DOMContentLoaded', function() {
    // Aspetta che il menu sia completamente caricato prima di inizializzare le animazioni
    // Invece di usare un MutationObserver che potrebbe causare cicli infiniti,
    // utilizziamo un semplice timeout per dare tempo al menu di caricarsi
    const menuContainer = document.getElementById('menu-container');
    
    if (menuContainer) {
        // Inizializza le animazioni dopo un breve ritardo
        setTimeout(() => {
            initializeAnimations();
            addHoverEffects();
            enhanceDropdowns();
        }, 500);
    } else {
        // Fallback nel caso in cui il menu container non esista ancora
        setTimeout(() => {
            initializeAnimations();
            addHoverEffects();
            enhanceDropdowns();
        }, 1000);
    }
});

/**
 * Inizializza le animazioni di base per gli elementi della pagina
 */
function initializeAnimations() {
    // Animazione per il logo all'avvio
    const logo = document.querySelector('.star-logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'rotate(-180deg) scale(0.5)';
        
        setTimeout(() => {
            logo.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'rotate(0) scale(1)';
        }, 300);
    }
    
    // Animazione per il titolo
    const title = document.querySelector('h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 600);
    }
    
    // Animazione per le sezioni del menu
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 800 + (index * 150));
    });
}

/**
 * Aggiunge effetti hover avanzati agli elementi interattivi
 */
function addHoverEffects() {
    // Effetto hover per gli elementi del menu con animazione migliorata
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        // Rimuovi eventuali listener esistenti
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.backgroundColor = 'rgba(182, 143, 64, 0.08)';
            this.style.borderRadius = '4px';
            this.style.padding = '8px';
            this.style.margin = '12px 0';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(182, 143, 64, 0.15)';
            this.style.transform = 'translateY(-2px)';
        });
        
        newItem.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.margin = '20px 0';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
        
        // Aggiungi effetto touch per dispositivi mobili
        newItem.addEventListener('touchstart', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.backgroundColor = 'rgba(166, 123, 91, 0.08)';
            this.style.borderRadius = '4px';
            this.style.padding = '8px';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(176, 141, 87, 0.15)';
        });
        
        newItem.addEventListener('touchend', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.boxShadow = 'none';
        });
    });
    
    // Effetto hover per le icone social con animazione migliorata
    const socialIcons = document.querySelectorAll('.social-media a');
    socialIcons.forEach(icon => {
        // Rimuovi eventuali listener esistenti
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        newIcon.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(193, 68, 14, 0.4)';
            this.style.backgroundColor = 'rgba(193, 68, 14, 0.2)';
        });
        
        newIcon.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
            this.style.boxShadow = '0 0 0 1px rgba(205, 174, 97, 0.3)';
            this.style.backgroundColor = 'rgba(205, 174, 97, 0.1)';
        });
        
        // Aggiungi effetto touch per dispositivi mobili
        newIcon.addEventListener('touchstart', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(184, 115, 51, 0.4)';
        });
        
        newIcon.addEventListener('touchend', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 0 1px rgba(205, 174, 97, 0.3)';
            this.style.backgroundColor = 'rgba(205, 174, 97, 0.1)';
        });
    });
    
    // Aggiungi effetti hover per i prezzi
    const prices = document.querySelectorAll('.menu-item-price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'scale(1.08)';
            this.style.backgroundColor = 'rgba(193, 68, 14, 0.25)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(193, 68, 14, 0.4)';
            this.style.color = '#FFFFFF';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'rgba(193, 68, 14, 0.15)';
            this.style.boxShadow = '0 0 0 1px rgba(193, 68, 14, 0.3)';
            this.style.color = 'var(--text-light)';
        });
    });
}

/**
 * Migliora le animazioni dei dropdown per renderle più fluide
 */
function enhanceDropdowns() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        // Rimuovi l'event listener esistente per evitare duplicati
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function() {
            // Toggle della classe active per l'header
            this.classList.toggle('active');
            
            // Riferimento all'icona dropdown
            const dropdownIcon = this.querySelector('.dropdown-icon i');
            
            // Riferimento al contenuto
            const content = this.nextElementSibling;
            
            // Aggiungi effetto ripple al click
            addRippleEffect(this);
            
            if (content.classList.contains('active')) {
                // Chiusura del dropdown con animazione migliorata
                dropdownIcon.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                dropdownIcon.style.transform = 'rotate(0deg)';
                
                // Prima di iniziare l'animazione di chiusura, imposta l'altezza esatta
                // per evitare il "salto" durante la transizione
                const contentHeight = content.scrollHeight;
                content.style.maxHeight = contentHeight + 'px';
                content.style.overflow = 'hidden';
                
                // Forza un reflow per assicurarsi che il browser applichi il valore di maxHeight
                content.offsetHeight;
                
                // Usa una curva di accelerazione più naturale per la chiusura
                content.style.transition = 'max-height 0.4s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.3s ease';
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                
                // Rimuovi la classe active dopo l'animazione
                setTimeout(() => {
                    content.classList.remove('active');
                    // Rimuovi le proprietà di stile inline dopo la transizione
                    content.style.transition = '';
                }, 400);
            } else {
                // Apertura del dropdown con animazione migliorata
                content.classList.add('active');
                dropdownIcon.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                dropdownIcon.style.transform = 'rotate(180deg)';
                
                // Prepara il contenuto per l'animazione
                content.style.opacity = '0';
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.willChange = 'max-height, opacity'; // Ottimizza la performance dell'animazione
                
                // Forza un reflow per assicurarsi che il browser applichi il valore di maxHeight
                content.offsetHeight;
                
                // Calcola l'altezza esatta del contenuto prima dell'animazione
                const contentHeight = content.scrollHeight;
                
                // Usa una curva di accelerazione più naturale per l'apertura
                content.style.transition = 'max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease';
                content.style.maxHeight = contentHeight + 'px';
                content.style.opacity = '1';
                
                // Usa un event listener per transitionend invece di setTimeout
                const transitionEndHandler = function() {
                    // Rimuovi l'event listener dopo l'esecuzione
                    content.removeEventListener('transitionend', transitionEndHandler);
                    
                    // Aggiungi un buffer all'altezza per evitare troncamenti
                    content.style.maxHeight = (contentHeight + 100) + 'px';
                    
                    // Usa requestAnimationFrame per sincronizzare con il ciclo di rendering
                    requestAnimationFrame(() => {
                        // Usa una transizione specifica per l'overflow per renderla più fluida
                        content.style.transition = 'overflow 0.1s linear';
                        
                        // Piccolo ritardo prima di cambiare overflow
                        setTimeout(() => {
                            content.style.overflow = 'visible';
                            
                            // Rimuovi le proprietà di stile inline dopo un ritardo maggiore
                            setTimeout(() => {
                                content.style.willChange = 'auto'; // Ripristina willChange
                            }, 200);
                        }, 50);
                    });
                };
                
                // Aggiungi un listener per l'evento transitionend
                content.addEventListener('transitionend', transitionEndHandler, { once: true });
            }
        });
    });
    
    // Apri la prima sezione per default con animazione
    if (sectionHeaders.length > 0) {
        const firstHeader = sectionHeaders[0];
        const firstContent = firstHeader.nextElementSibling;
        const firstIcon = firstHeader.querySelector('.dropdown-icon i');
        
        firstHeader.classList.add('active');
        firstContent.classList.add('active');
        
        firstIcon.style.transform = 'rotate(180deg)';
        firstContent.style.opacity = '0';
        firstContent.style.maxHeight = '0';
        firstContent.style.overflow = 'hidden';
        firstContent.style.willChange = 'max-height, opacity'; // Ottimizza la performance dell'animazione
        
        // Forza un reflow per assicurarsi che il browser applichi il valore di maxHeight
        firstContent.offsetHeight;
        
        // Calcola l'altezza esatta del contenuto prima dell'animazione
        const contentHeight = firstContent.scrollHeight;
        
        // Usa requestAnimationFrame per sincronizzare con il ciclo di rendering
        requestAnimationFrame(() => {
            // Usa una curva di accelerazione più naturale
            firstContent.style.transition = 'max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease';
            firstContent.style.maxHeight = contentHeight + 'px';
            firstContent.style.opacity = '1';
            
            // Usa un event listener per transitionend invece di setTimeout
            const transitionEndHandler = function() {
                // Rimuovi l'event listener dopo l'esecuzione
                firstContent.removeEventListener('transitionend', transitionEndHandler);
                
                // Aggiungi un buffer all'altezza per evitare troncamenti
                firstContent.style.maxHeight = (contentHeight + 100) + 'px';
                
                // Usa requestAnimationFrame per il cambio di overflow
                requestAnimationFrame(() => {
                    // Usa una transizione specifica per l'overflow per renderla più fluida
                    firstContent.style.transition = 'overflow 0.1s linear';
                    
                    // Piccolo ritardo prima di cambiare overflow
                    setTimeout(() => {
                        firstContent.style.overflow = 'visible';
                        
                        // Rimuovi le proprietà di stile inline dopo un ritardo maggiore
                        setTimeout(() => {
                            firstContent.style.willChange = 'auto'; // Ripristina willChange
                        }, 200);
                    }, 50);
                });
            };
            
            // Aggiungi un listener per l'evento transitionend
            firstContent.addEventListener('transitionend', transitionEndHandler, { once: true });
        }, 300);
    }
}

/**
 * Aggiunge un effetto ripple agli elementi cliccabili
 * @param {HTMLElement} element - L'elemento a cui aggiungere l'effetto ripple
 */
function addRippleEffect(element) {
    // Crea l'elemento ripple
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    // Posiziona l'elemento ripple dove è avvenuto il click
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '0px';
    ripple.style.top = '0px';
    
    // Aggiungi l'elemento ripple all'elemento cliccato
    element.appendChild(ripple);
    
    // Rimuovi l'elemento ripple dopo l'animazione
    setTimeout(() => {
        ripple.remove();
    }, 600);
}