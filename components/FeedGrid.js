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
import { EvilIcons, AntDesign, FontAwesome } from "@expo/vector-icons";

export default class Feed extends Component {
  render() {
    const { data } = this.props;
    const { image } = JSON.parse(data.json_metadata);

    return (
      <View style={styles.FeedContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginBottom: 4,
          }}
        >
          <Image
            source={{
              uri: `https://steemitimages.com/u/${data.author}/avatar`,
            }}
            style={{
              width: 40,
              height: 40,
              // aspectRatio: 0.9,
              resizeMode: "contain",
              borderRadius: 50,
              borderWidth: 0.4,
              borderColor: "#E3CEF6",
              // flex: 1,
            }}
          />
          <Text style={{ flex: 1, marginLeft: 8 }}>{data.author}</Text>
          <Text style={{ flex: 2, marginLeft: 8 }}>
            {new Date(data.created).toDateString()}{" "}
            <Text color="#A4A4A4" style={{ fontSize: 12 }}>
              ({data.category})
            </Text>
          </Text>
        </View>
        {image && image.length ? (
          <View>
            <Image
              source={{ uri: image[0] }}
              style={{
                height: 200,
                width: null,
                flex: 1,
                marginBottom: 10,
                marginTop: 2,
              }}
            />
          </View>
        ) : null}
        <View style={styles.FeedContent}>
          <Text style={{ fontWeight: "500" }}>{data.title}</Text>
        </View>
        <View style={styles.FeedContent}>
          <Text>{data.body.replace(/\n/g, " ").slice(0, 150)}</Text>
        </View>
        <View style={styles.FeedContent}>
          {/* <Text style={{ marginRight: 10 }}>
            {data.active_votes.length} upvotes
          </Text> */}
          <Text style={{ marginRight: 8, fontSize: 13 }}>
            {data.pending_payout_value}
          </Text>
          <FontAwesome
            name="thumbs-o-up"
            size={17}
            onPress={() => alert("upvote")}
          />
          <Text style={{ marginLeft: 6, marginRight: 2 }} />
          <FontAwesome
            name="comment-o"
            size={16}
            onClick={() => alert("comment")}
          />
          {/* <Text style={{ marginRight: 10, fontSize: 10 }}>
            {data.replies.length}
          </Text> */}
        </View>
      </View>
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
    width: "99%",
    padding: 20,
    margin: 1.5,
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  FeedContent: {
    marginBottom: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "baseline",
  },
});
