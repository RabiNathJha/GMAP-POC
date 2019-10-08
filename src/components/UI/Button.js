class Button {

    getBasicButton = (onClick) => {
        const wrapper = document.createElement('div');

        const label = document.createElement('div');
        label.style.fontSize = '13px';
        label.style.fontWeight = '500';
        label.style.marginTop = '10px'
        label.innerHTML = 'Visibility:';

        const visibilityButton = document.createElement('button');
        visibilityButton.setAttribute('id','button');
        visibilityButton.style.fontSize = '9px';
        visibilityButton.style.padding = '7px';
        visibilityButton.style.backgroundColor = '#add8e6';
        visibilityButton.style.fontWeight = '600';
        visibilityButton.style.border = '0px solid grey';
        visibilityButton.style.borderRadius = '17px'
        visibilityButton.style.fontSize = '15px';
        visibilityButton.style.outline = 'none';
        visibilityButton.style.margin = '10px 0px 10px 25px';
        visibilityButton.innerHTML = 'Hide Data Layer';

        wrapper.appendChild(label);
        wrapper.appendChild(visibilityButton)

        onClick(visibilityButton);

        return wrapper;
    }
};

export default Button;