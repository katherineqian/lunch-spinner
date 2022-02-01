import Image from 'next/image'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"

function Card(props) {
  const { selected, google } = props

  return ( 
    <div id="card" className="border border-gray-200 rounded-lg">

      <div id="card-header" className="w-full h-40 relative">
        <Image src={selected.photograph} alt="Restaurant Image" layout='fill' objectFit='cover' className="rounded-t-lg"/>
      </div>

      <div id="card-body" className="w-full p-5">
        <div className="flex flex-wrap items-baseline mb-1">
          <h1 className="font-bold text-xl mr-3">{selected.name}</h1>
          <p>{selected.cuisine_type}</p>
        </div>
        <p className="text-sm text-gray-500">{selected.neighborhood} | {selected.address} </p>
        <a href={selected.url} target='_blank' rel='noreferrer noopener' className="text-sm text-gray-500 underline">Website</a>

        <div className="rounded-lg bg-gray-100 px-5 py-3 mt-3">
          <p className="">Hours</p>
          <div className="xs:columns-2">
            <p className="text-sm">Mon: {selected.operating_hours.Monday} </p>
            <p className="text-sm">Tue: {selected.operating_hours.Tuesday} </p>
            <p className="text-sm">Wed: {selected.operating_hours.Wednesday} </p>
            <p className="text-sm">Thu: {selected.operating_hours.Thursday} </p>
            <p className="text-sm">Fri: {selected.operating_hours.Friday} </p>
            <p className="text-sm">Sat: {selected.operating_hours.Saturday} </p>
            <p className="text-sm">Sun: {selected.operating_hours.Sunday} </p>
            </div>
        </div>
        
        <div className="w-full h-36 mt-5 rounded-lg overflow-hidden">
          <Map 
            google={google} 
            zoom={14}
            containerStyle = {{
              position: 'relative',  
              width: '100%',
              height: '100%'
            }}
            initialCenter = {selected.latlng} > 
            <Marker
              title={selected.name}
              name={selected.name}
              position={selected.latlng} />
          </Map>
        </div>
        
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS
})(Card)