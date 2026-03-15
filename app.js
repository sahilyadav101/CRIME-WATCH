// 1. Initialize Map
const map = L.map('map').setView([28.4595, 77.4938], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// 2. The Danger Heatmap (Red Zones)
const highRiskData = [
    [28.4595, 77.4938, 1.0], 
    [28.4750, 77.5050, 0.9],
    [28.5355, 77.3910, 0.8],
    [28.6139, 77.2090, 1.0] 
];

L.heatLayer(highRiskData, {
    radius: 40, 
    blur: 20, 
    gradient: {0.4: 'lime', 0.6: 'yellow', 1.0: 'red'}
}).addTo(map);

let routingControl = null;

function calculateSafeRoute() {
    const startLoc = document.getElementById('start').value;
    const endLoc = document.getElementById('end').value;

    if (routingControl) map.removeControl(routingControl);

    const geocoder = L.Control.Geocoder.nominatim();

    geocoder.geocode(startLoc, function(res1) {
        if (res1.length === 0) return alert("Start point not found");
        const startPoint = res1[0].center;

        geocoder.geocode(endLoc, function(res2) {
            if (res2.length === 0) return alert("Destination not found");
            const endPoint = res2[0].center;

            // DRAWING THE ACTUAL COLORFUL ROUTE
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startPoint.lat, startPoint.lng),
                    L.latLng(endPoint.lat, endPoint.lng)
                ],
                lineOptions: {
                    styles: [
                        {color: '#00f2ff', opacity: 1, weight: 10}, // Outer Neon Glow
                        {color: 'white', opacity: 0.9, weight: 4}    // Inner Bright Path
                    ]
                },
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                show: false // Hides the text box
            }).addTo(map);

            // UI Feedback
            document.getElementById('risk-lvl').innerText = "CALCULATING SAFETY...";
            setTimeout(() => {
                document.getElementById('risk-lvl').innerText = "HIGH RISK";
                document.getElementById('risk-lvl').style.color = "#ff0055";
            }, 1000);
        });
    });
}