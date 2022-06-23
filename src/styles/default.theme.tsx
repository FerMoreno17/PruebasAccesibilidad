import { Dimensions } from 'react-native';

//los tamaños estos tendrían que venir desde el reducer
const primaryTextSize = 24;
const secondaryTextSize = 20;
const paragraph = 16;

const primaryColor = '#002855';
const secondaryColor = '#00aeef';
const danger = '#a82f3b';

const { width, height } = Dimensions.get('screen');

export function defaultTheme() {
    return {
        colors: {
            primary: primaryColor,
            secodary: secondaryColor,
            danger: danger,
        },
        button: {
            backgroundColor: secondaryColor,
            width: width * 0.9,
            height: height * 0.2,
            borderRadius: 20,
        },
        primaryText: {
            color: 'black',
            fontSize: primaryTextSize,
        },
        secondaryText: {
            color: 'black',
            fontSize: secondaryTextSize,
        },
        highLigthText: {
            color: secondaryColor,
        },
        paragraph: {
            color: 'black',
            fontSize: paragraph,
        },
        label:{
            color:primaryColor,
            fontSize:18,
        },
    };
}
