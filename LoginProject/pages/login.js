/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Actions} from 'react-native-router-flux';

import {Fab} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {firebase} from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-community/async-storage';

import getStorage from '../functions/loginfunc';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      editIP: false,
      email: '',
      password: '',
      ip: '192.168.1.158:3827',
      //' + this.state.ip + '
    };
  }

  componentDidMount() {
    getStorage('ip').then(ip => {
      this.setState({ip: ip});
    });
  }

  async signUp() {
    console.log('Name', this.state.name);
    console.log('Surname', this.state.surname);
    console.log('PhoneNumber', this.state.phonenumber);
    console.log('Email', this.state.email);
    console.log('Password', this.state.password);

    let data = await fetch('http://' + this.state.ip + '/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        phoneNumber: this.state.phonenumber,
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(data => data.json());
    console.log('data', data);

    if (data.id) {
      if (data.id > 0) {
        alert('You Signed Up!');
      }
    }
    Actions.Login();

    // <View
    //   style={{
    //     backgroundColor: 'rgba(255,255,255,.6)',
    //     margin: 10,
    //     height: 200,
    //     padding: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    //   <View
    //     style={{
    //       borderWidth: 0,
    //       padding: 3,
    //       borderRadius: 3,
    //       backgroundColor: 'rgba(255,255,255,.7)',
    //     }}>
    //     <Text style={{fontWeight: 'bold'}}>You signed up!</Text>
    //   </View>
    // </View>;
  }

  async loginButton() {
    console.log('Email', this.state.email);
    console.log('Password', this.state.password);

    let toka = await firebase.messaging().getToken();

    let data = await fetch('http://' + this.state.ip + '/api/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        toka: toka,
      }),
    }).then(data => data.json());
    console.log('data', data);

    if (data.result) {
      await AsyncStorage.setItem('userID', data.user.id.toString());
      await AsyncStorage.setItem('userName', data.user.name.toString());
      await AsyncStorage.setItem('surName', data.user.surname.toString());
      await AsyncStorage.setItem('password', data.user.password.toString());
      await AsyncStorage.setItem('eMail', data.user.email.toString());
      await AsyncStorage.setItem('toka', data.user.toka.toString());
      await AsyncStorage.setItem(
        'phoneNumber',
        data.user.phoneNumber.toString(),
      );
      setTimeout(() => {
        Actions.drawer({type: 'reset'});
      }, 500);
    } else {
      Alert.alert(
        'ATTENTION',
        'Email or password is wrong! Try again, please.',
      );
    }
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <ScrollView
          style={{
            backgroundColor: 'white',
            flex: 1,
            height: windowHeight,
          }}>
          <View>
            <ImageBackground
              style={{
                width: '100%',
                height: 200,
              }}
              source={require('../images/logo2.png')}></ImageBackground>
            <View
              style={{
                width: '100%',
                height: 90,
                opacity: 0.6,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 30,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                WELCOME!
              </Text>
            </View>
            {!this.state.editIP ? (
              <View>
                {this.state.signup ? (
                  <View
                    style={{
                      height: 50,
                      marginHorizontal: 30,
                      justifyContent: 'center',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginTop: 10,
                    }}>
                    <TextInput
                      value={this.state.name}
                      onChangeText={val => this.setState({name: val})}
                      style={{padding: 10, fontSize: 15}}
                      placeholder="Name..."
                    />
                  </View>
                ) : null}
                {this.state.signup ? (
                  <View
                    style={{
                      height: 50,
                      marginHorizontal: 30,
                      justifyContent: 'center',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginTop: 10,
                    }}>
                    <TextInput
                      value={this.state.surname}
                      onChangeText={val => this.setState({surname: val})}
                      style={{padding: 10, fontSize: 15}}
                      placeholder="Surname..."
                    />
                  </View>
                ) : null}
                {this.state.signup ? (
                  <View
                    style={{
                      height: 50,
                      marginHorizontal: 30,
                      justifyContent: 'center',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginTop: 10,
                    }}>
                    <TextInput
                      value={this.state.phonenumber}
                      onChangeText={val => this.setState({phonenumber: val})}
                      style={{padding: 10, fontSize: 15}}
                      keyboardType="numeric"
                      placeholder="Phone number..."
                    />
                  </View>
                ) : null}
                <View
                  style={{
                    height: 50,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                    marginTop: 10,
                  }}>
                  <TextInput
                    value={this.state.email.toString()}
                    onChangeText={val => this.setState({email: val})}
                    style={{padding: 10, fontSize: 15}}
                    placeholder="E-mail..."
                  />
                </View>
                <View
                  style={{
                    height: 50,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                    marginTop: 10,
                  }}>
                  <TextInput
                    value={this.state.password.toString()}
                    onChangeText={val => this.setState({password: val})}
                    style={{padding: 10, fontSize: 15}}
                    secureTextEntry={true}
                    placeholder="Password..."
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
                  {this.state.signup ? (
                    <Button
                      onPress={() => this.signUp()}
                      title="Sign up"
                      color="rgb(255, 129, 38)"
                    />
                  ) : (
                    <Button
                      onPress={() => this.loginButton()}
                      title="Login"
                      color="rgb(255, 129, 38)"
                    />
                  )}
                </View>
                <View style={{paddingBottom: 50}}>
                  {!this.state.signup ? (
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                      }}
                      onPress={() =>
                        this.setState({signup: true, email: '', password: ''})
                      }>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                          textDecorationLine: 'underline',
                        }}>
                        or Sign up
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                      }}
                      onPress={() => this.setState({signup: false})}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                          textDecorationLine: 'underline',
                        }}>
                        back to Login
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    width: 100,
                    alignSelf: 'flex-end',
                  }}
                  onPress={() => this.setState({editIP: true})}>
                  <View style={{paddingBottom: 30, flexDirection: 'row'}}>
                    <View style={{marginRight: 5, justifyContent: 'center'}}>
                      <Icon size={15} name="settings-outline"></Icon>
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                        }}>
                        Edit IP
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    height: 40,
                    marginHorizontal: 30,

                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                  }}>
                  <TextInput
                    value={this.state.ip}
                    onChangeText={async val => {
                      await this.setState({ip: val});
                      await AsyncStorage.setItem('ip', val);
                    }}
                    placeholder="IP..."
                    style={{margin: 3, padding: 3}}
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
                  <Button
                    onPress={() => this.setState({editIP: false})}
                    title="IP"
                    color="rgb(255, 129, 38)"
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Login;
