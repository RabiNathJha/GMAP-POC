import {
    Button,
    Slider,
    ControlWrapper
} from '../UI';

class DataLayer {

    constructor(map, data) {
        this.map = map;
        this.dataLayerVisibility = true;
        this.strokeOpacity = 1;

        map.data.setStyle(this.getDataLayerStyle({
            visible: this.dataLayerVisibility
        }));
        map.data.addGeoJson(data);
    }

    getAllElevation = () => {
        const elevations = [];

        this.map.data.forEach(features => {
            elevations.push(features.h.Elevation)
        })

        return elevations;
    }

    getDataLayerStyle = (styleObj) => ({
        strokeColor: '#1e88e5',
        strokeWeight: 2,
        strokeOpacity: this.strokeOpacity,
        ...styleObj
    })

    displayControls = () => {
        const button = this.addDataLayerVisibilityButton();
        const slider = this.addOpacitySlider();
        const elevationSlider = this.addElevationSlider();

        new ControlWrapper().getControlWrapper([button, slider, elevationSlider], this.positionControlPanel);
    }

    positionControlPanel = (controlPanel) => {
        controlPanel.index = 1;
        this.map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(controlPanel);
    }

    addDataLayerVisibilityButton = () => new Button().getBasicButton(this.configureVisibilityButton);

    toggleSliderControl = (value) => {
        document.getElementById('Opacity:Slider').disabled = value;
        document.getElementById('Elevation:Slider').disabled = value;
    }

    configureVisibilityButton = (visibilityButton) => {
        visibilityButton.addEventListener('click', () => {
            this.map.data.setStyle({
                visible: !this.dataLayerVisibility
            });
            this.dataLayerVisibility = !this.dataLayerVisibility;

            if (!this.dataLayerVisibility) {
                const button = document.getElementById('button');
                button.style.backgroundColor = '#D3D3D3';
                button.innerHTML = 'Show data Layer';

                this.toggleSliderControl(true)
            } else {
                const button = document.getElementById('button');
                button.style.backgroundColor = '#add8e6';
                button.innerHTML = 'hide data Layer';
                this.map.data.setStyle(this.getDataLayerStyle({
                    visible: this.dataLayerVisibility
                }));

                this.toggleSliderControl(false)
            }
        });

    }

    addOpacitySlider = () => new Slider().getBasicSlider(this.configureOpacitySlider, { min: 0, max: 100}, 'Opacity:', 100)

    configureOpacitySlider = (slider) => {
        slider.addEventListener('change', ({target}) => {
            document.getElementById('Opacity:Label').innerHTML = target.value;
            this.strokeOpacity = target.value / 100;
            this.map.data.forEach(feature => {
                this.map.data.overrideStyle(feature, {
                    strokeOpacity: this.strokeOpacity
                })
            })
        })
    }

    addElevationSlider = () => {
        const elevations = this.getAllElevation();

        const minMax = {
            min: Math.min(...elevations) - 1,
            max: Math.max(...elevations)
        }

        return new Slider().getBasicSlider(this.configureElevationSlider, minMax, 'Elevation:', minMax.max)
    }

    configureElevationSlider = (slider) => {
        slider.addEventListener('change', ({target}) => {
            const maxElevation = target.value;
            document.getElementById('Elevation:Label').innerHTML = target.value;

            this.map.data.setStyle((features) => {
                if (features.h.Elevation <= maxElevation) {
                    return this.getDataLayerStyle({
                        strokeColor: 'red'
                    });
                }
                return this.getDataLayerStyle({});
            })
        })
    }
}

export default DataLayer;