import { StyleSheet, Text } from "react-native";

interface ResultsPageInterface {
  time: number;
  history: number[];
  setHistory: (time: number[]) => void;
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

const ResultsPage = (props: ResultsPageInterface) => {
  return (
    <>
      <Text role="heading" style={styles.heading}>Results</Text>
      {props.history.map((time, i) => (
        <Text 
          key={i} 
          style={i % 2 === 0 ? styles.timeFocus : styles.timeBreak }
        >
          {formatTimeSimple(time)}
        </Text>
      ))}
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