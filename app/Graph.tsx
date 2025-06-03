import React from "react";
import AppPageWrapper from '@/components/AppPageWrapper';
import { Area, Line, Chart, HorizontalAxis, VerticalAxis, Label } from 'react-native-responsive-linechart';
import { testBasicPlots, testPlots, timestampsToPlots, valueToTime } from "@/utils/timeHelpers";
import { useTimelines } from "@/context/TimelinesProvider";


const GraphPage = () => {
    const { allTimelines } = useTimelines();

    let data = testPlots
    let forceTestData = false
    console.log(testPlots)

    if (!forceTestData)
    {
        if (allTimelines && allTimelines.length > 0) {
            let mostRecentTimeline = allTimelines[allTimelines.length - 1]
            let mostRecentTimelineAsPlots = timestampsToPlots(allTimelines[allTimelines.length - 1])
            console.log(mostRecentTimeline)
            console.log(mostRecentTimelineAsPlots)
            // console.log('most recent timeline, can we load it on graph?', allTimelines[allTimelines.length - 1])
            data = mostRecentTimelineAsPlots
        } else {
            console.log('load test data onto graph', testPlots)
        }
    }
    return (
        <AppPageWrapper>
            <Chart style={{height: 400, width: "100%"}}
                data={data}
                padding={{left: 40, bottom: 60, right: 20, top: 20}}
                // Todo: this value only works assuming you work around an hour at a time. for testing is hard to see. can we adjust this so it's as tall as your longest wokr period?
                yDomain={{ min: 0, max: forceTestData ? 90 : 1}}
            >
                <VerticalAxis 
                    tickCount={3} 
                    theme={ axisTheme } />
                <HorizontalAxis 
                    tickCount={7}
                    theme={{
                        ...axisTheme, 
                        labels: { 
                            label: {...labelTheme, rotation: 60, dx: 0, dy: -30},
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