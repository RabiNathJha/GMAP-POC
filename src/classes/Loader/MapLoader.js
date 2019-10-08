class MapLoader {

    constructor(onLoad) {
        const googleMapScript = document.createElement('script')
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_SECRET_KEY}`
        window.document.body.appendChild(googleMapScript)

        googleMapScript.addEventListener('load', () => {
            onLoad();
        })
    }
}

export default MapLoader;