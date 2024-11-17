import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { State } from '../app/index';

interface PomodoroButtonInterface {
  onClick: () => void;
  text: string;
  stateName: State;
  hasOverran?: boolean;
  time: number;
}

export const formatTime = (time: number) => {
  const absTime = Math.abs(time);
  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;

  return (
    <>
      {time < 0 ? "-" : ""}
      {hours}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </>
  );
};

let defaultColor = 'darkslateblue';

const PomodoroButton: React.FC<PomodoroButtonInterface> = ({
  onClick,
  text,
  stateName,
  hasOverran,
  time
}) => {
  let color: string = defaultColor;

  if (hasOverran) {
    color = 'rgb(119, 16, 16)';
  } else {
    switch (stateName) {
      case State.focus:
        color = 'rgb(221, 155, 61)';
        break;
      case State.break:
        color = 'rgb(148, 203, 240)';
        break;
      case State.initial:
      default:
        color = defaultColor;
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.pomodoroButton, { backgroundColor: color }]}
        onPress={onClick}
      >
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.buttonText}>{formatTime(time)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pomodoroButton: {
    width: 250, // Adjust this value as needed
    height: 250, // Same as width to make it a circle
    borderRadius: 125, // Half of the width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default PomodoroButton;
