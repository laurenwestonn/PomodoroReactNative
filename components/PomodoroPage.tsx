import { State } from '@/constants/State';
import { View, Text, TouchableOpacity } from 'react-native';
import PomodoroPageButton from './PomodoroPageButton';

export interface PomodoroPageInterface {
  state: State;
  setState: (state: State) => void;
  time: number;
  history: number[];
  setHistory: (time: number[]) => void;
}

export const calcBreak = (time: number) => {
  return Math.floor(time / 5);
};

const PomodoroPage = (props: PomodoroPageInterface) => {

  const onPause = () => {
    // if we were on focus, we want to save the current time, then pad an empty entry
    if (props.state === State.focus) {
      console.log('Pause from working')
      console.log('history is', props.history)
      props.setHistory([...props.history, props.time, 0]);
      console.log('setting history', [...props.history, props.time, 0])
    } else if (props.state === State.break) {
      console.log('Pause from a break')
      console.log('history is', props.history)
      const recommendedBreak = calcBreak(
        props.history[props.history.length - 1]
      );
      props.setHistory([...props.history, recommendedBreak - props.time]);
      console.log('setting history', [...props.history, recommendedBreak - props.time])

    }
    props.setState(State.pause)

  }

  return <View style={{ alignItems: 'center', gap: 20 }}>
    {props.state !== State.pause && <TouchableOpacity style={{ backgroundColor: 'white', height: 50, width: 50, borderRadius: '100%'}} onPress={onPause}>
      <Text>Pause</Text>
    </TouchableOpacity>}

    <PomodoroPageButton {...props} />

    <View>
    {
      props.history.map((x,i) => (
        <Text key={i} style={{color: (i%2 === 0 ? 'orange' : 'powderblue')}}>{(Math.round(x) / 1000).toFixed(2)}</Text>
      ))
    }
    </View>
  </View>
};

export default PomodoroPage;
