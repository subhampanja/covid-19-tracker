import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
}
  from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'
import { sortData } from './Util'
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 22.5726,
    lng: 88.3639,
  }); // setted kolkata lat and long;
  const [mapZoom, SetMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data); // we set the state with worldwide data
      })
  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // Full form INDIA , UNITED STATE , 
            value: country.countryInfo.iso2, // Short form IN , USA ,UK
          }))
          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
          setMapCountries(data);
        })
    }
    getCountriesData(); // calling the get countries function
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value; // we got the clicked country short code
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data); // we set the state with worldwide data
        setCountry(countryCode); // we set the state with the short code of the country
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]); // we set the state with the country lat and long
        SetMapZoom(6); // we set the state for a zoom in to the country 
      })
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={e => setCasesType('cases')}
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />
          <InfoBox
            active={casesType === "recovered"}
            onClick={e => setCasesType('recovered')}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={e => setCasesType('deaths')}
            title="Deceased"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} /><br />
          <h3>Worldwide New {casesType === "cases" ? "Cases" : casesType === "recovered" ? "Recovered" : casesType === "deaths" ? "Deceased" : ""}</h3>
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
