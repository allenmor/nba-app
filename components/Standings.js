import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Standings() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://nbaexpressbe.onrender.com/standings")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.standingsTable}>
      {index === 0 && (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.teamName]}>Team</Text>
          <Text style={styles.headerCell}>GP</Text>
          <Text style={[styles.headerCell, styles.winLossCell]}>W</Text>
          <Text style={[styles.headerCell, styles.winLossCell]}>L</Text>
          <Text style={[styles.headerCell]}>PCT</Text>
          <Text style={[styles.headerCell]}>PTS+</Text>
          <Text style={[styles.headerCell]}>PTS-</Text>
          <Text style={[styles.headerCell]}>PTS+ /G</Text>
          <Text style={[styles.headerCell]}>PTS- /G</Text>
          <Text style={[styles.headerCell]}>DIFF</Text>
          <Text style={[styles.headerCell]}>EWP</Text>
        </View>
      )}
      <TouchableOpacity style={styles.row}>
        <Text style={[styles.cell, styles.teamName]}>{item.Team}</Text>
        <Text style={styles.cell}>{item.Gp}</Text>
        <Text style={[styles.cell, styles.winLossCell]}>{item.Gw}</Text>
        <Text style={[styles.cell, styles.winLossCell]}>{item.GL}</Text>
        <Text style={[styles.cell]}>{(parseFloat(item["% Victory"]) / 100).toFixed(3).substring(1)}</Text>
        <Text style={[styles.cell]}>{item["Pts+"]}</Text>
        <Text style={[styles.cell]}>{item["Pts-"]}</Text>
        <Text style={[styles.cell]}>{item["Pts+ /g"]}</Text>
        <Text style={[styles.cell]}>{item["Pts- /g"]}</Text>
        <Text style={[styles.cell]}>{item.Diff}</Text>
        <Text style={[styles.cell]}>{item["Expected Winning %"]}</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2022-23 NBA Standings</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 50 : 20
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
    minWidth: 50, // Add a fixed width
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    width: 50, // Add a fixed width
  },
  teamName: {
    fontWeight: "bold",
    minWidth: 120, // Adjust the minWidth to the maximum width you want to allocate for team names
  },
  winLossCell: {
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    color: "black",
  },

});

export default Standings;
