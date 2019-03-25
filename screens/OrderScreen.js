import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import TabBarIcon from "../components/TabBarIcon";
import moment from "moment";
import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerTitleStyle: {
      flex: 1
    }
  };

  getDateArray = (start, end) => {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      var newDate = new Date(dt).toString().slice(0, 10);
      arr.push(newDate);
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  setMenuDateMap = dateArr => {
    var menuArr = new Array();
    var menuDateMap = new Map();
    var indexDateMap = new Map();
    fetch(
      "https://raw.githubusercontent.com/imsky/wordlists/master/nouns/fast_food.txt"
    ).then(response => {
      var menuItems = response._bodyText;
      menuArr = menuItems.split("\n");
      menuArr = menuArr.filter(element => {
        return element != "";
      });
      var smallestArr = dateArr < menuArr ? dateArr : menuArr;
      for (var i = 0; i < smallestArr.length; i++) {
        menuDateMap.set(dateArr[i], menuArr[i]);
        indexDateMap.set(dateArr[i], i);
      }
      this.setState({
        menuForDateMap: menuDateMap,
        indexForDateMap: indexDateMap
      });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      isDateSelected: false,
      selectedMenu: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    var startDate = new Date(); //YYYY-MM-DD
    var endDate = new Date(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth() + (startDate.getUTCMonth() < 11 ? 1 : -11),
      startDate.getUTCDate(),
      startDate.getUTCHours()
    ); //YYYY-MM-DD
    var dateArr = this.getDateArray(startDate, endDate);
    this.setMenuDateMap(dateArr);
  }

  onDateChange(date) {
    const utcDate = moment(date)
      .toString()
      .slice(0, 10);
    this.setState({
      selectedStartDate: utcDate
    });
    this.onDateSelected();
  }

  onDateSelected = () => {
    this.setState({
      isDateSelected: !this.state.isDateSelected,
      selectedMenu: null
    });
  };

  onTextPress(event, text) {
    this.setState({ selectedMenu: text && text });
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
            <Text style={styles.whatToDo}>
              1. Select date{" "}
              {this.state.isDateSelected && (
                <TabBarIcon
                  name={
                    Platform.OS === "ios"
                      ? "ios-checkmark-circle-outline"
                      : "md-checkmark-circle-outline"
                  }
                />
              )}
            </Text>
            {this.state.isDateSelected ? null : (
              <>
                <CalendarPicker
                  selectedDayColor={Colors.tintColor}
                  previousTitle="<"
                  nextTitle=">"
                  startFromMonday={true}
                  onDateChange={this.onDateChange}
                />
              </>
            )}

            {this.state.selectedStartDate !== null ||
            this.state.isDateSelected ? (
              <>
                <View>
                  <TouchableOpacity onPress={this.onDateSelected}>
                    <Text style={styles.selectedDate}>{startDate}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.whatToDo}>
                  2. Select Food from menu{" "}
                  {this.state.selectedMenu && (
                    <TabBarIcon
                      name={
                        Platform.OS === "ios"
                          ? "ios-checkmark-circle-outline"
                          : "md-checkmark-circle-outline"
                      }
                    />
                  )}
                </Text>
                <Text
                  key={
                    this.state.indexForDateMap.get(
                      this.state.selectedStartDate
                    ) &&
                    this.state.indexForDateMap.get(this.state.selectedStartDate)
                  }
                  onPress={e => {
                    this.onTextPress(
                      e,
                      this.state.menuForDateMap.get(
                        this.state.selectedStartDate
                      )
                    );
                  }}
                  style={[
                    styles.getStartedText,
                    {
                      color: Colors.tintColor
                    }
                  ]}
                >
                  {this.state.menuForDateMap.get(this.state.selectedStartDate)
                    ? this.state.menuForDateMap.get(
                        this.state.selectedStartDate
                      )
                    : "Select another day"}
                </Text>
              </>
            ) : null}
            {this.state.selectedMenu && (
              <>
                <Text style={styles.whatToDo}>{`3. Enjoy your ${
                  this.state.selectedMenu
                } !`}</Text>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
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
    fontStyle: "italic",
    paddingTop: 10,
    paddingBottom: 10
  },
  selectedDate: {
    fontSize: 28,
    color: Colors.tintColor,
    paddingBottom: 10
  },
  getStartedText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "black"
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
