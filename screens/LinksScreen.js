import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerTitleStyle: {
      flex: 1
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.bodyText}>Hej Kristian!</Text>
        <Text style={styles.listTitle}>Ordrehistorik:</Text>
        <Text style={styles.listItem}>Spaghetti Carbonara</Text>
        <Text style={styles.listItem}>Forloren Hare</Text>
        <Text style={styles.listItem}>Østers</Text>
        <Text style={styles.listItem}>Pandekager</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  bodyText: {
    padding: 15,
    fontSize: 24,
    fontWeight: "bold"
  },
  listTitle: {
    paddingLeft: 15,
    paddingBottom: 5,
    fontSize: 24
  },
  listItem: {
    paddingLeft: 15,
    paddingBottom: 5
  }
});
