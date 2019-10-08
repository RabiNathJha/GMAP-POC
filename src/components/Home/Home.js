import React from 'react';

import MapService from '../../services';
import Map from '../Map';

const Home = () => {
    
    return(
        <Map
            service={new MapService()}
        />
    );
};

export default Home;