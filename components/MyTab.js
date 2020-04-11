import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Linking,
  Button,
} from "react-native";
import Feed from "./FeedGrid";
import { WebView } from "react-native-webview";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class MyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      postCount: 0,
      reputation: 0,
      profile: {},
      following_count: 0,
      follower_count: 0,
      activeIndex: 0,
      blogs: [],
      created: "",
      balanceSteem: "",
      balanceSbd: "",
    };
  }

  segmentClicked = (activeIndex) => {
    this.setState({
      activeIndex,
    });
  };

  // renderSectionOne = () => {
  //   return
  // };

  renderSectionTwo = () => {
    return this.state.blogs.map((blog) => <Feed data={blog} key={blog.url} />);
  };

  renderSection = () => {
    if (this.state.activeIndex === 0) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderSectionTwo()}
        </View>
      );
    }
    // } else if (this.state.activeIndex === 1) {
    //   return
    // }
  };

  fetchAccount(username) {
    const data = {
      jsonrpc: "2.0",
      method: "condenser_api.get_accounts",
      params: [[username]],
      id: 3,
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => response.result[0]);
  }

  fetchFollowCnt(username) {
    const data = {
      jsonrpc: "2.0",
      method: "condenser_api.get_follow_count",
      params: [username],
      id: 4,
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.result);
  }

  fetchState(username) {
    const data = {
      jsonrpc: "2.0",
      method: "call",
      params: ["database_api", "get_state", [`/@${username}`]],
      id: 5,
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.result);
  }

  fetchBlog(username, ini = 0, limit = 50) {
    const data = {
      jsonrpc: "2.0",
      method: "condenser_api.get_blog",
      params: [username, ini, limit],
      id: 5,
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.result); //result=Array of 20 contents
  }

  componentDidMount() {
    const username = "tanky";

    this.fetchFollowCnt(username).then(
      ({ follower_count, following_count }) => {
        this.setState({
          follower_count,
          following_count,
        });
      }
    );

    this.fetchState(username).then(
      ({ accounts, content, feed_price, props }) => {
        const {
          name,
          post_count,
          reputation,
          json_metadata,
          blog,
          net_vesting_shares,
          created,
        } = accounts[username];
        const { profile } = JSON.parse(json_metadata);
        const log =
          Math.log(parseInt(String(reputation).substring(0, 4))) / Math.log(10);
        const lolog =
          Math.max(
            String(reputation).length - 1 + (log - parseInt(log)) - 9,
            0
          ) *
            9 +
          25;
        this.setState({
          name,
          reputation: Number(lolog.toFixed(0)),
          postCount: post_count,
          profile,
          blogs: Object.values(content),
          created: created.substring(0, 10),
        });
      }
    );

    this.fetchAccount(username).then(({ balance, sbd_balance }) =>
      this.setState({
        balanceSteem: balance,
        balanceSbd: sbd_balance,
      })
    );
  }

  render() {
    const {
      name,
      reputation,
      profile,
      postCount,
      follower_count,
      following_count,
      created,
      votingPower,
      balanceSteem,
      balanceSbd,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, marginTop: 20, backgroundColor: "#fff" }}>
          <View
            style={{
              flex: 1.5,
              flexDirection: "row",
              padding: 20,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                source={{ url: profile.profile_image }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{ flex: 3 }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <View name="name and birth" style={{ paddingLeft: 27 }}>
                  <Text style={{ paddingBottom: 1, fontSize: 15 }}>
                    @{name} ({reputation})
                  </Text>
                  <Text style={{ fontSize: 10 }}>🎂 {created}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingTop: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text>{postCount}</Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>posts</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text>{follower_count}</Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      follower
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text>{following_count}</Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      following
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 8,
                    paddingLeft: 30,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Text style={{ fontSize: 10 }}>BALANCE</Text> */}
                  <Text style={{ fontSize: 11 }}>
                    {balanceSteem} | {balanceSbd}
                  </Text>
                  <AntDesign
                    style={{ marginLeft: 15 }}
                    name="wallet"
                    size={20}
                    color="#00BFFF"
                    onPress={() =>
                      Linking.openURL(
                        "https://steemitwallet.com/@tanky/transfers"
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text>{profile.about}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopWidth: 1,
              borderTopColor: "#eae5e5",
            }}
          ></View>
        </View>
        <View
          style={{
            flex: 3.5,
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopWidth: 1,
            borderTopColor: "#eae5e5",
          }}
        >
          <ScrollView>{this.renderSection()}</ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
