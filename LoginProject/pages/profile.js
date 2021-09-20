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

import getStorage from '../functions/loginfunc';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      name: '',
      surname: '',
      phonenumber: '',
      email: '',
      description: '',
      share: false,
      feminds: [],
      like: false,
      posts: [],
      commentbox: false,
      comment: '',
    };
  }

 




  async getSt() {
    let userID = await AsyncStorage.getItem('userID');
    let name = await AsyncStorage.getItem('userName');
    let surname = await AsyncStorage.getItem('surName');
    let phonenumber = await AsyncStorage.getItem('phoneNumber');
    let email = await AsyncStorage.getItem('eMail');

    this.setState({
      userID: userID,
      name: name,
      surname: surname,
      phonenumber: phonenumber,
      email: email,
    });

    this.getPost(userID);
  }

  async componentDidMount() {
    const ip = await getStorage('ip');

    this.setState({ip: ip});

    this.getSt();
  }

  begenenlerStringi(likes) {
    const begenildiMi = likes.find(like => like.userID == this.state.userID);

    let begenenlerYazi = '';

    if (likes.length > 0) {
      if (begenildiMi && likes.length - 1 > 0) {
        begenenlerYazi = `(Sen ve ${likes.length - 1} kişi daha beğendi)`;
      } else {
        begenenlerYazi = `(${likes.length} kişi beğendi)`;
      }
    }

    // this.likeMethod();

    return begenenlerYazi;
  }
  didILike(userID, likes) {
    console.log('userID', userID);

    const liked = likes.find(f => f.userID == userID);
    console.log('liked', liked);
    return liked != undefined ? liked : false;
  }

  async willLike(femind, index) {
    await this.setState({postID: femind.id});

    const begenildiMi = femind.likes.find(
      like => like.userID == this.state.userID,
    );

    if (begenildiMi) {
      femind.likes = femind.likes.filter(
        like => like.userID != this.state.userID,
      );
      console.log('begenildiMi1', begenildiMi);
      this.dislikeMethod(begenildiMi.id);
    } else {
      const likedUsers = femind.likes;
      this.likeMethod();

      femind.likes = [
        {userID: this.state.userID, like: true, name: 'Aybik'},
        ...likedUsers,
      ];
    }

    let feminds = this.state.feminds;

    feminds[index] = femind;

    this.setState({feminds: feminds});

    this.getPost();
    return true;
  }

  async likeMethod() {
    console.log('ID', this.state.ID);
    console.log('userID', this.state.userID);
    console.log('postID', this.state.postID);

    let data = await fetch('http://' + this.state.ip + '/api/likes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        userID: this.state.userID,
        postID: this.state.postID,
      }),
    }).then(data => data.json());
    console.log('data', data);
  }

  async sendComment() {
    console.log('ID', this.state.ID);
    console.log('userID', this.state.userID);

    let data = await fetch('http://' + this.state.ip + '/api/comment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        userID: this.state.userID,
        postID: this.state.postID,
        comment: this.state.comment,
      }),
    }).then(data => data.json());
    console.log('data', data);

    this.getPost();
    this.setState({comment: ''});
  }

  async dislikeMethod(x) {
    console.log('ID', x);
    console.log('userID', this.state.userID);
    console.log('postID', this.state.postID);

    let data = await fetch('http://' + this.state.ip + '/api/likes/' + x, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
    console.log('dislike', data);
  }

  async getPost(userID) {
    let data = await fetch(
      `http://${this.state.ip}/api/post?UserID=${userID}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(data => data.json());
    console.log('verileriAL', data);

    this.setState({posts: data});
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

            backgroundColor: 'gray',
          }}>
          <ScrollView>
            <View style={{backgroundColor: '#f3f3f3'}}>
              <View
                style={{
                  marginVertical: 20,
                  marginHorizontal: 30,
                  height: 150,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: 'rgb(172, 172, 186)',

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon size={100} name="person-circle"></Icon>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    marginTop: 40,
                    marginLeft: 20,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {this.state.name} {this.state.surname}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgb(172, 172, 186)',
                  borderTopColor: 'rgb(172, 172, 186)',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  height: 30,
                  paddingLeft: 20,
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  Personal Information
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{}}>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Name:
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Surname:
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Phone Number:
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      E-mail:
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>{this.state.name}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>{this.state.surname}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>{this.state.phonenumber}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>{this.state.email}</Text>
                  </View>
                </View>
              </View>
            </View>

            {this.state.posts.map((data, index) => {
              return (
                <View
                  style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 6,
                    margin: 10,
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: 7,
                      paddingLeft: 10,
                      height: 50,
                    }}>
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <Icon size={40} name="person-circle-sharp"></Icon>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 0.8,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                        }}>{`${data.name} ${data.surname}`}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            opacity: 0.6,
                            justifyContent: 'center',
                          }}>
                          <Icon name="ios-time-outline" size={17} />
                        </View>
                        <View
                          style={{
                            marginLeft: 3,
                          }}>
                          <Text style={{fontSize: 12, color: 'gray'}}>
                            {/* {moment(data.createdAt).format(
                              'DD.MM.YYYY HH.mm.ss',
                            )} */}
                            {moment(data.createdAt).fromNow()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{fontSize: 17, padding: 10, paddingVertical: 20}}>
                    {data.description}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      height: 30,
                      marginRight: 10,
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        let lst = '';
                        data.likes.map((data, index) => {
                          lst += '' + data.name + ' ' + data.surname + '\n';
                        });
                        {
                          Alert.alert('Beğenenler:', lst);
                        }
                      }}>
                      <Text style={{fontStyle: 'italic'}}>
                        {this.begenenlerStringi(data.likes)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgb(172, 172, 186)',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.willLike(data, index)}
                      style={{
                        flex: 0.5,
                        height: 30,
                      }}>
                      <View
                        style={{
                          borderTopWidth: 1,
                          borderTopColor: 'rgb(172, 172, 186)',
                          borderRightWidth: 1,
                          borderRightColor: 'rgb(172, 172, 186)',
                          flexDirection: 'row',
                        }}>
                        <View style={{flex: 0.3, alignItems: 'center'}}>
                          {this.didILike(this.state.userID, data.likes) ? (
                            <Icon
                              color="red"
                              size={25}
                              name="heart-sharp"></Icon>
                          ) : (
                            <Icon
                              color="black"
                              size={25}
                              name="heart-outline"></Icon>
                          )}
                        </View>
                        <View style={{flex: 0.7, justifyContent: 'center'}}>
                          <Text style={{fontStyle: 'italic'}}>Like</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({commentbox: data.id, postID: data.id})
                      }
                      style={{
                        flex: 0.5,
                        height: 30,
                      }}>
                      <View
                        style={{
                          borderTopWidth: 1,
                          borderTopColor: 'rgb(172, 172, 186)',

                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 0.7,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: 10,
                          }}>
                          <Text style={{fontStyle: 'italic'}}>Comment</Text>
                        </View>
                        <View
                          style={{
                            flex: 0.3,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon
                            size={25}
                            name="chatbubbles-outline"
                            style={{marginRight: 10}}></Icon>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {(data.comments || []).map((comment, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          borderBottomColor: 'rgb(172, 172, 186)',
                        }}>
                        <View
                          style={{
                            marginEnd: 5,
                            justifyContent: 'center',
                            margin: 15,
                          }}>
                          <TouchableOpacity>
                            <Icon
                              name="person-circle-sharp"
                              size={30}
                              style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}></Icon>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 15,
                            marginVertical: 10,
                            justifyContent: 'center',
                            flex: 0.9,
                          }}>
                          <Text style={{fontWeight: 'bold'}}>
                            {comment.name + ' ' + comment.surname}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              padding: 7,
                              flex: 1,
                              alignItems: 'flex-end',
                            }}>
                            {comment.comment}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View>
                    {this.state.commentbox == data.id ? (
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            marginEnd: 5,
                            justifyContent: 'center',
                            margin: 15,
                          }}>
                          <TouchableOpacity>
                            <Icon
                              name="person-circle-sharp"
                              size={30}
                              style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}></Icon>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 15,
                            marginVertical: 10,
                            borderColor: 'rgb(172, 172, 186)',
                            borderWidth: 1,
                            borderRadius: 6,
                            height: 40,
                            justifyContent: 'center',
                            flex: 0.9,
                          }}>
                          <TextInput
                            style={{
                              fontSize: 15,
                              padding: 7,
                              flex: 1,
                              height: 20,
                              alignItems: 'flex-end',
                            }}
                            value={this.state.comment}
                            onChangeText={val => this.setState({comment: val})}
                            placeholder="Comment..."></TextInput>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <TouchableOpacity onPress={() => this.sendComment()}>
                            <Icon size={20} name="send"></Icon>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
