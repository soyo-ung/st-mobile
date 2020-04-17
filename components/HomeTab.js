import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import Feed from "./FeedGrid";

export default class HomeTab extends Component {
  state = {
    feeds: [],
  };

  componentDidMount() {
    this.fetchFeeds().then((feeds) => {
      this.setState({
        feeds,
      });
    });
  }

  fetchFeeds() {
    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{ tag: "kr", limit: 50 }],
      ],
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.result)
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={{ backgroundColor: "#fff" }}>
          {this.state.feeds.map((feed) => (
            <Feed data={feed} key={feed.post_id} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  FeedContainer: {
    width: "100%",
    padding: 20,
    margin: 1,
    // height: 250,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 0.5,
  },
  FeedContent: {
    height: null,
    marginBottom: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
