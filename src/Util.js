import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort(((a, b) => a.cases > b.cases ? -1 : 1));

    // this is the second style of coding

    // sortedData.sort((a,b) =>{
    //     if(a.cases > b.cases){
    //         return -1;
    //     }
    //     else{
    //         return 1;
    //     }
    // });
    // return sortedData;

    // this is the second style of coding
}


// Draw circles on the map with interactive tooltip
const casesTypeColors = {
    cases: {
        hex: "#fb4443",
        multiplier: 1200,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1000,
    },
    deaths: {
        hex: "#CC1034",
        multiplier: 2000,
    },

}

export const showDataOnMap = (data, casesType = "cases") => (
    data.map((country,index)=> (
        <Circle
            key={index+1}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpecity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirm">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deceased">Deceased: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
)