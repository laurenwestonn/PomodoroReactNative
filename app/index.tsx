import React, { useState, useEffect } from 'react';
import PomodoroPage from "@/components/PomodoroPage";
import { View, Image } from "react-native";
import ResultsPage from '@/components/ResultsPage';
import ResetAndFinishButtons from '@/components/ResetAndFinishButtons';
import { State } from '@/constants/State';


export default function Index() {
  const [state, setState] = useState(State.initial);
  const [history, setHistory] = useState<number[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (state === State.focus) {
      // incrementing time by 1 every second
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    if (state === State.break) {
      // decrease time by 1 every second
      intervalId = setInterval(() => setTime(time - 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [state, time]);


  return (
    <View
      style={{
        backgroundColor: '#282c34',
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
      }}
    >
      <View style={{
        alignItems: 'center'
      }}>
        {state === State.results
          ?
          <ResultsPage history={history} setHistory={setHistory} time={time} />
          :
          <PomodoroPage
            state={state}
            setState={setState}
            history={history}
            setHistory={setHistory}
            time={time}
            setTime={setTime}
          />
        }

      </View>
        
      <ResetAndFinishButtons
        state={state}
        setState={setState}
        history={history}
        setHistory={setHistory}
        time={time}
        setTime={setTime}
      />

    </View>
  );
}