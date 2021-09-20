import {Drawer} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  View,
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,
            backgroundColor: '#f5f5f5',
          }}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              height: 150,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'rgb(255, 129, 38)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon size={100} name="person-circle"></Icon>
          </View>

          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'rgb(255, 129, 38)',
            }}>
            <Button
              onPress={() => alert('  ')}
              title="Take Photo"
              color="rgb(255, 129, 38)"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'rgb(255, 129, 38)',
            }}>
            <Button title="Add from Gallery" color="rgb(255, 129, 38)" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
