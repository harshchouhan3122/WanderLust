// Use provided latitude and longitude from the template
const lat = latitude || 28.644800;  // Default latitude (Delhi)
const lng = longitude || 77.216721; // Default longitude (Delhi)
const locationAddress = address || "Unknown Road";


// Initialize the map centered at given coordinates
const map = L.map('map').setView([lat, lng], 10);

// Add OpenStreetMap tile layer
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    attribution: '&copy; Wanderlust',
    subdomains:['mt0','mt1','mt2','mt3']
});

googleStreets.addTo(map);


// Custom marker icon (optional)
const customIcon = L.icon({
    iconUrl: '/icons/marker.png', // Path to your custom icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Add a marker at the provided coordinates
const marker = L.marker([lat, lng], { icon: customIcon, draggable: false }).addTo(map);
// marker.bindPopup("Location: " + lat + "°N, " + lng + "°E").openPopup();
marker.bindPopup(`<b>${locationAddress}</b>  <br>Exact location will be provided after booking.`).openPopup();



// Layer Control

var openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; Wanderlust'
});

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var baseLayers = {
    "Google Street": googleStreets,
    "Google Hybrid": googleHybrid,
    "OpenStreetMap": openStreetMap,
};

var overlays = {
    "Default Marker": marker,
};

L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(map);