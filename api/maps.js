import axios from "axios";

const GOOGLE_APP_KEY = process.env.REACT_APP_GOOGLE_KEY;

export function createStaticMap(lat,lng,zoom =16){
    // size:mid%7C
    // label:P%7CTok
    //color:0x007969%7C
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=400x400&markers=color:red%7Clabel:P%7C${lat},${lng}&key=${GOOGLE_APP_KEY}`;
}

export async function getAddresses(lat,lng){
    const req = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${GOOGLE_APP_KEY}`;

    const rcv = await axios.get(req);

    return rcv.data.results[0]
}