import { State } from '@/constants/State';
import PomodoroButton from "./PomodoroButton";
import { calcBreak, PomodoroPageInterface } from './PomodoroPage';



const PomodoroPageButton = (props: PomodoroPageInterface) => {
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
          console.log('setting history', [...props.history, props.time])
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
          console.log('setting history', [...props.history, recommendedBreak - props.time])
        }}
        text={'Back to it in...'}
        stateName={State.break}
        hasOverran={props.time < 0}
        time={props.time}
      />
    );
  } else if (props.state === State.pause) {
    return (
      <PomodoroButton
        onClick={() => {
          props.setState(State.focus);
        }}
        text={'Paused.\nTap to resume.'}
        stateName={State.pause}
        hasOverran={props.time < 0}
      />
    );

  }

  return null;
};

export default PomodoroPageButton;
