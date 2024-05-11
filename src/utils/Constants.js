import { StatusBar } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';


export const wp = (widthPercent) => widthPercentageToDP(widthPercent);
export const hp = (heightPercent) => heightPercentageToDP(heightPercent);

export const StatusBarHeight = () => {
    return StatusBar.currentHeight;
  }