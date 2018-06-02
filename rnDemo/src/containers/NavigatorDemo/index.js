import React, { Component } from 'react'
import { View, Text, Button, FlatList, NativeModules } from 'react-native'
import Geocoder from 'react-native-geocoder'

import styles from './styles'

export default class Driver extends Component {
  constructor(props) {
    super(props)
  
  }
  
  handleGetGeco = async index => {
  /* navigator.geolocation.getCurrentPosition(
      initialPosition => {
        console.log(initialPosition)
        const NY = {
          lat: 40.7809261,
          lng: -73.9637594
        }
        // var s = Geocoder.geocodePosition(NY)
        console.log('Geocoder:', Geocoder)
        console.log('NativeModules:', NativeModules)
        var s = Geocoder && Geocoder.geocodePosition( {
          lat: 40.7809261,
          lng: -73.9637594
        })
        console.log('ssssssS:', s)
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )*/
    console.log('Geolocation:', Geolocation)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button primary onPress={this.handleGetGeco} title='获取经纬度'>
        </Button>
      </View>

    )
  }
}
