import React from "react";
import AppPageWrapper from '@/components/AppPageWrapper';
import { Area, Line, Chart, HorizontalAxis, VerticalAxis, Label, XYValue } from 'react-native-responsive-linechart';

const valueToTime = (value: number) => {
    const hours = Math.floor(value);

    const decimal = value % 1;
    const minutes = Math.round(decimal * 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${(formattedMinutes)}`;
}

// 8:30 => 8.5
// 9:15 => 9.25
const timeToValue = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    return hours + minutes / 60;
}

const timeData = [
    { x: '8:30', y: 30},
    { x: '9:15', y: 30},
    { x: '9:30', y: 20},
    { x: '10:15', y: 60},
    { x: '10:45', y: 50},
];

const chartData: XYValue[] = timeData.map(point => {
    return ({ 
        x: timeToValue(point.x),
        y: point.y
     })
})

const ResultsTab = () => {
    return (
        <AppPageWrapper>
            <Chart style={{height: 400, width: "100%"}}
                data={chartData}
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
                            label: {...labelTheme, rotation: 60, dx: 0, dy: -30} ,
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