import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

function RenderItem(props) {
    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                    <Card.FeaturedSubtitle>
                        {item.designation}
                    </Card.FeaturedSubtitle>
                </Card.Image>
                <Text style={{ margin: 10 }}>{item.description}</Text>
            </Card>
        );
    } else {
        return <View></View>;
    }
}

class Contact extends Component {
    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>
                        121, Clear Water Bay Road Clear Water Bay, Kowloon HONG
                        KONG Tel: +852 1234 5678 Fax: +852 8765 4321
                        Email:confusion@food.net
                    </Text>
                </Card>
            </ScrollView>
        );
    }
}

export default Home;
