import { Dimensions } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import InvitePlayers from "../../component/molecules/InvitePlayers";
import SvgImage from "../../../assets/signIn.svg";
export default function InvitePlayersScreen(props) {
  return (
    <>
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      <InvitePlayers
        wizardRef={() => props.navigation.goBack()}
        headerText={false}
      />
    </>
  );
}
