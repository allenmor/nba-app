import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import NewsCard from "./NewsCard";

function RealGm() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rss_url = "https://basketball.realgm.com/rss/wiretap/0/0.xml";
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          rss_url
        )}`
      );
      const data = await response.json();

      if (data.status !== "ok") {
        throw new Error(data.message);
      }

      let a = data.items;
      let b = a.filter((el, i) => {
        return !el.title.toLowerCase().includes("realgm");
      });

      setNews(b);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.newsContainer}>
        <Text style={styles.title}>News</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        news.map((el, i) => {
          return (
            <NewsCard
              key={i}
              title={el.title}
              date={el.pubDate}
              image={el.thumbnail}
              description={el.description}
            />
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    newsContainer: {
        marginTop: Platform.OS === 'ios' ? 40 : 25
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        color: "#1a1aff",
        backgroundColor: "#f0f8ff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        textTransform: "uppercase",
        letterSpacing: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
})

export default RealGm;
