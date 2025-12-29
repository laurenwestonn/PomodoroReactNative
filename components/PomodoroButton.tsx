import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { State } from '@/constants/State';

interface PomodoroButtonInterface {
  onClick: () => void;
  text: string;
  stateName: State;
  hasOverran?: boolean;
  time?: number;
}

export const formatTime = (time: number) => {
  const timeInSeconds = Math.floor(Math.abs(time));
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

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
    color = 'rgba(123, 52, 52, 1)';
  } else {
    switch (stateName) {
      case State.focus:
        color = 'rgba(195, 147, 79, 1)';
        break;
      case State.break:
        color = 'rgba(169, 187, 199, 1)';
        break;
      case State.pause:
        color = 'rgba(158, 153, 194, 1)';
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
        {time !== undefined && <Text style={styles.buttonTimeText}>{formatTime(time)}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const buttonRadius = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pomodoroButton: {
    width: buttonRadius,
    height: buttonRadius,
    borderRadius: buttonRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonTimeText: {
    // fontFamily: 'SpaceMono',
    fontFamily: 'Monospace',
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
  }
});

export default PomodoroButton;
