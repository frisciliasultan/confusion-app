import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import {
    View,
    Platform,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ToastAndroid
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
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

function LoginNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                },
                title: 'Login',
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
            <Stack.Screen name="Login" component={Login} />
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

function ReservationNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Reservation"
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
            <Stack.Screen name="Reservation" component={Reservation} />
        </Stack.Navigator>
    );
}

function FavoritesNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
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
            <Stack.Screen name="Favorites" component={Favorites} />
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
        this.handleConnectivityChange =
            this.handleConnectivityChange.bind(this);
    }

    subscription = null;

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch().then((connectionInfo) => {
            console.log(connectionInfo);
            ToastAndroid.show(
                'Initial Network Connectivity Type: ' + connectionInfo.type,
                ToastAndroid.LONG
            );
        });

        this.subscription = NetInfo.addEventListener(
            this.handleConnectivityChange
        );
    }

    componentWillUnmount() {
        this.subscription && this.subscription();
    }

    handleConnectivityChange = (connectionInfo) => {
        console.log('hanged');
        switch (connectionInfo.type) {
            case 'none':
                console.log('You are now offline!');
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                console.log('You are now connected to WiFi!');
                ToastAndroid.show(
                    'You are now connected to WiFi!',
                    ToastAndroid.LONG
                );
                break;
            case 'cellular':
                console.log('You are now connected to Cellular!');
                ToastAndroid.show(
                    'You are now connected to Cellular!',
                    ToastAndroid.LONG
                );
                break;
            case 'unknown':
                ToastAndroid.show(
                    'You now have unknown connection!',
                    ToastAndroid.LONG
                );
                break;
            default:
                break;
        }
    };

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
                            name="Login"
                            component={LoginNavigator}
                            options={{
                                drawerLabel: 'Login',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="sign-in"
                                        type="font-awesome"
                                        size={24}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
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
                        <Drawer.Screen
                            name="My Favorites"
                            component={FavoritesNavigator}
                            options={{
                                drawerLabel: 'My Favorites',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="heart"
                                        type="font-awesome"
                                        size={24}
                                        color={tintColor}
                                    />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name="Reserve Table"
                            component={ReservationNavigator}
                            options={{
                                drawerLabel: 'Reserve Table',
                                drawerIcon: ({ tintColor, focused }) => (
                                    <Icon
                                        name="cutlery"
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
