import React from "react";
import AppPageWrapper from '@/components/AppPageWrapper';
import { Area, Line, Chart, HorizontalAxis, VerticalAxis, Label } from 'react-native-responsive-linechart';
import { testBasicPlots, testPlots, valueToTime } from "@/utils/timeHelpers";

interface ResultsTabProps {
    data?: any[]
}

const ResultsTab = (props: ResultsTabProps) => {
    console.log('Viewing graph for ', props.data ?? testPlots)
    return (
        <AppPageWrapper>
            <Chart style={{height: 400, width: "100%"}}
                data={props.data ?? testPlots}
                padding={{left: 40, bottom: 60, right: 20, top: 20}}
                yDomain={{ min: 0, max: 90}}
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

export default ResultsTab;