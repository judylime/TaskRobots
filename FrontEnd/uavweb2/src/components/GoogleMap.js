import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

//TODO: re-style it
const mapStyles = {
    width: '1000px',
    height: '500px',
};

export class MapContainer extends Component {
    render() {
        return (
            <Map 
                google={this.props.google}
                style={mapStyles}
                zoom={12.8}
                initialCenter={{
                    lat: 37.7749,
                    lng: -122.4194
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC71ITh_3ZLZ8FONu8HU_qDAF5X4uVIlu4'
})(MapContainer);