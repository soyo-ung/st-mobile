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

export default class TrendingTab extends Component {
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
        [{ tag: "trending", limit: 40 }],
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
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ScrollView style={{ backgroundColor: "#fff" }}>
          {this.state.feeds.map((feed) => (
            <Feed data={feed} key={feed.post_id} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
