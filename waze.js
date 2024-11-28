function openWaze() {
    const destinationOnPc = "https://www.waze.com/pt-BR/live-map/directions/br/sp/r.-ana-maria-sirani,-546?navigate=yes&to=place.ChIJUaGehy5kzpQRtHIyv_glIIg";
    const destinationOnMobile = "waze.com/ul/h6gyfp3j4k";
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = destinationOnMobile;
    } else {
        window.open(`https://www.waze.com/ul?ll=${destinationOnPc}`, "_blank");
    }
}