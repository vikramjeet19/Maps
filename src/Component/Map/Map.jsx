import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
    state = {
        selectedPlace: 'punjab',
    }

    render() {
        console.log(this.props.totalData)

      let markedData=  this.props.totalData.map(marker=>{
          if(typeof (marker) !== 'undefined'){
              return(<Marker
                name={'vicky'}
                key={Math.random()}
                position={{ lat: marker[0], lng: marker[1] }}
                title={'device'} />)
          }
           return;
        
        });

        return (    
            <Map google={this.props.google} 
            zoom={14}
            initialCenter={{
                lat: 21.7679,
                lng: 78.8718
            }}
            >
                <Marker
                    name={'Dolores park'}
                    position={{ lat: 37.759703, lng: -122.428093 }}
                    title={'dolores park'} />
            {markedData}
               
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDf4nIBlAk7u7z2kpZE-GkqM3W_8BM3Dk8')
})(MapContainer);