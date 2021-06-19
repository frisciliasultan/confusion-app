import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { DISHES } from '../shared/dish';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop:
                        Platform.OS === 'ios'
                            ? 0
                            : Expo.Constants.statusBarHeight
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Main"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#512DA8'
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: '#fff'
                            }
                        }}
                    >
                        <Stack.Screen name="Menu" component={Menu} />
                        <Stack.Screen
                            name="Dishdetail"
                            component={Dishdetail}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

export default Main;
