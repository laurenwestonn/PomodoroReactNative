import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React from 'react';

interface AllResultsPageInterface {
  allHistories: number[][];
}

const formatTimeSimple = (time: number) => {
  const absTime = Math.abs(time);

  if (absTime < 60) {
    return `${absTime}s`;
  } else {
    if (absTime < 3600) {
      return `${Math.floor(absTime / 60)}m ${Math.floor(absTime % 60)}s`;
    }
  }

  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;

  return (
    <Text>
      {hours}hr {minutes.toString().padStart(2, "0")}m{" "}{seconds.toString().padStart(2, "0")}s
    </Text>
  );
};

const renderResults = (allHistories: number[][]) => {
  return (
    allHistories && allHistories.length > 0
        ? allHistories.map((history, i) =>
          <View key={i} style={styles.resultRow}>
            {history.map((time, i) => (
              <Text
                key={i}
                style={i % 2 === 0 ? styles.timeFocus : styles.timeBreak}
              >
                {formatTimeSimple(time)}
              </Text>
            ))}
          </View>
        )
        : <Text style={styles.timeBreak}>No results found</Text>
  )
}

const AllResultsPage = (props: AllResultsPageInterface) => {
  return (
    <>
      <Text role="heading" style={styles.heading}>Results</Text>
      {/* Make absolute top right */}
      <Button title={"Clear history"} onPress={() => console.log('implement clear all histories here')}/>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {renderResults(props.allHistories)}
      </ScrollView>
    </>
  );
};

export default AllResultsPage;


const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 40
  },
  resultsContainer: {
    padding: 16,
    flex: 1,
    width: '100%',
  },
  resultRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '60%',
  },
  timeFocus: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 5,
    color: 'rgb(221, 155, 61)'
  },
  timeBreak: {
    fontSize: 20,
    padding: 5,
    color: 'rgb(148, 203, 240)'
  }
})