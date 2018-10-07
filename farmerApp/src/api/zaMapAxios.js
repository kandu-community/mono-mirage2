import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://mapit.code4sa.org/point/4326/`,
})

export async function locationGeoData(LatLng) {
    try {
        var response = await HTTP.get(`${LatLng.lat},${LatLng.lng}`)
        
        console.log('TCL: ------------------------------------------');
        console.log('TCL: locationGeoData -> response', response);
        console.log('TCL: ------------------------------------------');
        
    } catch (err) {
        console.log('TCL: -----------------------');
        console.log('TCL: }catch -> err', err);
        console.log('TCL: -----------------------');
    }
}