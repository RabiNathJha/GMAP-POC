import axios from 'axios';

class GeoJsonLoader {

    getContourDataSet() {
        return axios.get(`${process.env.CONTOUR_URL}`);
    }
};

export default GeoJsonLoader;