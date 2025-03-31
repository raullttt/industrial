// Widget della mappa dei ristoranti Industrial 14
// Utilizza AdvancedMarkerElement invece del deprecato Marker
// NOTA: Per utilizzare questa mappa, è necessario sostituire 'YOUR_API_KEY' nel tag script di Google Maps in index.html con una chiave API valida

// Coordinate dei ristoranti
const restaurantLocations = [
    {
        name: "INDUSTRIAL EXPRESS",
        lat: 45.79514651059817,
        lng: 9.43679721218552,
        description: "La soluzione veloce per chi non vuole rinunciare alla qualità. Servizio rapido e menu selezionato per una pausa pranzo perfetta.",
        link: "express/index.html",
        linkText: "SCOPRI IL MENU"
    },
    {
        name: "INDUSTRIAL ROSSINO",
        lat: 45.80447993384197,
        lng: 9.443956383350717,
        description: "Il nostro ristorante principale con un'ampia selezione di pizze, burger e specialità della casa in un'atmosfera industriale unica.",
        link: "rossino/index.html",
        linkText: "SCOPRI IL MENU"
    },
    {
        name: "INDUSTRIAL CISANO",
        lat: 45.740967647397646, // Coordinate aggiornate
        lng: 9.470445594444286, // Coordinate aggiornate
        description: "La nostra location sul lago, perfetta per cene romantiche e serate speciali con una vista mozzafiato e piatti ricercati.",
        link: "cisano/index.html",
        linkText: "SCOPRI IL MENU"
    }
];

// La funzione initMap verrà chiamata automaticamente dall'API di Google Maps
// tramite il parametro callback nell'URL dello script

function initMap() {
    // Verifica se l'elemento mappa esiste
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Calcola il centro della mappa basato sulle coordinate dei ristoranti
    const bounds = new google.maps.LatLngBounds();
    restaurantLocations.forEach(location => {
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
    });

    // Crea la mappa
    const map = new google.maps.Map(mapElement, {
        center: bounds.getCenter(),
        zoom: 12,
        styles: [
            // Stile dark per la mappa
            {"elementType":"geometry","stylers":[{"color":"#212121"}]},
            {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
            {"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
            {"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},
            {"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},
            {"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},
            {"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},
            {"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},
            {"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
            {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},
            {"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
            {"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},
            {"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},
            {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},
            {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},
            {"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},
            {"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},
            {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
            {"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
            {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},
            {"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}
        ]
    });

    // Variabile per tenere traccia della finestra info attualmente aperta
    let currentOpenInfoWindow = null;
    
    // Aggiungi i marker per ogni ristorante utilizzando AdvancedMarkerElement
    restaurantLocations.forEach(location => {
        // Crea il contenuto della finestra info
        const infoContent = `
            <div class="restaurant-marker-info">
                <h4>${location.name}</h4>
                <p>${location.description}</p>
                <a href="${location.link}">${location.linkText}</a>
            </div>
        `;

        // Crea la finestra info
        const infoWindow = new google.maps.InfoWindow({
            content: infoContent,
            maxWidth: 300,
            pixelOffset: new google.maps.Size(0, -5)
        });

        // Crea un elemento div per il marker personalizzato
        const markerDiv = document.createElement('div');
        markerDiv.className = 'custom-marker';
        markerDiv.style.width = '16px';
        markerDiv.style.height = '16px';
        markerDiv.style.borderRadius = '50%';
        markerDiv.style.backgroundColor = '#CDAE61';
        markerDiv.style.border = '1px solid #CDAE61';
        markerDiv.style.transition = 'all 0.3s';
        
        // Crea il marker avanzato
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            content: markerDiv
        });

        // Aggiungi l'animazione di drop iniziale
        setTimeout(() => {
            markerDiv.animate(
                [
                    { transform: 'translateY(-50px)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ],
                {
                    duration: 500,
                    fill: 'forwards'
                }
            );
        }, 300 * restaurantLocations.indexOf(location));

        // Funzione per animare il marker quando viene cliccato
        const bounceMarker = () => {
            markerDiv.animate(
                [
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-20px)' },
                    { transform: 'translateY(0)' }
                ],
                {
                    duration: 750,
                    fill: 'forwards'
                }
            );
        };

        // Aggiungi l'evento click al marker
        marker.addListener('click', () => {
            // Chiudi la finestra info attualmente aperta (se esiste)
            if (currentOpenInfoWindow) {
                currentOpenInfoWindow.close();
                
                // Se la finestra che stiamo per aprire è già aperta, la chiudiamo e usciamo
                if (currentOpenInfoWindow === infoWindow) {
                    currentOpenInfoWindow = null;
                    // Anima il marker
                    bounceMarker();
                    return;
                }
            }
            
            // Anima il marker quando viene cliccato
            bounceMarker();
            
            // Apri la nuova finestra info e tieni traccia di essa
            infoWindow.open({
                map: map,
                anchor: marker,
                shouldFocus: false
            });
            currentOpenInfoWindow = infoWindow;
        });
        
        // Aggiungi effetti hover al marker
        marker.content.addEventListener('mouseover', () => {
            if (!markerDiv.classList.contains('animating')) {
                markerDiv.style.backgroundColor = '#CDAE61';
                markerDiv.style.border = '2px solid #FFFFFF';
                markerDiv.style.width = '18px';
                markerDiv.style.height = '18px';
            }
        });
        
        marker.content.addEventListener('mouseout', () => {
            if (!markerDiv.classList.contains('animating')) {
                markerDiv.style.backgroundColor = '#CDAE61';
                markerDiv.style.border = '1px solid #CDAE61';
                markerDiv.style.width = '16px';
                markerDiv.style.height = '16px';
            }
        });
        
        // Chiudi la finestra info quando si clicca sulla mappa
        google.maps.event.addListener(map, 'click', () => {
            if (currentOpenInfoWindow) {
                currentOpenInfoWindow.close();
                currentOpenInfoWindow = null;
            }
        });
    });

    // Adatta la mappa per mostrare tutti i marker
    map.fitBounds(bounds);

    // Imposta un livello di zoom massimo
    const zoomChangeBoundsListener = google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        if (map.getZoom() > 13) {
            map.setZoom(13);
        }
    });

    // Rimuovi il listener dopo un timeout
    setTimeout(() => {
        google.maps.event.removeListener(zoomChangeBoundsListener);
    }, 2000);
}