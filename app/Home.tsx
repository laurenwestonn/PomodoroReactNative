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
  const [startTime, setStartTime] = useState(0);
  const getTimeNow = () => Math.ceil(new Date().getTime() / 1000);

  const router = useRouter();

  useEffect(() => {
    if (state === State.break) { 
      setStartTime(getTimeNow() + calcBreak(getTimeNow() - startTime));
    } else {
      setStartTime(getTimeNow());
    }
  }, [state])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (state === State.focus) {
      intervalId = setInterval(() => setTime(getTimeNow() - startTime)), 10; // update value more often than every second, to account for changing state mid second
    } else if (state === State.break) {
      intervalId = setInterval(() => setTime(startTime - getTimeNow()), 10);
    } else {
      setTime(0);
    }

    // The next time this use effect is entered, it stops doing the regularly defined thing in setInterval
    return () => clearInterval(intervalId);
  }, [startTime])

  const calcBreak = (time: number) => {
    return Math.floor(time / 5);
  };

  // Todo: DRY with Pomodoro page code
  const updateHistoryWithLatestTime = () => {
    if (state == State.focus) {
      return [...history, time];
    } else if (state == State.break) {

      const recommendedBreak = calcBreak(
        history[history.length - 1]
      );

      return [...history, recommendedBreak - time];
    }

    return [];
  };

  const showResults = () => {
    const history: number[] = updateHistoryWithLatestTime();
    setHistory([]);
    setTime(0);
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