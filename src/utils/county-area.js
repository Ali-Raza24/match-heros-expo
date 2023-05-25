import counties from "../component/_shared/Counties"

export const getCounty = (id) => {
    const county = counties.find(county => county.id === Number(id));
    return county ? county : ''
}

export const getCities = (countyId, cityId) => {
    if (!countyId && !cityId) {
        return '';
    }
    const area = getCounty(countyId).cities.find(city => city.id === Number(cityId));
    return area ? area : '';
} 