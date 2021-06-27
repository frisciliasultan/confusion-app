import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList,
    Modal,
    StyleSheet
    // Button
} from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { postComment, postFavorite } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment))
});

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                    imageSize={12}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: 'left', margin: 10 }}
                />
                <Text style={{ fontSize: 12 }}>
                    {'-- ' + item.author + ', ' + item.date}{' '}
                </Text>
            </View>
        );
    };

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{ margin: 10 }}>{dish.description}</Text>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type="font-awesome"
                        color="#f50"
                        onPress={() =>
                            props.favorite
                                ? console.log('Already favorite')
                                : props.onPress()
                        }
                        style={{ flex: 1 }}
                    />
                    <Icon
                        raised
                        reverse
                        name="pencil"
                        type="font-awesome"
                        color="#512DA8"
                        onPress={() => props.onWriteCommentPress()}
                        style={{ flex: 1 }}
                    />
                </View>
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
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        };

        this.handleRating = this.handleRating.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Detail'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment(dishId) {
        this.resetForm();
        this.props.postComment(
            dishId,
            this.state.rating,
            this.state.author,
            this.state.comment
        );
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleRating(rating) {
        this.setState({ rating: rating });
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        });
    }

    render() {
        const dishId = this.props.route.params.dishId;
        console.log(this.state);
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some((el) => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onWriteCommentPress={() => this.toggleModal()}
                />
                <RenderComments
                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dishId === dishId
                    )}
                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            fractions={1}
                            startingValue={5}
                            onFinishRating={this.handleRating}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                            onChangeText={(value) =>
                                this.setState({ author: value })
                            }
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{
                                name: 'comment-o',
                                type: 'font-awesome'
                            }}
                            onChangeText={(value) =>
                                this.setState({ comment: value })
                            }
                        />
                        <Button
                            onPress={() => {
                                this.handleComment(dishId);
                            }}
                            buttonStyle={{
                                backgroundColor: '#512DA8',
                                margin: 10
                            }}
                            title="SUBMIT"
                        />
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            buttonStyle={{
                                backgroundColor: 'gray',
                                margin: 10
                            }}
                            title="CANCEL"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
