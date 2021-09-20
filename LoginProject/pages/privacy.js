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

export default class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: '',
      newpassword: '',
      newpassword2: '',
      userID: 0,
      name: '',
      surname: '',
      phonenumber: '',
      email: '',
    };
  }

  async getSt() {
    let userID = await AsyncStorage.getItem('userID');
    let password = await AsyncStorage.getItem('password');

    this.setState({
      userID: userID,
      password: password,
    });
  }

  componentDidMount() {
    this.getSt();
  }

  async changePassword() {
    console.log('changeeee');
    console.log('userID', this.state.userID);
    console.log('password', this.state.password);
    console.log('currentpassword', this.state.currentpassword);
    console.log('newpassword', this.state.newpassword);

    let data = await fetch('http://' + this.state.ip + '/api/user', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        password: this.state.newpassword,
        name: this.state.name,
        surname: this.state.surname,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
      }),
    }).then(data => data.json());
    console.log('data', data);
  }

  // async changePasswordTest() {
  //   // {
  //   //   this.state.currentpassword == this.state.password ?
  //   this.changePassword();
  //   //     : alert('hata');
  //   // }
  // }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,
            opacity: 0.8,
            backgroundColor: '#f9f9f9',
          }}>
          {/* <ImageBackground
            style={{
              width: windowWidth,
              height: windowHeight,
              opacity: 0.6,
            }}
            source={require('../images/logo2.png')}> */}
          <View
            style={{
              width: '100%',
              height: 90,
            }}>
            <Text
              style={{
                paddingTop: 50,
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 25,
                marginLeft: 30,
                opacity: 0.8,
              }}>
              Change Your Password:
            </Text>
          </View>

          <View
            style={{
              height: 50,
              marginHorizontal: 30,
              justifyContent: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#black',
              marginTop: 50,
              backgroundColor: '#f3f3f3',
            }}>
            <TextInput
              value={this.state.currentpassword}
              onChangeText={val => this.setState({currentpassword: val})}
              style={{padding: 10, fontSize: 15}}
              placeholder="Current Password..."
            />
          </View>

          <View
            style={{
              height: 50,
              marginHorizontal: 30,
              justifyContent: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#black',
              marginTop: 50,
            }}>
            <TextInput
              value={this.state.newpassword}
              onChangeText={val => this.setState({newpassword: val})}
              style={{padding: 10, fontSize: 15}}
              placeholder="New Password..."
            />
          </View>
          <View
            style={{
              height: 50,
              marginHorizontal: 30,
              justifyContent: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#black',
              marginTop: 10,
              backgroundColor: '#f3f3f3',
            }}>
            <TextInput
              value={this.state.newpassword2}
              onChangeText={val => this.setState({newpassword2: val})}
              style={{padding: 10, fontSize: 15}}
              secureTextEntry={true}
              placeholder="New Password Again..."
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'rgb(255, 129, 38)',
              backgroundColor: '#f3f3f3',
            }}>
            <Button
              onPress={() => this.changePassword()}
              title="Change"
              color="rgb(255, 129, 38)"
            />
          </View>
          {/* </ImageBackground> */}
        </View>
      </SafeAreaView>
    );
  }
}
