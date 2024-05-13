
import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
} from 'react-native';
import ip from "../screens/IPaddress";
import UserIdContext from "../UserIdContext";

import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

import NothinToShow from "../components/NothinToShow";
import MyAddedWomenComponent from "../components/MyAddedWomenComponent";
import colors from "../utils/color";
import { Text } from "react-native-paper";
import fontFamily from "../../assets/fontFamily/fontFamily";

export default function ShowMyAddedWomen({ navigation }) {

    const { userId } = useContext(UserIdContext)
    const [women, setWomen] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [womenRemoved, setWomenRemoved] = useState({})

    useEffect(() => {
        fetchMyAddedWomen();
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchMyAddedWomen()

    }, []);


    const fetchMyAddedWomen = async () => {
        try {
            const mongoId = userId.mongoId;
            let response = await fetch(`${ip}/contacts/show-my-added-women/${mongoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                response = await response.json()

                if (response.status === "empty") {
                    console.log("no friends found")
                }
                else {
                    // console.log(response)


                    const womenData = response.map((women) => ({

                        _id: women._id,
                        name: women.name,
                        email: women.email
                    })
                    )

                    setWomen(womenData)

                }
            }

            else if (response.status == 500) {
                console.log("demn")
            }


        } catch (error) {
            console.log("error message: " + error)
        }
    }


    // console.log(friendRequests[0].name)
    return (

        // <View style={styles.body}>


        <View style={{ flex: 1, padding: responsiveWidth(5), backgroundColor: 'white' }} >
            <View style={styles.headerContainer}>
                <Text style={styles.text}>My Added Women</Text>
            </View>
            {women.length > 0 ?


                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    data={women}
                    renderItem={({ item }) => {
                        return (
                            <MyAddedWomenComponent navigation={navigation} item={item} womenRemoved={womenRemoved} setWomenRemoved={setWomenRemoved} />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

                :

                <NothinToShow msg={'No one has added you'} />
            }
        </View>

    );
}


const styles = StyleSheet.create({


    body: {
        flex: 1,
        backgroundColor: colors.white,
    },
    text: {
        // margin: 5,
        fontSize: responsiveFontSize(2),
        color: colors.black,
        textAlign: 'center',
        fontFamily: fontFamily.SemiBold
    },

    headerContainer: {
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(7),
        paddingHorizontal: 9,
        paddingRight: responsiveWidth(6),
    },
})