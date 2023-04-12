import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function NewsCard({ title, date, image, description }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const formattedDescription = description.replace(/(<([^>]+)>)/gi, "");
  const shortenedDescription = formattedDescription.substring(0, 90);

  if (!image) {
    image =
      "https://assets.turbologo.com/blog/en/2019/10/19084930/NBA-logo-illustration.jpg";
  }

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = new Date(date).toLocaleString("en-US", options);

  const handleReadMore = () => {
    setShowFullDescription(true);
  };

  const handleReadLess = () => {
    setShowFullDescription(false);
  };
  console.log();

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: image ? image : "" }} />
      <View style={showFullDescription ? styles.infoDivScroll : styles.infoDiv}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.description}>
          {/* {showFullDescription ? formattedDescription : shortenedDescription}
          {formattedDescription.length > 100 &&
            (showFullDescription ? (

            ) : (
            ))} */}
          {!showFullDescription
            ? formattedDescription.substr(0, 100)
            : formattedDescription}
          {/* {formattedDescription} */}
        </Text>
        {!showFullDescription ? (
          <TouchableOpacity style={styles.button} onPress={handleReadMore}>
            <Text style={styles.buttonText}>Read more</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text onPress={handleReadLess} style={styles.readBtn}>
              Read less
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  infoDiv: {
    flex: 1,
  },
  infoDivScroll: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: "gray",
    marginBottom: 5,
  },
  description: {},
  button: {
    backgroundColor: "#4681f4",
    borderRadius: 20,
    alignItems: "center",
    width: 100,
    padding: 2,
  },
  buttonText: {
      color: 'white'
  },
});

export default NewsCard;
