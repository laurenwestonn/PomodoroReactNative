import React, { useState, useEffect } from 'react';
import PomodoroPage from "@/components/PomodoroPage";
import { View } from "react-native";
import ResetAndFinishButtons from '@/components/ResetAndFinishButtons';
import { State } from '@/constants/State';
import { useHistories } from '@/context/HistoriesProvider';
import AppPageWrapper from '@/components/AppPageWrapper';
import { useRouter } from "expo-router";
import { getTimeNowInMillis, timestampToHumanReadable } from '@/utils/timeHelpers';

export default function Home() {
  const { addHistory } = useHistories();
  const [state, setState] = useState(State.initial);
  const [history, setHistory] = useState<number[]>([]);
  const [time, setTime] = useState(0);
  const [focusStartTime, setFocusStartTime] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    console.log('State:', State[state])

    if (state === State.focus) {
      let startTimeNew = getTimeNowInMillis();
      setFocusStartTime(startTimeNew)

      intervalId = setInterval(() => {
        setTime(getTimeNowInMillis() - startTimeNew)
      }, 10); // update value more often than every second, to account for changing state mid second

    } else if (state === State.break) {
      let startTimeNew = getTimeNowInMillis() + getRecommendedBreak();
      // console.log('Changed to break at\t', timestampToHumanReadable(getTimeNowInMillis()))
      // console.log('Countdown will be from\t', timestampToHumanReadable(startTimeNew))
      
      intervalId = setInterval(() => {
        setTime(startTimeNew - getTimeNowInMillis())
      }, 10);
    } else {
      setHistory([]);
      setTime(0);
    }

    // The next time this use effect is entered, it stops doing the regularly defined thing in setInterval
    return () => clearInterval(intervalId);
  }, [state])

  const calcBreak = (time: number) => {
    return Math.floor(time / 5);
  };

  const getRecommendedBreak = () => {
    let time = getTimeNowInMillis() - focusStartTime
    return Math.floor(time / 5)
  };

  // Todo: DRY with Pomodoro page code
  const returnHistoryIncludingCurrentTime = () => {
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
    const history: number[] = returnHistoryIncludingCurrentTime();
    setHistory([]);
    setTime(0);
    if (history.length > 0) {
      addHistory(history);
    }

    router.push("/ResultsTab");
  };

  return (
    <AppPageWrapper>

      <View style={{
        alignItems: 'center'
      }}>
        <PomodoroPage
          state={state}
          setState={setState}
          history={history}
          setHistory={setHistory}
          time={time}
        />
      </View>

      <ResetAndFinishButtons
        state={state}
        setInitialState={() => setState(State.initial)}
        showResults={showResults}
      />

    </AppPageWrapper>
  );
}