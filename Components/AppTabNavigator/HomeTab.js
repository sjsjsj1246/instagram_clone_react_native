/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import CardCompnent from '../CardComponent';

export default class HomeTab extends Component {

  state = {
    feeds: [],
    followings: [],
}

componentDidMount() {
    this.fetchFeeds().then(feeds => {
        this.setState({
          feeds
        });
    });

    this.fetchFollowing().then(followings => {
      this.setState({
        followings
      });
  });
}

  fetchFeeds(){
    const data ={
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{tag: "kr", limit: 20}]
      ]
    };
    return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result);
    }

    fetchFollowing() {
      const data = {
          id: 2,
          jsonrpc: "2.0",
          method: "call",
          params: [
            "follow_api",
            "get_following",
            ["anpigon", "", "blog", 10]
          ]
      };
      return fetch('https://api.steemit.com',
      {
          method: 'POST',
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => res.result.map(({following}) => following))
    }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={10} style={{color: tintColor}} />
    ),
  };

  render() {
    return (
      <Container style={style.container}>
        <Header style={{backgroundColor: 'white'}}>
          <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
          <Body style={{alignItems: 'flex-end'}}><Text style={{fontWeight: 'bold'}}>Instagram</Text></Body>
          <Right><Icon name='ios-send' style={{ paddingRight:10 }}/></Right>
        </Header>
        <Content>
          <View style={{height: 100}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7}}>
              <Text style={{fontWeight: 'bold'}}>Sroties</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="md-play" style={{fontSize:14}}></Icon>
                <Text style={{fontWeight: 'bold'}}>Watch all</Text>
              </View>
            </View>

            <View sryle={{flexDirection: 'row', alignItems: 'center'}}>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingStart: 5,
                paddingEnd: 5,
              }}>
                {
                  this.state.followings.map(following => <Thumbnail 
                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                    source={{uri: `https://steemitimages.com/u/${following}/avatar` }} />)
                }
            </ScrollView>
            </View>

          </View>

          {
            this.state.feeds.map(feed => <CardCompnent data={feed}/>)
          }
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
