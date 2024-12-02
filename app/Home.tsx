import React, { useState, useEffect } from 'react';
import PomodoroPage from "@/components/PomodoroPage";
import { View, Image } from "react-native";
import ResultsPage from '@/components/ResultsPage';
import ResetAndFinishButtons from '@/components/ResetAndFinishButtons';
import { State } from '@/constants/State';
import { useHistories } from '@/context/HistoriesProvider';
import AppPageWrapper from '@/components/AppPageWrapper';


export default function Home() {
  const { addHistory } = useHistories();
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


  const finishSession = () => {
    if (history.length > 0) {
      addHistory(history); // Add the current session's history to the global state
      setHistory([]);
    }
  };

  return (
    <AppPageWrapper>

      <View style={{
        alignItems: 'center'
      }}>
        {state === State.results
          ?
          <ResultsPage history={history} />
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
        finishSession={finishSession}
        time={time}
        setTime={setTime}
      />

    </AppPageWrapper>
  );
}