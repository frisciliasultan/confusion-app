import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {
    View,
    Platform,
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { DISHES } from '../shared/dish';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator() {
    return (
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
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={24}
                            color="white"
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
            <Stack.Screen name="Dishdetail" component={Dishdetail} />
        </Stack.Navigator>
    );
}

function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
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
            <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={24}
                            color="white"
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
}

function ContactNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Contact"
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={24}
                        color="white"
                        onPress={() => navigation.toggleDrawer()}
                    />
                )
            })}
        >
            <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
    );
}

function AboutNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="About"
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={24}
                        color="white"
                        onPress={() => navigation.toggleDrawer()}
                    />
                )
            })}
        >
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView>
            <SafeAreaView
                style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={require('./images/logo.png')}
                            style={styles.drawerImage}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>
                            Ristorante Con Fusion
                        </Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
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
                    <Drawer.Navigator
                        initialRouteName="Home"
                        drawerContent={(props) => (
                            <CustomDrawerContent {...props} />
                        )}
                        drawerStyle={{ backgroundColor: '#D1C4E9' }}
                    >
                        <Drawer.Screen
                            name="Home"
                            component={HomeNavigator}
                            options={{
                                drawerLabel: 'Home',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="home"
                                        type="font-awesome"
                                        size={24}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name="Menu"
                            component={MenuNavigator}
                            options={{
                                drawerLabel: 'Menu',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="list"
                                        type="font-awesome"
                                        size={24}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name="Contact"
                            component={ContactNavigator}
                            options={{
                                title: 'Contact Us',
                                drawerLabel: 'Contact Us',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="address-card"
                                        type="font-awesome"
                                        size={22}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name="About"
                            component={AboutNavigator}
                            options={{
                                drawerLabel: 'About Us',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="info-circle"
                                        type="font-awesome"
                                        size={24}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
                    </Drawer.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
