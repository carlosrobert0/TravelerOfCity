import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCaoRdht6e1kmLXd97Hw_dpu_UotHHhJuI"
  })
  
  const position = {
    lat: -27.594795053553483, 
    lng: -48.556377676987005
  }
  return (
    isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={position}
        zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        <Marker position={position} options={{
          label: {
            text: 'Teste',
          }
        }}/>
      </GoogleMap>
  ) : <></>
  )
}