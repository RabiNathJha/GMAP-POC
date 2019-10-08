class ControlWrapper {

    getControlWrapper = (childrens, placeControlPanel) => {
        var controlWrapper = document.createElement('div');

        const label = document.createElement('div');
        label.style.fontSize = '13px';
        label.style.fontWeight = '500';
        label.style.marginLeft = '-40px';
        label.style.backgroundColor = '#1e88e5';
        label.style.color = 'white';
        label.style.padding = '5px';
        label.innerHTML = 'Control Panel:';

        controlWrapper.style.backgroundColor = 'rgba(255,255,255,0.75)';
        controlWrapper.style.width = '220px';
        controlWrapper.style.padding = '10px 10px 15px 30px';
        controlWrapper.style.border = '3px solid grey';
        controlWrapper.style.marginLeft = '-65px';
        controlWrapper.style.marginBottom = '5px';

        controlWrapper.appendChild(label);

        childrens.forEach(children => {
            controlWrapper.appendChild(children);
            controlWrapper.appendChild(document.createElement('div'));
        })
        // controlWrapper.appendChild(childrens[0]);
        // controlWrapper.appendChild(document.createElement('div'));
        // controlWrapper.appendChild(childrens[1]);

        placeControlPanel(controlWrapper);
    }
}

export default ControlWrapper;