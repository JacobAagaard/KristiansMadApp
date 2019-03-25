import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
    headerTitleStyle: {
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#fff"
    };
  }

  onClick = () => {
    this.setState({ backgroundColor: randomHex() });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.backgroundColor }
        ]}
      >
        <TouchableOpacity
          onPress={this.onClick}
          style={[
            styles.container,
            { backgroundColor: this.state.backgroundColor }
          ]}
        >
          <View>
            <Text style={styles.instructions}>
              Tap to change the background color
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

let randomHex = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: "center",
    backgroundColor: randomHex()
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EDEDED"
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  }
});
