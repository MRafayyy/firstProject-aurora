import {View, Text, StyleSheet, Modal, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';
import imageNames from '../../assets/imageNames/imageNames';

export default function CustomModalComponent({
  modalVisible,
  setModalVisible,
  wantToAdd,
  setWantToAdd,
  data,
  GoToGroupJoiningPage,
  submissionDataTitle,
  submissionDataBody,
  submissionDataImage,
  modalRightBtnText,
  modalRightBtnFunc,
  modalLeftBtnText,
  modalLeftBtnFunc,
  OKbtnFunc,
  modalRightBtnBgColor,
  removePerson,
  oneBtnOnly
}) {
  //   const [modalVisible, setModalVisible] = useState(false);
  // const [wantToAdd, setWantToAdd] = useState(false);

  const defaultFunction = () => {
    setModalVisible(true);
    setWantToAdd(false);
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              resizeMode="contain"
              source={
                wantToAdd
                  ? imageNames.partyPopper
                  : submissionDataImage !== undefined
                  ? submissionDataImage
                  : imageNames.userGroupBlue2
              }
            />

            <Text style={styles.modalHeadingText}>
              {wantToAdd
                ? 'Congratulations'
                : (data && data.title !== null
                    ? `You're going to join ${data.title} group!`
                    : null) ||
                  (submissionDataTitle && `${submissionDataTitle}`)}
            </Text>
            <Text style={styles.modalBodyText}>
              {wantToAdd
                ? removePerson !== undefined && removePerson === true
                  ? 'Connection has been removed successfully'
                  : 'Your answers have been submitted successfully'
                : submissionDataBody === undefined
                ? 'After joining the group, you will be asked some additional questions'
                : `${submissionDataBody}`}
            </Text>
            <View style={styles.modalFlex}>
              {wantToAdd ? (
                <Pressable
                  style={[styles.buttonOkay, styles.buttonClose]}
                  onPress={() => {
                    if (OKbtnFunc !== undefined) {
                      OKbtnFunc();
                    } else {
                      defaultFunction();
                    }
                  }}>
                  <Text style={[styles.modalBtnText, {color: colors.white}]}>
                    Okay
                  </Text>
                </Pressable>
              ) : (
                oneBtnOnly?
                <>
                   <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      {
                        backgroundColor:
                          (modalRightBtnBgColor !== undefined &&
                            modalRightBtnBgColor) ||
                          colors.green,
                      },
                    ]}
                    onPress={() => {
                      if (modalRightBtnFunc !== undefined) {
                        modalRightBtnFunc();
                      } else {
                        setModalVisible(!modalVisible);
                        // GoToGroupJoiningPage();
                      }
                    }}>
                    <Text style={[styles.modalBtnText, {color: colors.white}]}>
                      {modalRightBtnText !== undefined
                        ? `${modalRightBtnText}`
                        : 'Ok, Cancel'}
                    </Text>
                  </Pressable>
                
                </>:


                <>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      if (modalLeftBtnFunc !== undefined) {
                        modalLeftBtnFunc();
                      } else {
                        setModalVisible(!modalVisible);
                      }
                    }}>
                    <Text style={styles.modalBtnText}>
                      {modalLeftBtnText !== undefined
                        ? modalLeftBtnText
                        : 'No, Cancel'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      {
                        backgroundColor:
                          (modalRightBtnBgColor !== undefined &&
                            modalRightBtnBgColor) ||
                          colors.green,
                      },
                    ]}
                    onPress={() => {
                      if (modalRightBtnFunc !== undefined) {
                        modalRightBtnFunc();
                      } else {
                        setModalVisible(!modalVisible);
                        // GoToGroupJoiningPage();
                      }
                    }}>
                    <Text style={[styles.modalBtnText, {color: colors.white}]}>
                      {modalRightBtnText !== undefined
                        ? `${modalRightBtnText}`
                        : 'Yes, Join'}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ----------------------
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: responsiveWidth(88),
    // height: responsiveHeight(32),
    margin: 17,
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    paddingTop: responsiveHeight(1),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalImage: {
    width: responsiveWidth(15),
    height: responsiveHeight(15),
  },

  modalHeadingText: {
    fontFamily: fontFamily.Bold,
    color: colors.black,
    marginBottom: responsiveHeight(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(2.1)
    // marginB
  },
  modalBodyText: {
    fontFamily: fontFamily.Regular,
    color: colors.silver,
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
  },

  modalFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(6),
    marginTop: responsiveHeight(4),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalBtnText: {
    fontFamily: fontFamily.Regular,
    color: 'gray',
    lineHeight: responsiveHeight(3.25),
    fontSize: responsiveFontSize(1.6),
  },
  button: {
    width: responsiveWidth(38),
    height: responsiveHeight(5),
    borderRadius: 20,
    padding: responsiveWidth(2),
    elevation: 2,
    backgroundColor: colors.mediumLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.8,
  },
  buttonOkay: {
    width: responsiveWidth(70),
    height: responsiveHeight(5),
    borderRadius: 20,
    padding: responsiveWidth(2),
    elevation: 2,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.8,
  },
});
