import { XYValue } from "react-native-responsive-linechart";
import { humanReadablePlots, workCycle as exampleWorkDurations } from "./testData";


// =============================
// TIME CONVERSION UTILITIES
// =============================

// Convert decimal time (e.g. 8.5) to human-readable format (e.g. "8:30")
export const valueToTime = (value: number): string => {
    const hours = Math.floor(value);

    const decimal = value % 1;
    const minutes = Math.round(decimal * 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${(formattedMinutes)}`;
}

// Convert human-readable time (e.g., "8:15") to decimal time (e.g., 8.25)
export const timeToValue = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    return hours + minutes / 60;
}

// Convert milliseconds timestamp to decimal time value
// (e.g. 1737887405000 -> 10.5)
const timestampToGraphValue = (timestamp: number): number => {
    const date = new Date(timestamp);
    return date.getHours() + date.getMinutes() / 60;
}

// Convert timestamp to human-readable time
// (e.g. 1737887405000 -> "10:30")
const timestampToHumanReadable = (timestamp: number): string => {
    const date = new Date(timestamp);
    const mins = date.getUTCMinutes().toString().padStart(2, '0');
    return `${date.getUTCHours()}:${mins}`;
}


// =============================
// DATE & TIME MANIPULATION
// =============================

export const getTimeNowInSeconds = () => Math.ceil(Date.now() / 1000);
const getTimeNowInMs = () => Date.now();

const addMinutes = (timestamp: number, minutes: number): number => {
    return timestamp + minutes * 60 * 1000;
}

// =============================
// PLOTTING HELPERS
// =============================

// { x: "8:30", y: 30} -> { x: 8.5, y: 30 }
export const humanReadableToGraphPlot = (point: { x: string, y: number }) : XYValue => {
    return ({ 
        x: timeToValue(point.x),
        y: point.y
     });
};

const createPlot = (timestamp1: number, timestamp2: number): XYValue | null => {
    if (timestamp1 > timestamp2) {
        console.error('The first time should be before the second, in order to create a plot');
        return null;
    }
    
    return {
        x: timestampToGraphValue((timestamp1 + timestamp2) / 2),
        y: (timestamp2 - timestamp1) / 1000 / 60
    };
};

// Simulate work day based on durations, in the format of timestamps
const simulateWork = (timestamp: number, workDurations: number[]): number[] => {
    return workDurations.reduce<number[]>((acc, duration) => {
        const lastTime = acc.length > 0 ? acc[acc.length - 1] : timestamp;
        acc.push(addMinutes(lastTime, duration));
        return acc;
    }, [timestamp]);
};

const timestampsToPlots = (timestamps: number[]): XYValue[] => {
    if (!timestamps || timestamps.length < 2) return [];

    const plots: XYValue[] = [];
    for (let i = 1; i < timestamps.length; i += 2) {
        const plot = createPlot(timestamps[i-1], timestamps[i]);
        plot && plots.push(plot);
    }

    return plots;
};

// =============================
// INITIALIZATION & EXAMPLES
// =============================
const now = getTimeNowInMs();
const date = new Date(now);
const eightAm = new Date(date.setHours(8)).setMinutes(0);
const anExampleDaysTimestamps = simulateWork(eightAm, exampleWorkDurations);

export const testBasicPlots = humanReadablePlots.map(humanReadableToGraphPlot);
export const testPlots = timestampsToPlots(anExampleDaysTimestamps);