import React, { Component } from 'react';
import { loadGMap } from '../../helpers';
import './map.css';

class MyGMap extends Component {
    
    componentDidMount() {
        loadGMap(`https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_SECRET_KEY}&callback=initMap`);
        window.initMap = this.initMap
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 26.6800, lng: 88.3662},
            zoom: 8
          })

        this.displaySavedMarkers(map);

        new window.google.maps.event.addListener(map, 'click', (event) => {
          this.addMarker(event.latLng, map);
        });

    }

    displaySavedMarkers = (map) => {
      this.props.service.getMarkers()
      .then(markers => {
        markers.forEach(({location, createdOn}) => {
          this.addMarker(location, map, createdOn)
        });
      })
      .catch(error => alert(`Unable to fetch saved markers: ${error}`))
      
    }

    addMarker = (location, map, createdOn) => {

      const marker = new window.google.maps.Marker({
        position: location,
        map: map
      });

      //show infowindow onclick marker
      const infoWindow = new window.google.maps.InfoWindow();
      this.setLocationDetailsToInfoWin(location, infoWindow, createdOn);


      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });

    }

    setLocationDetailsToInfoWin = (location, infoWindow, createdOn) => {
      const geoCoder = new window.google.maps.Geocoder();

      geoCoder.geocode({'location': location}, (results, status) => {
        if(status === 'OK') {
          const postalCode = results[0].address_components.filter(addObj => addObj.types[0] === 'postal_code');
          
          infoWindow.setContent(
            `<div>
                <h4 class='postal'>
                  Postal Code: <span>${(postalCode[0])? postalCode[0].short_name : 'N/A'}</span>
                </h4>
                <span>
                  <strong>Created On:</strong>
                  <span class='time'>${(createdOn) ? createdOn : new Date()}<span>
                </span>
              </div>`
            )
        }
        else{
          alert(`Request failed, details: ${status}`)
        }
      })

    }

    render() {
        return (
          <main>
            <div id="map" style={{height:'100vh'}}></div>
          </main>
        )
      }
};

export default MyGMap;