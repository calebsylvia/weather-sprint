'use client'
import React, { useEffect, useState } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { position } from '../Interfaces/Interfaces';

const MapComponent = ({lat, lng}: position) => {

    const [position, setPosition] = useState({ latitude: null, longitude: null })

    useEffect(() => {
        
    })

  return (
    <APIProvider apiKey={process.env.NODE_PUBLIC_MAP_KEY}>
      <Map defaultCenter={{lat, lng}} defaultZoom={14} key={new Date().getTime()}>
        
      </Map>
    </APIProvider>
  )
}

export default MapComponent