// Getting values from new.ejs
const lat = latitude || 28.644800;  // Default latitude (Delhi)
const lng = longitude || 77.216721; // Default longitude (Delhi)
const locationAddress = address || "Unknown Road";
const zoomLevel = zoom;

// To Store current position of the draggable marker
var currentLat = lat;
var currentLng = lng;

// const address = "Unknown Road";

// Initialize the map centered at given coordinates (Coordinates, zoom level)
const map = L.map('map').setView([lat, lng], zoomLevel); 

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
const marker = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(map);
// marker.bindPopup("Current Postition: " + lat + "°N, " + lng + "°E").openPopup();
marker.bindPopup(`<b>${locationAddress}</b>  <br>Drag marker to exact location.`).openPopup()

// Dragged New Coordinates
marker.on('dragend', function(e) {
    const newLatLng = marker.getLatLng();  // Get the new position of the marker
    currentLat = newLatLng.lat;
    currentLng = newLatLng.lng;
    // console.log(newLatLng.lat, newLatLng.lng);
    marker.setPopupContent("Current Postition: " + newLatLng.lat.toFixed(4) + "°N, " + newLatLng.lng.toFixed(4) + "°E" ).openPopup();  // Update the popup content with new position
    // marker.setPopupContent( locationAddress ).openPopup();  // Update the popup content with new position
});



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


googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseLayers = {
    "Google Street": googleStreets,
    "Google Hybrid": googleHybrid,
    "OpenStreetMap": openStreetMap,
    // "Google Satelite": googleSat,
    // "Google Terrain": googleTerrain,
};

var overlays = {
    "Default Marker": marker,
    // "Custom Marker": marker2
};

L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(map);





////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// GeoCoding ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const apiKey = '602cacddbfa645eca86af8d28f011987,ppppp';          // Replace with your actual API key


// Forward Geocoding
async function getPlaceName(latitude, longitude) {

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        // console.log("Reverse Geocoding Response:", response.data);

        return response.data.results[0].formatted || "Unknown Location";
    } catch (error) {
        console.error("Error fetching place name:", error.message || error);
        return "Unknown Location";
    }
};

// Reverse GeoCoding
async function getCoordinates(address) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        // console.log("Forward Geocoding Response:", response.data); // Log full response data

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
        } else {
            console.error("Address not found in response.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message || error);
        return null;
    }
};





// // Getting the current Position of the Marker
// function fetchCurrentPosition() {
//     console.log("Curr Pos: " + currentLat.toFixed(4) + "And " + currentLng.toFixed(4));
// };


// Getting the current Position of the Marker
// function fetchCurrentPosition() {
//     console.log("Current Position: " + currentLat.toFixed(4) + " And " + currentLng.toFixed(4));

//     // Send the current position to the server
//     fetch(`/currLoc?lat=${currentLat}&lng=${currentLng}`)
//         .then(response => response.json())
//         .then(data => console.log("Server response:", data))
//         .catch(error => console.error("Error sending location:", error));
// }


// Getting the current Position of the Marker
function fetchCurrentPosition(event) {
    event.preventDefault(); // Prevents form from submitting immediately

    // Assuming currentLat and currentLng are set when the marker is moved
    console.log("Current Position: " + currentLat.toFixed(4) + " And " + currentLng.toFixed(4));

    // Set the coordinates in the hidden input field
    const coordinatesInput = document.getElementById('coordinates');
    coordinatesInput.value = JSON.stringify([currentLat, currentLng]); // Make sure it’s an array

    
    // // Log the form data to verify before submitting
    // const formData = new FormData(document.querySelector('form'));
    // formData.forEach((value, key) => {
    //     console.log(key, value);  // This will log each key-value pair in the form data
    // });
    console.log("Coordinates to submit:", coordinatesInput.value); // Logs the JSON string


    // Submit the form
    document.querySelector('form').submit();
}


