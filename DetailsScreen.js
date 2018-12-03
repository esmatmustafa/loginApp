import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class Tab1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Tab1!</Text>
      </View>
    );
  }
}

class Tab2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Tab2!</Text>
      </View>
    );
  }
}

export default createAppContainer(createBottomTabNavigator({
  Home: Tab1,
  Settings: Tab2,
})
);