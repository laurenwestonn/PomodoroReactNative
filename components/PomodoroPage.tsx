import { State } from '@/constants/State';
import { TouchableOpacity } from 'react-native';
import PomodoroPageButton from './PomodoroPageButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Timeline } from './Timeline';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react"

export interface PomodoroPageInterface {
  state: State;
  setState: (state: State) => void;
  time: number;
  history: number[];
  addToHistorySet: (records: number[]) => void;
  getRecommendedBreakTime: () => number; 
}

const PomodoroPage = (props: PomodoroPageInterface) => {

  const onPause = () => {
    // if we were on focus, we want to save the current time, then pad an empty entry
    if (props.state === State.focus) {
      console.log('Pause from working')
      props.addToHistorySet([props.time, 0]);
    } else if (props.state === State.break) {
      console.log('Pause from a break');
      props.addToHistorySet([props.getRecommendedBreakTime() - props.time]);
    }
    props.setState(State.pause)

  }
  
  return <SafeAreaView className={'items-center gap-10 pt-4'}>
    {props.state !== State.pause && props.state !== State.initial &&
      <TouchableOpacity
        className={'bg-amber-100 h-14 w-14 rounded-full justify-center items-center'}
        onPress={onPause}
        accessible={true}
        accessibilityLabel="Pause button"
        accessibilityHint="Pauses the current action"
      >
        <MaterialIcons name="pause" size={28} color="black" />
      </TouchableOpacity>
    }

    <PomodoroPageButton {...props} />

    <Timeline history={props.history} />
  </SafeAreaView>
};

export default PomodoroPage;
