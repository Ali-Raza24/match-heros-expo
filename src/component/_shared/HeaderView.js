import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SegmentedControlTab from "react-native-segmented-control-tab";
import PhotoUpload from "./PhotoUpload";

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      cover: null,
    };
  }

  handleCoverImage = (photo) => {
    this.setState({ cover: photo });
    this.props.updateCover(photo);
  };

  handleAvatarImage = (photo) => {
    this.setState({ avatar: photo });
    this.props.updateAvatar(photo);
  };

  chooseCover = () => {
    this.props.openCoverModal();
  };

  render() {
    const { cover, avatar, subtitle, title } = this.props;
    return (
      <ImageBackground
        style={{
          flex: 1,
          borderBottomColor: "white",
          borderBottomWidth: 1,
        }}
        source={this.state.cover ? this.state.cover : cover}
      >
        <LinearGradient
          style={styles.mainContainer}
          colors={["transparent", "rgba(74,122,221,0.6)", "#4A7ADD"]}
        >
          {this.props.segments &&
            this.props.segments[this.state.selected] === "Edit" && (
              <View
                style={{
                  position: "absolute",
                  top: StatusBar.currentHeight + 100,
                }}
              >
                <PhotoUpload
                  handleCoverImage={this.props.chooseCover}
                  renderElement="EditPlayerCoverPredefined"
                  //handleImage={this.handleCoverImage}
                />
              </View>
            )}
          <View style={{ alignItems: "center", position: "absolute" }}>
            {this.props.avatar && (
              <View style={styles.profilePicture}>
                {this.props.segments &&
                this.props.segments[this.state.selected] === "Edit" ? (
                  <View>
                    <PhotoUpload
                      photo={avatar}
                      renderElement="EditPlayerAvatar"
                      handleImage={this.handleAvatarImage}
                    />
                  </View>
                ) : (
                  <Image
                    source={this.state.avatar ? this.state.avatar : avatar}
                    style={styles.avatar}
                  />
                )}
              </View>
            )}
            {this.props.segmentNavigation && (
              <View style={styles.segmentSection}>
                <SegmentedControlTab
                  tabsContainerStyle={{ width: 250 }}
                  values={this.props.segments}
                  selectedIndex={this.state.selected}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                  onTabPress={(index, value) => {
                    this.setState({ selected: index });

                    this.props.segmentChange(index);
                  }}
                />
              </View>
            )}
            <View style={styles.info}>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 380,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    height: 32,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: 'SourceSansPro-SemiBold'
  },
  info: {
    paddingVertical: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
    // fontFamily: 'SourceSansPro-SemiBold'
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    // fontFamily: 'SourceSansPro-Regular'
  },
});
export default HeaderView;
