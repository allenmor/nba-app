import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";



function Stats() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://nbaexpressbe.onrender.com/playerz")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.statsTable}>
      {index === 0 && (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.playerName]}>Player</Text>
          <Text style={styles.headerCell}>Pos</Text>
          <Text style={styles.headerCell}>Age</Text>
          <Text style={styles.headerCell}>Tm</Text>
          <Text style={styles.headerCell}>G</Text>
          <Text style={styles.headerCell}>GS</Text>
          <Text style={styles.headerCell}>MP</Text>
          <Text
            style={[
              styles.headerCell,
              { backgroundColor: "rgba(0, 0, 255, 0.7)" },
            ]}
          >
            Pts
          </Text>
          <Text
            style={[
              styles.headerCell,
              { backgroundColor: "rgba(0, 0, 255, 0.7)" },
            ]}
          >
            TRB
          </Text>
          <Text
            style={[
              styles.headerCell,
              { backgroundColor: "rgba(0, 0, 255, 0.7)" },
            ]}
          >
            AST
          </Text>
          <Text style={styles.headerCell}>FG</Text>
          <Text style={styles.headerCell}>FGA</Text>
          <Text style={styles.headerCell}>FG%</Text>
          <Text style={styles.headerCell}>3P</Text>
          <Text style={styles.headerCell}>3PA</Text>
          <Text style={styles.headerCell}>3P%</Text>
          <Text style={styles.headerCell}>2P</Text>
          <Text style={styles.headerCell}>2PA</Text>
          <Text style={styles.headerCell}>2P%</Text>
          <Text style={styles.headerCell}>FTA</Text>
          <Text style={styles.headerCell}>FT%</Text>
          <Text style={styles.headerCell}>ORB</Text>
          <Text style={styles.headerCell}>DRB</Text>
          <Text style={styles.headerCell}>STL</Text>
          <Text style={styles.headerCell}>BLK</Text>
          <Text style={styles.headerCell}>TOV</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.playerName]}>{item.name}</Text>
        <Text style={styles.cell}>{item.position}</Text>
        <Text style={styles.cell}>{item.age}</Text>
        <Text style={{ color: "blue", width: 50, textAlign:'center' }}>{item.team}</Text>
        <Text style={styles.cell}>{item.gamesPlayed}</Text>
        <Text style={styles.cell}>{item.gamesStarted}</Text>
        <Text style={styles.cell}>{item.minutesPerGame}</Text>
        <Text
          style={[
            styles.cell,
            {
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              color: "black",
              fontWeight: "bold",
            },
          ]}
        >
          {item.pointsPerGame}
        </Text>
        <Text
          style={[
            styles.cell,
            {
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              color: "black",
              fontWeight: "bold",
            },
          ]}
        >
          {(+item.defensiveRebounds + +item.offensiveRebounds).toFixed(1)}
        </Text>
        <Text
          style={[
            styles.cell,
            {
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              color: "black",
              fontWeight: "bold",
            },
          ]}
        >
          {item.assists}
        </Text>
        <Text style={styles.cell}>{item.fieldGoalsMade}</Text>
        <Text style={styles.cell}>{item.fieldGoalsAttempted}</Text>
        <Text style={styles.cell}>{item.fieldGoalPercentage}</Text>
        <Text style={styles.cell}>{item.threePointersMade}</Text>
        <Text style={styles.cell}>{item.threePointersAttempted}</Text>
        <Text style={styles.cell}>{item.threePointPercentage}</Text>
        <Text style={styles.cell}>{item.twoPointersMade}</Text>
        <Text style={styles.cell}>{item.twoPointersAttempted}</Text>
        <Text style={styles.cell}>{item.twoPointPercentage}</Text>
        <Text style={styles.cell}>{item.freeThrowsAttempted}</Text>
        <Text style={styles.cell}>{item.freeThrowPercentage}</Text>
        <Text style={styles.cell}>{item.offensiveRebounds}</Text>
        <Text style={styles.cell}>{item.defensiveRebounds}</Text>
        <Text style={styles.cell}>{item.steals}</Text>
        <Text style={styles.cell}>{item.blocks}</Text>
        <Text style={styles.cell}>{item.turnovers}</Text>
      </View>
    </View>
  );
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (text) => {
    setSearchText(text);
    console.log(text)
  };

  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>2022-23 NBA Player Stats: Per Game</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by player name"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal keyboardShouldPersistTaps="always">
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            // ListHeaderComponent={renderHeader}
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
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
  playerName: {
    fontWeight: "bold",
    minWidth: 120, // Adjust the minWidth to the maximum width you want to allocate for player names
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  }
});

export default Stats;
