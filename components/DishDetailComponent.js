import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dish';

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>{dish.description}</Text>
            </Card>
        );
    } else {
        return <View></View>;
    }
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
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
                <RenderDish dish={this.state.dishes[+dishId]} />
            </View>
        );
    }
}

export default Dishdetail;
