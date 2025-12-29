import React, { useState, useEffect } from 'react';
import PomodoroPage from "@/components/PomodoroPage";
import ResetAndFinishButtons from '@/components/ResetAndFinishButtons';
import { State } from '@/constants/State';
import { useHistories } from '@/context/HistoriesProvider';
import AppPageWrapper from '@/components/AppPageWrapper';
import { useRouter } from "expo-router";
import { getTimeNowInMillis, timestampToHumanReadable } from '@/utils/timeHelpers';
import { useTimelines } from '@/context/TimelinesProvider';
import "../global.css"
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function Home() {
  const { addHistory } = useHistories();
  const { addTimeline } = useTimelines();
  const [state, setState] = useState(State.initial);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  // Todo: dont need both, surely can find history from timestamps?
  const [timestamps, setTimestamps] = useState([getTimeNowInMillis()]);
  const [focusStartTime, setFocusStartTime] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    console.log('State:', State[state])
    setTimestamps([...timestamps, getTimeNowInMillis()])
    // For testing setting time hours apart
    // setTimestamps([...timestamps, getTimeNowInMillis(timestamps.length)])


    if (state === State.focus) {
      let startTimeNew = getTimeNowInMillis();
      setFocusStartTime(startTimeNew)

      intervalId = setInterval(() => {
        setTime(getTimeNowInMillis() - startTimeNew)
      }, 10); // update value more often than every second, to account for changing state mid second

    } else if (state === State.break) {
      let startTimeNew = getTimeNowInMillis() + getRecommendedBreak();
      
      intervalId = setInterval(() => {
        setTime(startTimeNew - getTimeNowInMillis())
      }, 10);
    } else if (state === State.pause) {
      
    } else {
      setTimestamps([])
      setHistory([]);
      setTime(0);
    }

    // The next time this use effect is entered, it stops doing the regularly defined thing in setInterval
    return () => clearInterval(intervalId);
  }, [state])

  useEffect(() => {
    console.log('timestamps: ', timestamps)
    timestampToHumanReadable(timestamps[timestamps.length])
  }, [timestamps])

  const calcBreak = (time: number) => {
    return Math.floor(time / 5);
  };

  const getRecommendedBreak = () => {
    let time = getTimeNowInMillis() - focusStartTime
    return Math.floor(time / 5)
  };

  // Todo: DRY with Pomodoro page code
  const returnHistoryIncludingCurrentTime = () => {
    if (state === State.focus || state === State.pause) {
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
    addTimeline([...timestamps, getTimeNowInMillis()])
    const history: number[] = returnHistoryIncludingCurrentTime();
    setHistory([]);
    setTime(0);
    if (history.length > 0) {
      addHistory(history);
    }

    router.push("/Graph");
  };
  
  const addToHistorySet = (historyRecords: number[]) => {
    setHistory([...history, ...historyRecords])
  }

  const getRecommendedBreakTime = () => {
    return Math.floor(history[history.length - 1] / 5)
  }

  useEffect(() => {
    console.log('History updated:', history)
  }, [history]);
  
  return (
    <SafeAreaProvider>
      <AppPageWrapper>
        <PomodoroPage
          state={state}
          setState={setState}
          history={history}
          addToHistorySet={addToHistorySet}
          time={time}
          getRecommendedBreakTime={getRecommendedBreakTime}
        />
        <ResetAndFinishButtons
          state={state}
          setInitialState={() => setState(State.initial)}
          showResults={showResults}
        />
  
      </AppPageWrapper>
    </SafeAreaProvider>
  );
}