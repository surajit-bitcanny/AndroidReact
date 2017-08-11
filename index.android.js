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
    TouchableHighlight
} from 'react-native';

global.Buffer = require('buffer').Buffer;
const c = require('./central');

export default class ReactAndroid extends Component {

    constructor(props){
        super(props)
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

          <TouchableHighlight style={{padding: 20, backgroundColor: '#ccc'}}
                              onPress={() => this.onPressConnect()}>
              <Text>Connect</Text>
          </TouchableHighlight>

          <TouchableHighlight style={{padding: 20, backgroundColor: '#ccc'}}
                              onPress={() => this.onPressDisconnect()}>
              <Text>Disconnect</Text>
          </TouchableHighlight>

      </View>
    );
  }

    onPressConnect(){

        c.on('scanComplete', () => {
            c.connect('06:ce:09:41:b3:e7');
        });

        c.on('connect', () => {
            c.send({ m : 'sc',
                n : 12345678910,
                s : 4,
                g : this.bytes(1000),
                c : 54321
            })
        });


        c.on('data', (characteristic, data) => {
            console.log('\nWe got data from ' + characteristic.uuid + ': ' + JSON.stringify(data));
        });

        c.on('error',(data)=>{
            console.log("Error : "+data);
        });

        c.startScanning();
    }
    onPressDisconnect(){
        c.disconnect('06:ce:09:41:b3:e7');
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
