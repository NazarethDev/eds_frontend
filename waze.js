function openWaze() {
    const destinationAddress = "waze://?q=Rua+Ana+Maria+Sirani,+546&navigate=yes";
    const destinationCoordinates = "waze://?ll=-23.548893465107557,-46.432153821794834&navigate=yes";
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `waze://?q=${encodeURIComponent(destinationAddress)}&navigate=yes`;
    } else {
        window.open(`https://www.waze.com/ul?ll=${destinationAddress}&navigate=yes`, "_blank");
    }
}