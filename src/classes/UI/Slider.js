class Slider {

    getBasicSlider = (onChange, {min, max}, name, currentValue, value=100) => {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '8px'

        const label = document.createElement('div');
        label.style.fontSize = '13px';
        label.style.fontWeight = '500';
        label.innerHTML = name;

        const selectedRangeLabel = document.createElement('label');
        selectedRangeLabel.setAttribute('id',`${name}Label`);
        selectedRangeLabel.style.fontSize = '8px';
        selectedRangeLabel.style.fontWeight = '400';
        selectedRangeLabel.style.backgroundColor = '#add8e6';
        selectedRangeLabel.style.color = 'black';
        selectedRangeLabel.style.marginLeft = '5px';
        selectedRangeLabel.style.padding = '3px';
        selectedRangeLabel.style.borderRadius = '3px';
        selectedRangeLabel.innerHTML = `${currentValue}`;

        label.appendChild(selectedRangeLabel);

        const minLabel = document.createElement('label');
        minLabel.style.fontSize = '8px';
        minLabel.style.fontWeight = '400';
        minLabel.style.backgroundColor = '#add8e6';
        minLabel.style.color = 'black';
        minLabel.style.padding = '3px';
        minLabel.style.borderRadius = '3px';
        minLabel.innerHTML = `${min}`;

        var slider = document.createElement('input');
        slider.setAttribute('type','range');
        slider.setAttribute('min',`${min}`);
        slider.setAttribute('max',`${max}`);
        slider.setAttribute('value',`${value}`);
        slider.setAttribute('id',`${name}Slider`);
        slider.style.padding = '7px';
        slider.style.backgroundColor = 'white';
        slider.style.outline = 'none';
        slider.style.marginTop = '15px';
        slider.style.marginLeft = '5px';

        const maxLabel = document.createElement('label');
        maxLabel.style.fontSize = '8px';
        maxLabel.style.fontWeight = '400';
        maxLabel.style.backgroundColor = '#add8e6';
        maxLabel.style.color = 'black';
        maxLabel.style.padding = '3px';
        maxLabel.style.borderRadius = '3px';
        maxLabel.innerHTML = `${max}`;

        wrapper.appendChild(label);
        wrapper.appendChild(minLabel);
        wrapper.appendChild(slider);
        wrapper.appendChild(maxLabel);

        onChange(wrapper);

        return wrapper;
    }
}

export default Slider;