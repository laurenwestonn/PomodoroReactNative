import { State } from '@/constants/State';
import PomodoroButton from "./PomodoroButton";

interface PomodoroPageInterface {
  state: State;
  setState: (state: State) => void;
  time: number;
  setTime: (time: number) => void;
  history: number[];
  setHistory: (time: number[]) => void;
}

const calcBreak = (time: number) => {
  return Math.floor(time / 5);
};

const PomodoroPage = (props: PomodoroPageInterface) => {
  if (props.state === State.initial) {
    return (
      <PomodoroButton
        onClick={() => props.setState(State.focus)}
        text={'Start'}
        stateName={State.initial}
        time={props.time}
      />
    );
  } else if (props.state === State.focus) {
    return (
      <PomodoroButton
        onClick={() => {
          props.setState(State.break);
          props.setHistory([...props.history, props.time]);
          props.setTime(calcBreak(props.time));
        }}
        text={'Tap for a break'}
        stateName={State.focus}
        hasOverran={props.time < 0}
        time={props.time}
      />
    );
  } else if (props.state === State.break) {
    return (
      <PomodoroButton
        onClick={() => {
          props.setState(State.focus);
          const recommendedBreak = calcBreak(
            props.history[props.history.length - 1]
          );
          props.setHistory([...props.history, recommendedBreak - props.time]);
          props.setTime(0);
        }}
        text={'Back to it in...'}
        stateName={State.break}
        hasOverran={props.time < 0}
        time={props.time}
      />
    );
  }

  return null;
};

export default PomodoroPage;
