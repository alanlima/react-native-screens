import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { useScreens } from 'react-native-screens';

import Stack from './stack';
import Tabs from './tabs';
import Navigation from './navigation';
import NavigationTabsAndStack from './navigationTabsAndStack';

useScreens();

const SCREENS = {
  Stack: { screen: Stack, title: 'Stack example' },
  Tabs: { screen: Tabs, title: 'Tabs example' },
  Navigation: { screen: Navigation, title: 'React Navigation example' },
  NavigationTabsAndStack: {
    screen: NavigationTabsAndStack,
    title: 'React Navigation Tabs + Stack',
  },
};

class MainScreen extends React.Component {
  static navigationOptions = {
    title: '📱 React Native Screens Examples',
  };
  render() {
    const data = Object.keys(SCREENS).map(key => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={props => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
      />
    );
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const { key } = this.props.item;
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const MainScreenNav = createStackNavigator({
  MainScreen: { screen: MainScreen },
});

const ExampleApp = createSwitchNavigator(
  {
    Main: { screen: MainScreenNav },
    ...SCREENS,
  },
  {
    initialRouteName: 'Main',
  }
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default createAppContainer(ExampleApp);
