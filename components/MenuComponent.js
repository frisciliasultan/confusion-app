import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {
        return (
                   <ListItem bottomDivider onPress={() => props.onPress(item.id)}>
                        <Avatar source={require('./images/uthappizza.png')} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>

        );
    };
    
    return (
            <FlatList 
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}


export default Menu;