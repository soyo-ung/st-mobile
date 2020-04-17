import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import { render } from "react-dom";
import Constants from "expo-constants";

function Item({ title, url }) {
  const rooturl = "https://steemit.com/";
  let link = rooturl + { url };
  return (
    <View style={styles.item}>
      <Text
        style={styles.title}
        onPress={() => Linking.openURL("https://steemit.com/" + url)}
      >
        {title}
      </Text>
    </View>
  );
}

export default class AlarmTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  fetchAlarm(username) {
    const data = {
      jsonrpc: "2.0",
      method: "bridge.account_notifications",
      params: [username, 10],
      id: 7,
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  componentDidMount() {
    const username = "tanky";

    this.fetchAlarm(username).then(({ result }) => {
      const reslist = [];
      {
        Object.keys(result).map((key) => reslist.push(result[key]));
      }

      this.setState({
        notifications: reslist,
      });
    });
  }

  render() {
    const { notifications } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <Item title={item.msg} url={item.url} />}
          KeyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FAFAFA",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 8,
    padding: 20,
  },
  title: {
    fontSize: 15,
    color: "#00BFFF",
  },
});
