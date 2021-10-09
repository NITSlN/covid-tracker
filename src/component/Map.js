import React from 'react'
import { Map as MapContainer, TileLayer,CircleMarker } from 'react-leaflet'
import './Map.css'
import {countryOnMap} from '../utils'
function Map({countries,casesType,center,zoom}) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countryOnMap(countries,casesType)}
      </MapContainer>
    </div>
  )
}

export default Map

// browser support problem had to modify the pakage.json and delete .cache form node modules folder
