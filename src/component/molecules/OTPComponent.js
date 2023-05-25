import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput, View, I18nManager, SafeAreaView } from 'react-native';
import  OTPBox  from './OTPBoxes';

const OTPComponent = ({
    optNumberAdded,
    style,
    invalidOTP,
}) => {
    const [code, setCode] = useState(['', '', '', '']);
    const allBoxRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        // React.useRef(null),
        // React.useRef(null),
    ];

    useEffect(() => {
        setTimeout(() => {
            if (allBoxRefs[0].current) {
                allBoxRefs[0].current.setFocus();
            }
        }, 100);
    }, []);

    const onTextChange = (text, index) => {
      console.log('on text change fuction#@#@#@#',text,index)
        let newCodes = code.map((num, idx) => {
            if (idx === index) {
                return text;
            } else {
                return num;
            }
        });
        setCode(newCodes);

        if (text?.length > 0 && index < 3) {
            allBoxRefs[index].current.onDoneEditing();
            allBoxRefs[index + 1].current.setFocus();
        }
        let finalCode = newCodes.reduce((result, num) => {
            return result + num;
        });
        // optNumberAdded(finalCode);
    };
    const onBackKeyPress = (index) => {
        if (code[index] === '' && index > 0) {
            allBoxRefs[index].current.onDoneEditing();
            allBoxRefs[index - 1].current.setFocus();
        }
    };

    const renderBox = () => {
        const boxes = allBoxRefs.map((item, idx) => {
            return (
                <OTPBox
                    key={idx}
                    ref={item}
                    invalidOTP={invalidOTP}
                    index={idx}
                    textChanged={onTextChange}
                    backKeyPressed={onBackKeyPress}
                />
            );
        });

        return  boxes;
    };

    return <View style={[styles.container, style]}>{renderBox()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default OTPComponent;