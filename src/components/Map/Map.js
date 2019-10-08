import React, { Component, createRef } from 'react';

import mapConfig from './map.config';
import Markers from '../../classes/Markers';
import DataLayer from '../../classes/DataLayer';
import { GeoJsonLoader, MapLoader } from '../../classes/Loader';
class MyGMap extends Component {
    
    gmapRef = createRef(null);

    componentDidMount() {
      new MapLoader(this.mapOnLoad)
    }

    mapOnLoad = () => {
        const map = new window.google.maps.Map(this.gmapRef.current, mapConfig)
        
        const { service } = this.props;
        const marker = new Markers(map);

        //get saved markers and render on map
        this.mapOnClickAddMarker(map, marker);
        marker.displaySavedMarkers(service);

        //fetch dataset and display control panel
        new GeoJsonLoader().getContourDataSet()
        .then(({data}) => {
          const dataLayer = new DataLayer(map, data);
          dataLayer.displayControls();
        })
        .catch((error) => alert(`Unable to fetch jeo json: ${error}`))

    }


    mapOnClickAddMarker = (map, marker) => {
      new window.google.maps.event.addListener(map, 'click', (event) => {
        marker.addMarker(event.latLng.toJSON());
      });
    }

    render() {
        return (
          <main>
            <div
              ref={this.gmapRef}
              style={{height:'100vh'}}
            >
            </div>
          </main>
        )
      }
};

export default MyGMap;