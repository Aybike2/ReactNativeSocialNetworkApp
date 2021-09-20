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
import {firebase} from '@react-native-firebase/messaging';

import getStorage from '../functions/loginfunc';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      share: false,
      feminds: [],
      like: false,
      userID: 0,
      posts: [],
      commentbox: false,
      comment: '',
      comArrays: [],
      toka: '',
      users: [],
      tokens: [],
      username: '',
      buKullaniciAdi: '',
    };
  }

  async getToka() {
    let users = await fetch('http://' + this.state.ip + '/api/post/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
    console.log('tokenleri al', users);

    const tokens = new Set(users.map(user => user.toka).filter(f => f));

    this.setState({users: users, tokens: tokens});

    console.log(tokens);
  }
  //////// Set Yapısı

  // const adizisi = [12, 22, 13, 13, 16, 18, 22, 'ay', 'ay'];

  // const aa = new Set(adizisi);
  // console.log(aa);

  async componentWillMount() {
    const ip = await getStorage('ip');

    this.setState({ip: ip});

    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');

    this.setState({userID: userID});
    console.log('dsf', userID);
    this.getPost();

    console.log(this.props);
    this.props.navigation.setParams({
      title: userName,
    });
    this.setState({buKullaniciAdi: userName, userName: userName});

    const toka = await AsyncStorage.getItem('toka');
    console.log('token', toka);
    this.setState({toka: toka});

    this.getToka();
  }

  // {
  //   comment ? (
  //     <View style={{flexDirection: 'row'}}>
  //       <View style={{flex: 0.1}}>
  //         <Icon name="person-circle-sharp"></Icon>
  //       </View>
  //       <View style={{flex: 0.9}}>
  //         <TextInput></TextInput>
  //       </View>
  //     </View>
  //   ) : null;
  // }

  componentDidMount() {
    firebase.messaging().onMessage(response => {
      console.log('notiiii', JSON.stringify(response));
      this.getPost();
    });
  }

  async sendPost() {
    console.log('ID', this.state.ID);
    console.log('userID', this.state.userID);
    //1console.log('token', toka);

    let data = await fetch('http://' + this.state.ip + '/api/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        userID: this.state.userID,
        description: this.state.description,
      }),
    }).then(data => data.json());
    console.log('data', data);

    this.getPost();

    let tokalar = this.state.tokens;

    tokalar.forEach(toka => {
      this.zaa(
        this.state.userName + ' gönderi paylaştı:',
        this.state.description,
        toka,
      );
    });

    this.setState({description: ''});
  }
  /*
  async getComment() {
    let data = await fetch('http://localhost:44334/api/comment/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
    console.log('list comment', data);

    this.setState({comments: data});
  }
  */
  async sendComment(postData) {
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

    let posttakiKulallaniciToken = postData.toka;
    this.zaa(
      postData.name + ' gönderinize yorum yaptı:',
      this.state.comment,
      posttakiKulallaniciToken,
    );

    this.getPost();
    this.setState({comment: ''});
  }

  // async willComment(comArray, index) {
  //   await this.setState({postID: comArray.id});

  //   const didComment = comArray.comments.find(
  //     comment => comment.userID == this.state.userID,
  //   );

  //   if (didComment) {
  //     comArray.comments = comArray.comment.filter(
  //       comment => comment.userID != this.state.userID,
  //     );
  //     console.log('yorum yapıldı mı', didComment);
  //   } else {
  //     const commentedUsers = comArray.comments;

  //     comArray.comments = [
  //       {userID: this.state.userID, comment: true, name: 'Aybik'},
  //       ...commentedUsers,
  //     ];
  //   }

  //   let comArrays = this.state.comArrays;

  //   comArrays[index] = comArray;

  //   this.setState({comArrays: comArrays});

  //   this.getComment();
  //   return true;
  // }

  async willLike(femind, index, postData) {
    await this.setState({postID: femind.id});

    const begenildiMi = femind.likes.find(
      like => like.userID == this.state.userID,
    );

    console.log('data geldi', begenildiMi);

    if (begenildiMi) {
      femind.likes = femind.likes.filter(
        like => like.userID != this.state.userID,
      );
      console.log('begenildiMi1', begenildiMi);
      this.dislikeMethod(begenildiMi);
    } else {
      const likedUsers = femind.likes;

      femind.likes = [
        {userID: this.state.userID, like: true, name: 'Aybik'},
        ...likedUsers,
      ];

      this.setState({});

      this.likeMethod(postData);
    }

    let feminds = await this.state.feminds;

    feminds[index] = femind;

    await this.setState({feminds: feminds});

    // this.getPost();
    return true;
  }

  async likeMethod(postData) {
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

    let posttakiKulallaniciToken = postData.toka;
    this.zaa(
      'Bilgi',
      this.state.buKullaniciAdi + ' gönderinizi beğendi!',
      posttakiKulallaniciToken,
    );
  }

  async dislikeMethod(postData) {
    console.log('ID', this.state.ID);
    console.log('userID', this.state.userID);
    console.log('postID', this.state.postID);

    let data = await fetch(
      'http://' + this.state.ip + '/api/likes/' + postData.id,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(data => data.json());
    console.log('dislike', postData);

    let tokalar = this.state.tokens;
    tokalar.forEach(toka => {
      this.zaa('yenileme', '', toka);
    });
  }

  async getPost() {
    let data = await fetch('http://' + this.state.ip + '/api/post/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
    console.log('verileriAL', data);

    this.setState({posts: data});
  }

  begenenlerStringi(likes) {
    const begenildiMi = likes.find(like => like.userID == this.state.userID);

    let begenenlerYazi = '';

    if (likes.length > 0) {
      if (begenildiMi && likes.length - 1 > 0) {
        begenenlerYazi = `(You and ${likes.length - 1} likes)`;
      } else {
        begenenlerYazi = `(${likes.length} likes)`;
      }
    }

    // this.likeMethod();

    return begenenlerYazi;
  }
  didILike(userID, likes) {
    console.log('userID', userID);

    const liked = likes.find(f => f.userID == userID);
    console.log('liked', liked);
    // javascript arraylerde filter, find, forEach araştır

    // const a = []

    //a.filter(a => a.abc == '23') array döner filtreleme yapar
    //a.find()

    // a.forEach((a => {

    // }))

    return liked != undefined ? liked : false;
  }

  async shareFemind() {
    /*
    const feminds = [
      {description: this.state.description, likes: []},
      ...this.state.feminds,
    ];
    await this.setState({share: true, feminds: feminds, description: ''});

    console.log(this.state.feminds);
    */
  }

  async zaa(baslik, mesaj, token) {
    //if (baslik != 'yenileme') {
    let data = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAdyz1atA:APA91bHwqlMCGAvqA393G7uvPbk-EqupYFtojSyY0NzWeIA5bJWXazXnbImYTqCN_NbXzI3LRY56c_VM2lnHwgBk1lzdHd69M65aNqQ56XPWE0J5ne6LpbnKwKQlDtqYkIKBbNGgh8bM',
      },
      body: JSON.stringify({
        notification: {
          body: mesaj,
          title: baslik,
          sound: 'bell',
        },
        to: token,
      }),
    }).then(data => data.json());

    console.log('BİLDİRİM DATA:', data);
    //} else {
    console.log('yenileme');
    //}
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
          }}>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              borderWidth: 1,
              borderRadius: 6,
              borderColor: 'rgb(172, 172, 186)',
              marginTop: 5,
              marginHorizontal: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginEnd: 5,
                  justifyContent: 'center',
                  flex: 0.2,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.zaa();
                  }}>
                  <Icon
                    name="person-circle-sharp"
                    size={40}
                    style={{alignSelf: 'center'}}></Icon>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginRight: 20,
                  marginVertical: 10,
                  borderColor: '#333',
                  borderWidth: 1,
                  borderRadius: 6,
                  height: 40,
                  justifyContent: 'center',
                  flex: 0.7,
                }}>
                <TextInput
                  style={{fontSize: 15, padding: 7, flex: 1}}
                  value={this.state.description}
                  onChangeText={val => this.setState({description: val})}
                  placeholder="What do you think?"></TextInput>
              </View>
              <View style={{justifyContent: 'center', flex: 0.1}}>
                <TouchableOpacity
                  disabled={!this.state.description.trim()}
                  onPress={() => this.sendPost()}>
                  <Icon
                    style={{
                      color: this.state.description.trim()
                        ? '#000000'
                        : '#838383',
                    }}
                    size={25}
                    name="send"></Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: 'rgb(172, 172, 186)',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.4,
                  borderRightWidth: 1,
                  borderRightColor: 'rgb(172, 172, 186)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingTop: 3,
                    }}>
                    <Icon
                      color="rgb(255, 187, 71)"
                      name="ios-create"
                      size={20}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={{}}>Comment</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.4,
                  height: 30,
                  borderRightWidth: 1,
                  borderRightColor: 'rgb(172, 172, 186)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingTop: 5,
                    }}>
                    <Icon
                      size={17}
                      color="rgb(255, 62, 71)"
                      name="ios-images"
                      style={{
                        marginRight: 5,
                      }}></Icon>
                  </View>
                  <View style={{}}>
                    <Text style={{}}>Images</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.33,
                  height: 30,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      paddingTop: 5,
                    }}>
                    <Icon
                      size={18}
                      color="rgb(148, 0, 150)"
                      name="ios-duplicate"
                      style={{marginRight: 5}}></Icon>
                  </View>
                  <View style={{}}>
                    <Text style={{}}>Folder</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            {this.state.posts.map((data, index) => {
              let postData = data;
              return (
                <View
                  style={{
                    borderColor: 'rgb(172, 172, 186)',
                    borderWidth: 1,
                    borderRadius: 6,
                    margin: 10,
                    backgroundColor: '#f3f3f3',
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
                          Alert.alert('Likes', lst);
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
                      onPress={() => this.willLike(data, index, postData)}
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
                          <Text style={{}}>Like</Text>
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
                          <Text style={{}}>Comment</Text>
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

                  {this.state.yaziyorBox == postData.id && (
                    <View>
                      <Text>{this.state.isim} yorum yazıyor..</Text>
                    </View>
                  )}
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
                            on
                            style={{
                              fontSize: 15,
                              padding: 7,
                              flex: 1,
                              height: 20,
                              alignItems: 'flex-end',
                            }}
                            value={this.state.comment}
                            onFocus={() => {
                              this.zaa(
                                'yaziyor',
                                postData.id + ',' + postData.name,
                                postData.toka,
                              );
                            }}
                            onChangeText={val => this.setState({comment: val})}
                            placeholder="Comment..."></TextInput>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <TouchableOpacity
                            disabled={!this.state.comment.trim()}
                            onPress={() => this.sendComment(postData)}>
                            <Icon
                              style={{
                                color: this.state.comment.trim()
                                  ? '#000000'
                                  : '#838383',
                              }}
                              size={20}
                              name="send"></Icon>
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
