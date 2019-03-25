import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import TabBarIcon from "../components/TabBarIcon";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerTitleStyle: {
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedFood: false
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date
    });
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <TabBarIcon
              size={50}
              name={Platform.OS === "ios" ? "ios-pizza" : "md-pizza"}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.whatToDo}>1. Select date</Text>
            <CalendarPicker onDateChange={this.onDateChange} />

            <View>
              <Text>SELECTED DATE:{startDate}</Text>
            </View>

            {this.state.selectedStartDate != null && (
              <>
                <Text style={styles.whatToDo}>2. Select Food from menu</Text>
                <TouchableOpacity onPress={this.onFoodSelected}>
                  <Text
                    style={[
                      styles.getStartedText,
                      { color: this.state.selectedFood ? "blue" : "black" }
                    ]}
                  >
                    Pandekager
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {this.state.selectedFood && (
              <>
                <Text style={styles.whatToDo}>3. Enjoy!</Text>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  onFoodSelected = () => {
    this.setState({ selectedFood: !this.state.selectedFood });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    flex: 2,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    paddingBottom: 5
  },
  whatToDo: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
