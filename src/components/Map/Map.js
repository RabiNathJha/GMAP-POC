import React, { Component, createRef } from 'react';

import Maploader from './MapLoader';
import mapConfig from './map.config';
import Markers from '../Markers';
import DataLayer from '../DataLayer';
import GeoJsonLoader from './GeoJsonLoader';
class MyGMap extends Component {
    
    gmapRef = createRef(null);

    componentDidMount() {
      new Maploader(this.mapOnLoad)
    }

    mapOnLoad = () => {
        const map = new window.google.maps.Map(this.gmapRef.current, mapConfig)
        
        const { service } = this.props;
        const marker = new Markers(map);

        this.mapOnClickAddMarker(map, marker);
        marker.displaySavedMarkers(service);

        new GeoJsonLoader().getContourDataSet()
        .then(({data}) => {
          const dataLayer = new DataLayer(map, data);
          dataLayer.displayControls();
        })
        .catch((error) => alert(`Unable to fetch jeo json: ${error}`))

    }


    mapOnClickAddMarker = (map, marker) => {
      new window.google.maps.event.addListener(map, 'click', (event) => {
        marker.addMarker(event.latLng);
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