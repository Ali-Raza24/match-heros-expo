import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, ImageBackground } from "react-native";
import DefaultButton from './DefaultButton';
import ImageService from "../../services/ImageService";
import moment from 'moment'
import EditProfile from "../../../assets/editProfile.svg"

const { width, height } = Dimensions.get('window');
export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.ImageService = new ImageService();
    this.state = {
      photo: ''
    };
  }

  pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let response = { ...result };
      if (!response.fileName) {
        response.fileName = "IMG_" + moment().format("MM-DD-YY-HH:mm").toString();
      }
      this.props.handleImage(response);
      this.setState({ photo: result })

    }


  };

  pickCoverImageHandler = () => {
    this.props.handleCoverImage();
  };

  render() {
    let renderElement;
    if (this.props.renderElement === "IconCamera") {
      renderElement =
        <TouchableOpacity onPress={this.pickImageHandler}>
          <EditProfile
style = {{
    resizeMode:'contain'
}}
/>
          {/* <Button
            title="Edit"
            backgroundColor="#fff"
            buttonStyle={{ borderRadius: 5, borderColor: "#a2a2a2", borderWidth: 1 }}
            color="#393939"
            icon={{ name: "camera", color: "#393939" }}
            onPress={this.pickImageHandler}
          /> */}
        </TouchableOpacity>
    }
    if (this.props.renderElement === "button") {
      renderElement =
        <DefaultButton
          title={this.props.title}
          onPress={this.pickImageHandler}
        />
    }
    if (this.props.renderElement === "TouchableOpacity") {
      renderElement =
        <TouchableOpacity
          onPress={this.pickImageHandler}
          style={this.props.avatarContainer}
        >
          <Image
            source={this.props.source}
            style={this.props.imageStyle}
          />
        </TouchableOpacity>
    }
    if (this.props.renderElement === "CreateTeamAvatar") {
      renderElement =
        <TouchableOpacity
          onPress={this.pickImageHandler}
          style={styles.avatarContainer}
        >
          {this.props.photo ?
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={this.props.photo}
                style={styles.avatar}
              />
              <Image
                source={require('../../../assets/image/camera.png')}
                style={{ ...styles.icon, position: 'absolute' }}
              />
            </View>
            :
            <Image
              source={require('../../../assets/image/camera.png')}
              style={styles.icon}
            />
          }
        </TouchableOpacity>
    }
    if (this.props.renderElement === "CreateTeamACover") {
      renderElement =
        <TouchableOpacity
          onPress={this.pickImageHandler}
          style={styles.coverContainer}
        >
          {this.state.photo ?
            <React.Fragment>
              <Image
                source={this.state.photo}
                style={styles.cover}
              />
              <Image
                source={require('../../../assets/image/camera.png')}
                style={{ ...styles.iconCover, position: 'absolute', top: 10, right: 10 }}
              />
            </React.Fragment>
            :
            <Image
              source={require('../../../assets/image/camera.png')}
              style={styles.iconCover}
            />
          }
        </TouchableOpacity>
    }
    if (this.props.renderElement === "EditPlayerCover") {
      renderElement =
        <TouchableOpacity
          onPress={this.pickImageHandler}
          style={styles.coverContainer}
        >
          <Image
            source={require('../../../assets/image/camera.png')}
            style={styles.iconCover}
          />

        </TouchableOpacity>
    }
    if (this.props.renderElement === "EditPlayerAvatar") {
      renderElement =
        <TouchableOpacity
          onPress={this.pickImageHandler}
          style={styles.avatarContainer}
        >
          {this.state.photo ?
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={this.state.photo}
                style={styles.avatar}
              />
              <Image
                source={require('../../../assets/image/camera.png')}
                style={{ ...styles.icon, position: 'absolute' }}
              />
            </View>
            :
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={this.props.photo}
                style={styles.avatar}
              />
              <Image
                source={require('../../../assets/image/camera.png')}
                style={{ ...styles.icon, position: 'absolute' }}
              />
            </View>
          }
        </TouchableOpacity>
    }
    if (this.props.renderElement === "EditPlayerCoverPredefined") {
      renderElement =
        <TouchableOpacity
          onPress={this.props.handleCoverImage}
          style={styles.coverContainer}
        >
          <Image
            source={require('../../../assets/image/camera.png')}
            style={styles.iconCover}
          />

        </TouchableOpacity>
    }
    if (this.props.renderElement === "CreateTeamCoverPredefined") {
      renderElement =
        <TouchableOpacity
          onPress={this.props.handleCoverImage}
          style={styles.coverContainer}
        >
          {this.props.cover ?
            <React.Fragment>
              <Image
                source={this.ImageService.getCoverUri(this.props.cover)}
                style={styles.cover}
              />
              <Image
                source={require('../../../assets/image/camera.png')}
                style={{ ...styles.iconCover, position: 'absolute', top: 10, right: 10 }}
              />
            </React.Fragment>
            :
            <Image
              source={require('../../../assets/image/camera.png')}
              style={styles.iconCover}
            />
          }

        </TouchableOpacity>
    }
    return (
      <View>
        {renderElement}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: "#a2a2a2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  },
  avatarContainer: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    borderRadius: 100
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  icon: {
    width: 36,
    height: 30,
  },
  iconCover: {
    width: 20,
    height: 16.5,
  },
  coverContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: width - 52,
    height: 200,
    borderRadius: 10
  },
});
