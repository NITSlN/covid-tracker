import React, { useEffect, useState } from 'react'
import { MenuItem, FormControl, Select,CardContent, Card } from '@mui/material'
import './App.css'
import Infobox from './component/Infobox'
import Map from './component/Map'
import Table from './component/Table'
import LineGraph from './component/LineGraph'
import { sortData } from './utils'
import "leaflet/dist/leaflet.css"

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 21, lng: 82 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");



  useEffect(() => {
        
    // This is to fetch the data for worldwide when the page first loads up
    fetch('https://disease.sh/v3/covid-19/all')
      .then((res)=>res.json())
      .then((data)=>{
      
        setCountryInfo(data)
      
      })
  },[])

  
  useEffect(() => {

    // This is to fetch the lists of country on the dropdown
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          
          
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          
          const sortedData = sortData(data)
          
          setMapCountries(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])
  console.log(mapCountries)

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)
    const url = countryCode==='worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
        setCountryInfo(data)
        if(countryCode==='worldwide') setMapCenter({ lat: 40, lng: 30 }); 
        else setMapCenter([data.countryInfo.lat, data.countryInfo.long]);        
        
      })
    }


  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select 
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country) => {
                  return <MenuItem value={country.value}>{country.name}</MenuItem>
              })
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title="Corona Virus Cases" isRed active={casesType==="cases"} cls="cases" onCaseChange={(e)=>setCasesType("cases")} cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Infobox title="Recovered" active={casesType==="recovered"} cls="recovered" onCaseChange={(e)=>setCasesType("recovered")} cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Infobox title="Deaths" isRed active={casesType==="deaths"} cls="deaths" onCaseChange={(e)=>setCasesType("deaths")} cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
        countries={mapCountries}
        />

      </div>

      <Card className="app__right">
        <CardContent>
          <h2>Total Cases by Country</h2>
              <Table data={tableData}/>
          <h2>WorldWide new {casesType}</h2> 
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
      
    </div>
  )
}

export default App
