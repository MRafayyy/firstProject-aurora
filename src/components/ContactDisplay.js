import { useContext, useEffect, useState } from 'react';
import React from 'react';

import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import UserIdContext from '../UserIdContext';
import ip from '../screens/IPaddress';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

const ContactDisplay = ({ item, addedContact, setAddedContact }) => {


    console.log(item)

    const [disableNow, setdisableNow] = useState(false);
    const { userId } = useContext(UserIdContext);


    const addThisContact = async (currentUserId, selectedUserId) => {
        try {
            let response = await fetch(`${ip}/women/add-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUserId, selectedUserId }),
            });

            // response = await response.json()
            if (response.ok) {
                setAddedContact({ ...addedContact, [selectedUserId]: true });
                setdisableNow(true);
            }
        } catch (error) {
            console.log('error here');
            console.log(error);
        }
    };

    return (
        <Pressable style={styles.container}>
            <View>
                <Image
                    style={styles.womenAvatarIcon}
                    resizeMode="cover"
                    source={require('../../assets/images/womenavatar.jpg')}
                />
            </View>

            <View style={{ marginLeft: responsiveWidth(5), flex: 1 }}>
                <Text
                    style={{
                        fontFamily: fontFamily.Regular,
                        textAlign: 'left',
                        color: 'black',
                        fontSize: responsiveFontSize(2),
                    }}>
                    {item.name}
                </Text>
                {/* <Text style={{ textAlign: 'left', color: 'gray', fontSize: responsiveFontSize(2) }} >{item.userId}</Text> */}
            </View>

            <Pressable
                disabled={disableNow}
                onPress={() => addThisContact(userId.mongoId, item._id)}
                style={styles.btn}>
                <Text
                    style={styles.btnText}>
                    {addedContact[item._id] ? 'Added' : 'Add'}
                </Text>
            </Pressable>
            {/* backgroundColor: '#567189' */}
        </Pressable>
    );
};

export default ContactDisplay;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
    },

    womenAvatarIcon: { width: responsiveWidth(14), height: responsiveHeight(7) },

    btn: {
        borderColor: colors.blue,
        borderWidth: 1,
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(2),
        width: responsiveWidth(30),
    },
    btnText: {
        fontFamily: fontFamily.Regular,
        textAlign: 'center',
        color: colors.blue,
        fontSize: responsiveFontSize(1.8),
    }
});
