import React from 'react';

import {Actions} from 'react-native-router-flux';

import {Fab} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
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
class SaydMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getSt() {
    let name = await AsyncStorage.getItem('userName');

    this.setState({name: name});
  }

  componentDidMount() {
    this.getSt();
  }

  async componentWillMount() {
    this.get;
  }

  async cikisYap() {
    //this.deleteAccount();

    console.log('Zaaa gittim ki');

    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userID');

    console.log('Zaaa gittim ki');

    Actions.Login();
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View style={{width: 200}}>
          <TouchableOpacity
            onPress={() => Actions.profile()}
            style={{
              height: 70,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
              backgroundColor: 'rgb(255, 129, 38)',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  size={30}
                  style={{color: 'white'}}
                  name="person-circle-sharp"></Icon>
              </View>
              <View style={{flex: 0.7, justifyContent: 'center'}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  {this.state.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.drawer({type: 'reset'})}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, marginLeft: 7, alignItems: 'flex-end'}}>
                <ImageBackground
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                  }}
                  source={require('../images/logo2.png')}></ImageBackground>
              </View>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Home
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.editprofile()}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="options"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Edit Profile
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.security()}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Security
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.privacy()}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="lock-closed-outline"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Privacy
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.settings()}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="settings-outline"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Settings
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.help()}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Help
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.cikisYap();
            }}
            style={{
              height: 50,
              borderBottomColor: 'rgb(172, 172, 186)',
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="log-out-outline"></Icon>
              </View>
              <View style={{flex: 0.8, marginLeft: 5}}>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 15}}>
                  Log Out
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default SaydMenu;
