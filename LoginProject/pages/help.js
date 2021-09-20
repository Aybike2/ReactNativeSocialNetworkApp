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

export default class Help extends Component {
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
            backgroundColor: '#f9f9f9',
            opacity: 0.8,
          }}>
          <ScrollView>
            <View
              style={{
                marginTop: 20,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Types of Restrictions for Sending Invitations
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Your Profile, Settings, Data and Privacy
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  We have invitation limits in place to protect our overall
                  member experience and to ensure that our members only receive
                  relevant requests Your account may be temporarily restricted
                  from sending invitations…
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Search on App
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Global Nav, Search, Basics
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  The Search bar can be seen at the top of any page you’re
                  viewing, and it allows you to search for people, jobs,
                  companies, posts, and more. You can click any of the
                  suggestions that appear in the dropdown…
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Public Profile Visibility
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Your Profile, Settings, Data and Privacy
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  Important: After you make changes or edits to your public
                  profile, it can take several weeks or months at times for
                  search engines like Google, Yahoo, or Bing to detect changes
                  and refresh. The app doesn’t control…
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Edit Your Profile
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Basics, Your Profile
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  You can edit individual sections of your profile to best
                  reflect your professional experience. To edit sections on your
                  profile from your desktop: Click the Me icon at the top of
                  your homepage…
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Merge or Close Duplicate Accounts
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Account Access
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  You may discover you have more than one account. If you get a
                  message that says the email address you're attempting to use
                  is already in use, then you may have another account using
                  that email…
                </Text>
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgb(172, 172, 186)',
                backgroundColor: '#f3f3f3',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View style={{marginLeft: 15, marginTop: 10, marginRight: 10}}>
                <Icon
                  size={20}
                  style={{color: 'rgb(60, 60, 60)'}}
                  name="information-circle-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Homepage - FAQs
                </Text>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    opacity: 0.8,
                    fontSize: 10,
                  }}>
                  Your Profile, Settings, Data and Privacy
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  The app experience was designed so you can easily surface
                  ideas, drive conversations, and discover topics you care
                  about. Your homepage is the landing page you reach when you
                  first sign in to your account...
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
