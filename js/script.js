// Importa le funzioni per gli allergeni
import { allergeni, identificaAllergeni } from './allergeni.js';
// Non importiamo menu.js come modulo, lo includeremo direttamente nell'HTML

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza i dropdown prima di caricare i dati
    initializeDropdowns();
    
    // Il caricamento del menu è gestito da menu.js
    
    // Funzione per popolare una sezione del menu
    function populateMenuSection(sectionId, items) {
        const menuItemsContainer = document.querySelector(`#${sectionId}-content .menu-items`);
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            
            // Header con nome e prezzo
            const menuItemHeader = document.createElement('div');
            menuItemHeader.className = 'menu-item-header';
            
            const menuItemName = document.createElement('div');
            menuItemName.className = 'menu-item-name';
            menuItemName.textContent = item.name;
            menuItemHeader.appendChild(menuItemName);
            
            // Gestione del prezzo (normale o con opzioni)
            if (!item.options) {
                const menuItemPrice = document.createElement('div');
                menuItemPrice.className = 'menu-item-price';
                menuItemPrice.textContent = `€${item.price.toFixed(2)}`;
                menuItemHeader.appendChild(menuItemPrice);
            }
            
            menuItem.appendChild(menuItemHeader);
            
            // Descrizione (se presente)
            if (item.description) {
                const menuItemDescription = document.createElement('div');
                menuItemDescription.className = 'menu-item-description';
                menuItemDescription.textContent = item.description;
                menuItem.appendChild(menuItemDescription);
            }
            
            // Ingredienti (se presenti)
            if (item.ingredients) {
                const menuItemIngredients = document.createElement('div');
                menuItemIngredients.className = 'menu-item-ingredients';
                menuItemIngredients.textContent = item.ingredients;
                menuItem.appendChild(menuItemIngredients);
                
                // Aggiungi icone degli allergeni
                const allergeniTrovati = identificaAllergeni(item.ingredients);
                if (allergeniTrovati.length > 0) {
                    const menuItemAllergeni = document.createElement('div');
                    menuItemAllergeni.className = 'menu-item-allergeni';
                    
                    allergeniTrovati.forEach(allergene => {
                        const allergeneIcon = document.createElement('span');
                        allergeneIcon.className = 'allergene-icon';
                        allergeneIcon.title = allergene.charAt(0).toUpperCase() + allergene.slice(1);
                        allergeneIcon.innerHTML = allergeni[allergene];
                        menuItemAllergeni.appendChild(allergeneIcon);
                    });
                    
                    menuItem.appendChild(menuItemAllergeni);
                }
            }
            
            // Opzioni (se presenti)
            if (item.options) {
                const menuItemOptions = document.createElement('div');
                menuItemOptions.className = 'menu-item-options';
                
                item.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'option';
                    
                    const optionName = document.createElement('span');
                    optionName.textContent = `${option.pieces} pezzi`;
                    optionElement.appendChild(optionName);
                    
                    const optionPrice = document.createElement('span');
                    optionPrice.textContent = `€${option.price.toFixed(2)}`;
                    optionElement.appendChild(optionPrice);
                    
                    menuItemOptions.appendChild(optionElement);
                });
                
                menuItem.appendChild(menuItemOptions);
            }
            
            // Nota (se presente)
            if (item.note) {
                const menuItemNote = document.createElement('div');
                menuItemNote.className = 'menu-item-note';
                menuItemNote.textContent = item.note;
                menuItem.appendChild(menuItemNote);
            }
            
            menuItemsContainer.appendChild(menuItem);
        });
    }
    
    // Funzione per inizializzare i dropdown (ora gestita da animations.js)
    function initializeDropdowns() {
        // Inizializzazione base dei dropdown
        // Le animazioni avanzate sono gestite dal file animations.js
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        // Apri la prima sezione per default
        if (sectionHeaders.length > 0 && !sectionHeaders[0].classList.contains('active')) {
            sectionHeaders[0].classList.add('active');
            sectionHeaders[0].nextElementSibling.classList.add('active');
        }
    }
});