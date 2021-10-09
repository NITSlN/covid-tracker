import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'

export const sortData = (data) => {
  const sortedData = [...data]

  // Method 1

  // sortedData.sort((a,b)=>{
  //     // if a should appear before b than return negative number else positive
  //     if(a.cases>b.cases) return -1;
  //     return 1;
  // })

  // Method 2
  // if a should appear before b than return negative number else positive
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
  return sortedData
}

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 0.02,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 0.02,
  },
  deaths: {
    hex: "#fb4443", 
    multiplier: 1.1
  },
}

export const prettyPrint = (stat)=>(
  stat?`+${numeral(stat).format("0.0a")}`:"+0"
)

export const countryOnMap = (data, caseType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[caseType].hex}
      fillColor={casesTypeColors[caseType].hex}
      radius={
       country[caseType] * casesTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div className="flag"
            // className="info-flag"
            // style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ><img src={country.countryInfo.flag}></img></div>

          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>

    </Circle>
  ))
