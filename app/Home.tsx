import React, { useState, useEffect } from 'react';
import PomodoroPage from "@/components/PomodoroPage";
import { View } from "react-native";
import ResultsPage from '@/components/ResultsPage';
import ResetAndFinishButtons from '@/components/ResetAndFinishButtons';
import { State } from '@/constants/State';
import { useHistories } from '@/context/HistoriesProvider';
import AppPageWrapper from '@/components/AppPageWrapper';
import { useRouter } from "expo-router";

export default function Home() {
  const { addHistory } = useHistories();
  const [state, setState] = useState(State.initial);
  const [history, setHistory] = useState<number[]>([]);
  const [time, setTime] = useState(0);

  const router = useRouter();
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

  // Todo: DRY with Pomodoro page code
  const updateHistoryWithLatestTime = () => {
    if (state == State.focus) {
      setHistory([...history, time]);
      return [...history, time];
    } else if (state == State.break) {
            
      const calcBreak = (time: number) => {
        return Math.floor(time / 5);
      };

      const recommendedBreak = calcBreak(
        history[history.length - 1]
      );

      setHistory([...history, recommendedBreak - time]);
      return [...history, recommendedBreak - time];
    }

    return [];
  };

  const showResults = () => {
    const history: number[] = updateHistoryWithLatestTime();

    if (history.length > 0) {
      addHistory(history);
    }

    router.push("ResultsTab");
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
        setHistory={setHistory}
        showResults={showResults}
        setTime={setTime}
      />

    </AppPageWrapper>
  );
}