import { StyleSheet, Text, View } from "react-native";

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

const ResultsPage = (props: AllResultsPageInterface) => {
  return (
    <>
      <Text role="heading" style={styles.heading}>Results</Text>
      {props.allHistories
        ? props.allHistories.map((history, i) =>
          <View key={i} style={{ flexDirection: 'row' }}>
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
        : <Text>No results found</Text>}
    </>
  );
};

export default ResultsPage;


const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  timeFocus: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(221, 155, 61)'
  },
  timeBreak: {
    fontSize: 16,
    color: 'rgb(148, 203, 240)'
  }
})