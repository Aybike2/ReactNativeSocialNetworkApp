/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
  Router,
  Scene,
  Drawer,
  Stack,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './pages/login';
import Welcome from './pages/welcome';
import SaydMenu from './pages/saydmenu';
import {Root} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import {LogBox, View, Text, Settings} from 'react-native';
import Profile from './pages/profile';
import EditProfile from './pages/editprofile';
import Security from './pages/security';
import Privacy from './pages/privacy';
import settings from './pages/settings';
import Help from './pages/help';
import {firebase} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: AsyncStorage.getItem('userName'),
    };
  }

  componentWillMount() {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  async componentDidMount() {
    this.checkPermission();

    firebase.messaging().onMessage(response => {
      console.log('notiiii', JSON.stringify(response));

      if (response.notification.title !== 'yenileme') {
        PushNotification.localNotification({
          title: response.notification.title,
          message: response.notification.body,
          channelId: 'channel-id',
        });
      }
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log(
        'perm kontrol get tooken',
        await firebase.messaging().getToken(),
      );
    } else {
      this.requestPermissions();
    }
  }

  async requestPermissions() {
    try {
      await firebase.messaging.requestPermission();
      console.log('bildirim izni verilmiş');
    } catch (error) {
      console.log('bildirim izni verilmemiş');
    }
  }

  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene
              key="Login"
              navigationBarStyle={{
                backgroundColor: 'rgb(255, 129, 38)',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Login"
              component={Login}
              initial
            />
            <Drawer
              type="reset"
              hideNavBar
              key="drawer"
              //backgroundColor: '#168980'
              style={{backgroundColor: 'rgb(240, 240, 240)'}}
              contentComponent={SaydMenu}
              drawerWidth={200}>
              <Scene hideNavBar panHandlers={null}>
                <Scene
                  hideNavBar={false}
                  key="sdfsdf"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Home'}
                  component={Welcome}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{
                            marginLeft: 15,
                            justifyContent: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <Scene
                  hideNavBar={false}
                  key="profile"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Profile'}
                  component={Profile}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <Scene
                  hideNavBar={false}
                  key="editprofile"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Edit Profile'}
                  component={EditProfile}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="security"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Security'}
                  component={Security}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="privacy"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Privacy'}
                  component={Privacy}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="settings"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Settings'}
                  component={settings}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="help"
                  navigationBarStyle={{
                    backgroundColor: 'rgb(255, 129, 38)',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Help'}
                  component={Help}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </Scene>
            </Drawer>
          </Scene>
        </Router>
      </Root>
    );
  }
}

export default App;
