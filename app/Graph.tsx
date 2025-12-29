import React from "react";
import AppPageWrapper from '@/components/AppPageWrapper';
import { Area, Line, Chart, HorizontalAxis, VerticalAxis, Label } from 'react-native-responsive-linechart';
import {testBasicPlots, testPlots, timestampsToPlots, valueToTime, valueToTimeLength} from "@/utils/timeHelpers";
import { useTimelines } from "@/context/TimelinesProvider";


const GraphPage = () => {
  const { allTimelines } = useTimelines();

  // Helper to check if all x values are the same
  const allXValuesSame = (plots: {x: number, y: number}[]) => {
    if (plots.length === 0) return true;
    const firstX = plots[0].x;
    return plots.every(plot => plot.x === firstX);
  };

  let data = testPlots

  let forceTestData = false

  if (forceTestData || !allTimelines || allTimelines.length <= 0) {
    console.log('using test plots')
  } else {
    console.log('show actual timeline')
    let mostRecentTimeline = allTimelines[allTimelines.length - 1]
    let mostRecentTimelineAsPlots = timestampsToPlots(allTimelines[allTimelines.length - 1])
    console.log('most recent timeline', mostRecentTimeline)
    console.log('as plots', mostRecentTimelineAsPlots)

    if (allXValuesSame(mostRecentTimelineAsPlots)) {
      console.log('all x values are the same, using test plots')
    } else {
      data = mostRecentTimelineAsPlots
    }
  }

  console.log('loading this data onto graph', data)
  var longestTimePeriod = Math.max(...(data.map(x => x.y)))

  return (
    <AppPageWrapper>
      <Chart 
        style={{height: "80%", width: "100%"}}
        data={data}
        padding={{left: 80, bottom: 80, right: 40, top: 50}}
        yDomain={{ min: 0, max: longestTimePeriod}}
      >
        <VerticalAxis
          tickCount={3}
          theme={{
          ...axisTheme,
            labels: {
              label: {...labelTheme, rotation: 30, dx: -10, dy: 6},
              formatter: valueToTimeLength
            }
            
          }}
        />
        <HorizontalAxis
          tickCount={7}
          theme={{
            ...axisTheme,
            labels: {
              label: {...labelTheme, rotation: 30, dx: 10, dy: -25},
              formatter: valueToTime
            }
          }}
        />
        <Area smoothing='cubic-spline' theme={{ gradient: { from: {color: 'pink' }, to: {color: 'cornflowerblue'}}}} />
        <Line smoothing='cubic-spline' theme={{ stroke: { color: 'white', width: 0 }, scatter: { default: {width: 7, height: 7, rx: 2, color: 'white' }} }} />
      </Chart>
    </AppPageWrapper>
  );
}

const labelTheme: Label = {
  color: 'white',
  fontSize: 16,
  fontWeight: 600,
  fontFamily: 'Tahoma',
  dx: -15
}

const axisTheme = {
  axis: {
    stroke: { color: 'white', width: 2 }
  },
  ticks: {
    stroke: { color: 'white', width: 2 },
  },
  labels: {
    label: labelTheme
  }
}

export default GraphPage;