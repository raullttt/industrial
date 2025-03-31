/**
 * Industrial Rossino - Menu dinamico
 * Questo file gestisce la creazione dinamica del menu basato sul file JSON
 * Utilizza menu_completo_rossino.json come fonte dei dati e implementa un sistema di cache
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variabile per memorizzare i dati del menu in cache
    let menuCache = null;
    
    // Timestamp dell'ultimo caricamento
    let lastLoadTime = 0;
    
    // Tempo di scadenza della cache in millisecondi (5 minuti)
    const cacheExpiration = 5 * 60 * 1000;
    
    // Carica i dati del menu
    loadMenu();
    
    /**
     * Carica i dati del menu dal file JSON o dalla cache
     */
    function loadMenu() {
        const currentTime = Date.now();
        
        // Se la cache è valida, usa i dati in cache
        if (menuCache && (currentTime - lastLoadTime < cacheExpiration)) {
            generateMenu(menuCache);
            initializeDropdowns();
            return;
        }
        
        // Altrimenti carica i dati dal file JSON
        fetch('../data/menu_completo_rossino.json')
            .then(response => response.json())
            .then(data => {
                // Aggiorna la cache e il timestamp
                menuCache = data.menu;
                lastLoadTime = currentTime;
                
                // Genera il menu completo
                generateMenu(data.menu);
                // Inizializza i dropdown dopo aver generato il menu
                initializeDropdowns();
            })
            .catch(error => {
                console.error('Errore nel caricamento del menu:', error);
            });
    }
    
    /**
     * Genera l'intero menu basato sui dati JSON
     * @param {Array} menuData - Array di categorie del menu
     */
    function generateMenu(menuData) {
        const menuContainer = document.getElementById('menu-container');
        
        // Itera attraverso tutte le categorie principali
        menuData.forEach((categoria, index) => {
            // Crea la sezione per la categoria principale
            const sectionElement = document.createElement('section');
            sectionElement.className = 'menu-section';
            
            // Crea l'header della sezione con l'icona appropriata
            const headerElement = document.createElement('div');
            headerElement.className = 'section-header';
            headerElement.id = `categoria-${index}-header`;
            
            // Aggiungi il titolo con l'emoji (se presente)
            const titleElement = document.createElement('h2');
            // Verifica se l'emoji esiste, altrimenti usa una stringa vuota
            const emoji = categoria.emoji || '';
            titleElement.textContent = `${emoji} ${categoria.categoria}`;
            headerElement.appendChild(titleElement);
            
            // Aggiungi l'icona dropdown
            const dropdownIcon = document.createElement('div');
            dropdownIcon.className = 'dropdown-icon';
            dropdownIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';
            headerElement.appendChild(dropdownIcon);
            
            sectionElement.appendChild(headerElement);
            
            // Crea il contenuto della sezione
            const contentElement = document.createElement('div');
            contentElement.className = 'section-content';
            contentElement.id = `categoria-${index}-content`;
            
            // Verifica se ci sono sottocategorie
            if (categoria.sottocategorie && categoria.sottocategorie.length > 0) {
                // Crea un contenitore per le sottocategorie
                const subcategoriesContainer = document.createElement('div');
                subcategoriesContainer.className = 'subcategories-container';
                
                // Itera attraverso le sottocategorie
                categoria.sottocategorie.forEach((sottocategoria, subIndex) => {
                    // Crea la sottocategoria
                    const subcategoryElement = document.createElement('div');
                    subcategoryElement.className = 'subcategory';
                    
                    // Aggiungi il titolo della sottocategoria
                    const subcategoryTitle = document.createElement('h3');
                    subcategoryTitle.className = 'subcategory-title';
                    subcategoryTitle.textContent = sottocategoria.nome;
                    subcategoryElement.appendChild(subcategoryTitle);
                    
                    // Crea il contenitore per gli elementi del menu
                    const menuItemsContainer = document.createElement('div');
                    menuItemsContainer.className = 'menu-items';
                    
                    // Aggiungi gli elementi del menu
                    if (sottocategoria.elementi && sottocategoria.elementi.length > 0) {
                        sottocategoria.elementi.forEach(elemento => {
                            const menuItem = createMenuItem(elemento);
                            menuItemsContainer.appendChild(menuItem);
                        });
                    }
                    
                    subcategoryElement.appendChild(menuItemsContainer);
                    subcategoriesContainer.appendChild(subcategoryElement);
                });
                
                contentElement.appendChild(subcategoriesContainer);
            } else if ((categoria.elementi && categoria.elementi.length > 0) || (categoria.prodotti && categoria.prodotti.length > 0)) {
                // Se non ci sono sottocategorie ma ci sono elementi diretti o prodotti
                const menuItemsContainer = document.createElement('div');
                menuItemsContainer.className = 'menu-items';
                
                // Usa elementi o prodotti a seconda di quale è disponibile
                const items = categoria.elementi || categoria.prodotti;
                
                items.forEach(elemento => {
                    const menuItem = createMenuItem(elemento);
                    menuItemsContainer.appendChild(menuItem);
                });
                
                contentElement.appendChild(menuItemsContainer);
            }
            
            sectionElement.appendChild(contentElement);
            menuContainer.appendChild(sectionElement);
        });
    }
    
    /**
     * Crea un elemento del menu
     * @param {Object} item - Dati dell'elemento del menu
     * @return {HTMLElement} - Elemento HTML per l'item del menu
     */
    function createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        // Header con nome e prezzo
        const menuItemHeader = document.createElement('div');
        menuItemHeader.className = 'menu-item-header';
        
        const menuItemName = document.createElement('div');
        menuItemName.className = 'menu-item-name';
        menuItemName.textContent = item.nome;
        menuItemHeader.appendChild(menuItemName);
        
        // Gestione del prezzo (normale o con opzioni)
        if (!item.opzioni) {
            if (item.prezzo) {
                if (item.prezzo !== undefined) {
                    const menuItemPrice = document.createElement('div');
                    menuItemPrice.className = 'menu-item-price';
                    menuItemPrice.textContent = `€${item.prezzo.toFixed(2)}`;
                    menuItemHeader.appendChild(menuItemPrice);
                }
            }
        }
        
        menuItem.appendChild(menuItemHeader);
        
        // Descrizione (se presente)
        if (item.descrizione) {
            const menuItemDescription = document.createElement('div');
            menuItemDescription.className = 'menu-item-description';
            menuItemDescription.textContent = item.descrizione;
            menuItem.appendChild(menuItemDescription);
        }
        
        // Allergeni (se presenti)
        if (item.allergeni && item.allergeni.length > 0) {
            const menuItemAllergeni = document.createElement('div');
            menuItemAllergeni.className = 'menu-item-allergeni';
            
            const allergeniText = document.createElement('span');
            allergeniText.className = 'allergeni-text';
            allergeniText.textContent = `Allergeni: ${item.allergeni.join(', ')}`;
            menuItemAllergeni.appendChild(allergeniText);
            
            menuItem.appendChild(menuItemAllergeni);
        }
        
        // Opzioni (se presenti)
        if (item.opzioni && item.opzioni.length > 0) {
            const menuItemOptions = document.createElement('div');
            menuItemOptions.className = 'menu-item-options';
            
            item.opzioni.forEach(opzione => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                
                // Verifica quale tipo di opzione è (quantità o formato)
                const optionName = document.createElement('span');
                if (opzione.quantita) {
                    optionName.textContent = opzione.quantita;
                } else if (opzione.formato) {
                    optionName.textContent = opzione.formato;
                } else {
                    optionName.textContent = '';
                }
                optionElement.appendChild(optionName);
                
                const optionPrice = document.createElement('span');
                if (opzione.prezzo !== undefined) {
                    optionPrice.textContent = `€${opzione.prezzo.toFixed(2)}`;
                } else {
                    optionPrice.textContent = '';
                }
                optionElement.appendChild(optionPrice);
                
                menuItemOptions.appendChild(optionElement);
            });
            
            menuItem.appendChild(menuItemOptions);
        }
        
        // Nota per prodotti surgelati
        if (item.surgelato) {
            const menuItemNote = document.createElement('div');
            menuItemNote.className = 'menu-item-note';
            menuItemNote.textContent = '* Prodotto surgelato';
            menuItem.appendChild(menuItemNote);
        }
        
        // Nota per prodotti fatti in casa
        if (item.fatto_in_casa) {
            const menuItemNote = document.createElement('div');
            menuItemNote.className = 'menu-item-note fatto-in-casa';
            menuItemNote.textContent = 'Fatto in casa';
            menuItem.appendChild(menuItemNote);
        }
        
        return menuItem;
    }
    
    /**
     * Inizializza i dropdown per le sezioni del menu
     * Questa funzione viene chiamata una sola volta dopo il caricamento del menu
     */
    function initializeDropdowns() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        // Rimuoviamo eventuali listener esistenti per evitare duplicati
        sectionHeaders.forEach(header => {
            // Clona l'elemento per rimuovere tutti gli event listener
            const newHeader = header.cloneNode(true);
            if (header.parentNode) {
                header.parentNode.replaceChild(newHeader, header);
                
                // Aggiungi il nuovo event listener
                newHeader.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    content.classList.toggle('active');
                    
                    const dropdownIcon = this.querySelector('.dropdown-icon i');
                    if (content.classList.contains('active')) {
                        dropdownIcon.style.transform = 'rotate(180deg)';
                    } else {
                        dropdownIcon.style.transform = 'rotate(0deg)';
                    }
                });
            }
        });
        
        // Apri la prima sezione per default
        if (sectionHeaders.length > 0) {
            sectionHeaders[0].classList.add('active');
            sectionHeaders[0].nextElementSibling.classList.add('active');
            const firstIcon = sectionHeaders[0].querySelector('.dropdown-icon i');
            if (firstIcon) {
                firstIcon.style.transform = 'rotate(180deg)';
            }
        }
    }
});