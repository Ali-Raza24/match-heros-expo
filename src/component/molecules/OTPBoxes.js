import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
} from 'react-native';


class OTPBox extends React.Component {
    // inputRef: React.RefObject<TextInput>;

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            isFocus: false,
            value: '',
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onDoneEditing = this.onDoneEditing.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        // if (this.props.shouldFocus) {
        //     this.inputRef.current?.focus();
        // }
    }

    onTextChange(text) {
        this.setState({ value: text });
        this.props?.textChanged(text, this.props.index);
    }
    onFocus() {
        this.setState({ isFocus: true });
    }
    onDoneEditing() {
        this.setState({ isFocus: false });
    }
    setFocus() {
        this.inputRef.current?.focus();
        this.onFocus();
    }
    handleKeyPress(event) {
        const { nativeEvent } = event;
        if (nativeEvent.key === 'Backspace') {
            this.props.backKeyPressed(this.props.index);
        }
    }

    render() {
        const isFocus = this.state.isFocus;
        const currentVal = this.state.value;

        let boxStyle = isFocus ? styles.otpBoxFocused : styles.otpBoxNormal;
        if (this.props.invalidOTP) {
            boxStyle = styles.otpBoxInvalid;
        }
        return (
            <View style={[styles.container, boxStyle]}>
                <TextInput
                    ref={this.inputRef}
                    keyboardType="decimal-pad"
                    placeholderTextColor={'#ffffff'}
                    selectionColor={'#ffffff'}
                    placeholder={isFocus ? undefined : ''}
                    value={currentVal}
                    maxLength={1}
                    onChangeText={(text) => this.onTextChange(text)}
                    autoCorrect={false}
                    onFocus={() => this.onFocus()}
                    onKeyPress={(event) => this.handleKeyPress(event)}
                    onEndEditing={() => this.onDoneEditing()}
                    style={styles.input}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 64,
        height: 64,
        marginLeft: 1,
        marginTop: 1,
        backgroundColor: `#1E2646`,
        justifyContent: 'center',
        borderColor:'#1E2646',
        borderRadius: 4,
        borderWidth: 1,
        flexShrink: 1,
    },
    otpBoxFocused: {
        // borderColor: R.colors.otpBoxBorderColor,
    },
    otpBoxNormal: {
        // borderColor: R.colors.textFieldPlaceHolderColor,
    },
    otpBoxInvalid: {
        // borderColor: R.colors.otpBoxBorderColor,
    },
    titleText: {
        // ...R.typography.textStyles.body2BoldLeftBlackPrimary,
        textAlign: 'left',
        marginBottom: 4,
    },
    input: {
        // ...R.typography.textStyles.title2BoldCenterBlackPrimary,
        paddingVertical: 0,
        textAlign: 'center',
    },
});

export default OTPBox;