import './marker.css';

class Markers {

    constructor(map) {
        this.map = map;
    }

    displaySavedMarkers(service) {
        service.getMarkers()
            .then(markers => {
                markers.forEach(({
                    location,
                    createdOn
                }) => {
                    this.addMarker(location, createdOn);
                });
            })
            .catch(error => alert(`Unable to fetch saved markers: ${error}`))
    }

    addMarker(location, createdOn) {

        const marker = new window.google.maps.Marker({
            position: location,
            map: this.map,
            animation: window.google.maps.Animation.DROP,
        });

        const infoWindow = new window.google.maps.InfoWindow();
        this.setLocationDetailsToInfoWin(location, infoWindow, createdOn);


        marker.addListener('click', function () {
            infoWindow.open(this.map, marker);
        });

    }

    setLocationDetailsToInfoWin(location, infoWindow, createdOn) {
        const geoCoder = new window.google.maps.Geocoder();

        geoCoder.geocode({
            'location': location
        }, (results, status) => {
            if (status === 'OK') {
                const postalAddress = results[0].formatted_address
                infoWindow.setContent(
                    `<div>
                        <span class='postal'>
                        Address:
                        </span>
                        <span>${postalAddress}</span>
                        </h4>
                        <div class='latlng'>
                            <strong>Lat:</strong>${location.lat}
                            <strong>Lng:</strong>${location.lng}
                        </div>
                        <span>
                        <strong>Created On:</strong>
                        <span class='time'>${(createdOn) ? createdOn : new Date()}<span>
                        </span>
                    </div>`
                )
            } else {
                alert(`Request failed, details: ${status}`)
            }
        })
    }

};

export default Markers;