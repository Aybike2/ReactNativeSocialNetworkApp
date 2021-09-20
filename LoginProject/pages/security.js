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

export default class Security extends Component {
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
          {/* <ImageBackground
            style={{
              width: windowWidth,
              height: windowHeight,

            }}
            source={require('../images/logo2.png')}> */}
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
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Protecting your Email
                </Text>

                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  Your email address identifies your account. It's important
                  that you protect your email addresses and passwords since this
                  is sensitive information that can grant access to your emails,
                  financial information, and other sensitive online data.
                  Include your personal contact information only in the
                  designated fields of your profile.
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
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Protecting yourself from Fraudulent Messages, Scams & Phishing
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  There are precautions you should keep in mind when reading and
                  responding to messages you receive. For example, when
                  searching for jobs online, be wary of recruiters who ask you
                  to send copies of personal identifiable information to an
                  email address that isn't associated with the company, as well
                  as requests to wire or transfer money for an application fee.
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
                  name="shield-checkmark-outline"></Icon>
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
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  Identity thieves try to steal personal information through a
                  variety of methods, including sending phishing emails that
                  impersonate legitimate people or companies in order to trick
                  people into giving out passwords, credit card numbers, or
                  other sensitive information. Never provide sensitive
                  information to others via email or chat. You can also prevent
                  identity theft by keeping this type of personal information to
                  yourself and not entering it on public networks or where
                  multiple people share the same computer.
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
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Malware Prevention
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  Malicious software, or "malware," is software designed to harm
                  your computer or gain access to your sensitive information. It
                  can be placed on your computer without your knowledge through
                  phishing, spam, or other similar tactics. The best way to
                  avoid malware is by not downloading it in the first place.
                  Tips for avoiding malware include only downloading files from
                  websites you trust and not clicking links on suspicious
                  websites or in email messages.
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
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Protect Your Account
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  Changing your password periodically, using strong passwords,
                  and enabling two-step verification can help keep your account
                  secure and prevent unauthorized access.
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
                  name="shield-checkmark-outline"></Icon>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'rgb(60, 60, 60)',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Make Meaningful Connections
                </Text>
                <Text style={{color: 'rgb(60, 60, 60)', fontSize: 12}}>
                  The app seeks to connect professionals to others they know and
                  trust. To get the most out of your network, make sure you only
                  connect with someone if you trust them with your personal
                  contact information.
                </Text>
              </View>
            </View>
          </ScrollView>
          {/* </ImageBackground> */}
        </View>
      </SafeAreaView>
    );
  }
}
