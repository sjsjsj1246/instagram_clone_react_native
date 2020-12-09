/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';

import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab:{ screen: HomeTab },
  SearchTab:{ screen: SearchTab },
  AddMediaTab:{ screen: AddMediaTab },
  LikesTab:{ screen: LikesTab },
  ProfileTab:{ screen: ProfileTab }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      ...Platform.select({
        android:{
          backgroundColor: 'white'
        },
        ios:{
          backgroundColor:'white',
        }
      })
    },
    iconStyle: { width: 30 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
    bounces: true,
  }
});

const AppTabContainer = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <AppTabContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
