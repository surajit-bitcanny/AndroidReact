/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Button,
    TouchableHighlight,
    PermissionsAndroid,
    Platform
} from 'react-native';

global.Buffer = require('buffer').Buffer;
const c = require('./central');

export default class ReactAndroid extends Component {

    constructor(props){
        super(props)
        this.checkPermission();
        this.setupBluetooth();
    }

    bytes(size) {
        var str = '';
        for(let i = 0; i < size; i++) {
            str += 'a';
        }
        return str;
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

          <TouchableHighlight style={{padding: 20,margin:20, backgroundColor: '#ccc'}}
                              onPress={() => this.onPressConnect()}>
              <Text>Connect</Text>
          </TouchableHighlight>

          <TouchableHighlight style={{padding: 20,margin:20, backgroundColor: '#ccc'}}
                              onPress={() => this.onPressDisconnect()}>
              <Text>Disconnect</Text>
          </TouchableHighlight>

          <TouchableHighlight style={{padding: 20,margin:20, backgroundColor: '#ccc'}}
                              onPress={() => this.onPressWrite()}>
              <Text>Write Data</Text>
          </TouchableHighlight>

      </View>
    );
  }

  setupBluetooth(){
      c.on('scanComplete', () => {
          c.connect('06:ce:09:41:b3:e7');
      });

      c.on('connect', () => {
          console.log("Successfully connected...");
      });


      c.on('data', (characteristic, data) => {
          console.log('\nWe got data from ' + characteristic.uuid + ': ' + JSON.stringify(data));
      });

      c.on('error',(data)=>{
          console.log("Error : "+data);
      });
  }

    onPressWrite(){
        console.log("Sending data...");
        c.send({ m : 'sc',
            n : 12345678910,
            s : 4,
            g : this.bytes(1000),
            c : 54321
        });
    }

    onPressConnect(){

        c.startScanning();
    }

    onPressDisconnect(){
        c.disconnect('06:ce:09:41:b3:e7');
    }

    checkPermission() {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    this.showMessage("Permission is OK");
                } else {
                    /*PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            this.showMessage("Location permission accept");
                        } else {
                            this.showMessage("Location permission refuse");
                        }
                    });*/
                    this.requestLocationPermission();
                }
            });
        }
    }

    showMessage(msg){
        console.log(msg);
    }

     requestLocationPermission() {
        try {

            const granted =  PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'Need location permission for bluetooth access'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission granted...")
            } else {
                console.log("Location permission denied...")
            }

        } catch (err) {
            console.warn(err)
        }
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactAndroid', () => ReactAndroid);

//AppRegistry.registerComponent('ReactAndroid', () => App);
