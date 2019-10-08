import { markerData } from '../mock';

class MapService{

    /**
     * Gets list of markers
     */
    getMarkers() {
        return new Promise( resolve => resolve(markerData) );
    }

    /**
     * Saves marker
     * @param marker 
     */
    saveMarkers(marker){
        return new Promise( resolve => resolve(marker) )
    }

}

export default MapService;