import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Switch,
    Button,
    Modal,
    Alert,
    Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        };
        this.resetForm = this.resetForm.bind(this);
    }

    static navigationOptions = {
        title: 'Reserve Table'
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.addReservationToCalendar(this.state.date);
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    async obtainCalendarPermission() {
        let permission = await Calendar.getCalendarPermissionsAsync();

        if (!permission.granted) {
            permission = await Calendar.requestCalendarPermissionsAsync();

            if (!permission.granted) {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    // async getDefaultCalendar() {
    //     let defaultCalendar;

    //     if (Platform.OS === 'ios') {
    //         defaultCalendar = await Calendar.getDefaultCalendarAsync();
    //     } else {
    //         const calendars = await Calendar.getCalendarsAsync(
    //             Calendar.EntityTypes.EVENT
    //         );
    //         defaultCalendar = calendars.filter(
    //             (each) => each.source.name === 'Default'
    //         )[0];
    //     }
    //     console.log(defaultCalendar);
    //     return defaultCalendar;
    // }

    async getDefaultCalendarId() {
        let defaultCalendarId;

        if (Platform.OS === 'ios') {
            console.log(await Calendar.getDefaultCalendarAsync());
            defaultCalendarId = (await Calendar.getDefaultCalendarAsync()).id;
        } else {
            const calendars = await Calendar.getCalendarsAsync(
                Calendar.EntityTypes.EVENT
            );
            defaultCalendarId = calendars.filter(
                (each) => each.source.name === 'Default'
            )[0].id;
        }
        console.log(defaultCalendarId);
        return defaultCalendarId;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();

        // Get default calendar
        const calendar = await this.getDefaultCalendarId();
        console.log('calend', calendar);
        // const defaultCalendarSource =
        //     Platform.OS === 'ios'
        //         ? await thisgetDefaultCalendarSource()
        //         : { isLocalAccount: true, name: 'Expo Calendar' };

        Calendar.createEventAsync(calendar, {
            title: 'Con Fusion Table Reservation',
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
            timeZone: 'Asia/Hong_Kong',
            location:
                '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });

        // const newCalendarID = await Calendar.createCalendarAsync({
        //     title: 'Expo Calendar',
        //     color: 'blue',
        //     entityType: Calendar.EntityTypes.EVENT,
        //     sourceId: defaultCalendarSource.id,
        //     source: defaultCalendarSource,
        //     name: 'internalCalendarName',
        //     ownerAccount: 'personal',
        //     accessLevel: Calendar.CalendarAccessLevel.OWNER
        // });
    }

    async obtainNotificationPermission() {
        let permission = await Notifications.getPermissionsAsync();

        if (
            !permission.granted ||
            permission.ios?.status !=
                Notifications.IosAuthorizationStatus.PROVISIONAL
        ) {
            permission = await Notifications.requestPermissionsAsync({
                android: {},
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true
                }
            });

            if (
                !permission.granted ||
                permission.ios?.status ===
                    Notifications.IosAuthorizationStatus.PROVISIONAL
            ) {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false
            })
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: 'Reservation for ' + date + ' requested'
            },
            trigger: null
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ guests: itemValue })
                            }
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Smoking/Non-Smoking?
                        </Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor="#512DA8"
                            onValueChange={(value) =>
                                this.setState({ smoking: value })
                            }
                        ></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=""
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({ date: date });
                            }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    {this.state.showModal
                        ? Alert.alert(
                              'Your Reservation OK?',
                              `Number of Guests: ${this.state.guests}\nSmoking? ${this.state.smoking}\nDate and Time: ${this.state.date}`,
                              [
                                  {
                                      text: 'Cancel',
                                      onPress: this.resetForm,
                                      style: 'cancel'
                                  },
                                  {
                                      text: 'OK',
                                      onPress: () => {
                                          this.presentLocalNotification(
                                              this.state.date
                                          );
                                          this.resetForm();
                                      }
                                  }
                              ],
                              { cancelable: false }
                          )
                        : null}
                </Animatable.View>
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

export default Reservation;
