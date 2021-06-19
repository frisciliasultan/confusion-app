import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dish';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
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
                    <ListItem
                        bottomDivider
                        onPress={() =>
                            navigate('Dishdetail', { dishId: item.id })
                        }
                    >
                        <Avatar source={require('./images/uthappizza.png')} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {item.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </View>
            );
        };

        return (
            <FlatList
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

export default Menu;
