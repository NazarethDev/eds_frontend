function openWaze() {
    const destinationAddress = "https://www.waze.com/pt-BR/live-map/directions/br/sp/r.-ana-maria-sirani,-546?navigate=yes&to=place.ChIJUaGehy5kzpQRtHIyv_glIIg";
    const destinationCoordinates = "waze://?ll=-23.548893465107557,-46.432153821794834&navigate=yes";
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `waze://?q=${encodeURIComponent(destinationAddress)}&navigate=yes`;
    } else {
        window.open(`https://www.waze.com/ul?ll=${destinationAddress}&navigate=yes`, "_blank");
    }
}