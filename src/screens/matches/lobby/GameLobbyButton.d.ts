import React from "react";

type Props = {
    textColor: string;
    buttonBackground: string;
    text: string;
    onPress?: () => void;
}
export const GameLobbyButton: (props: Props) => JSX.Element; 