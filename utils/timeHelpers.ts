import { XYValue } from "react-native-responsive-linechart";
import { humanReadablePlots, workCycle } from "./testData";

// 8.5 => '8:30'
export const valueToTime = (value: number) => {
    const hours = Math.floor(value);

    const decimal = value % 1;
    const minutes = Math.round(decimal * 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${(formattedMinutes)}`;
}

// 8:30 => 8.5
// 9:15 => 9.25
export const timeToValue = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    return hours + minutes / 60;
}

export const humanReadableToGraphPlot = (point: { x: string, y: number }) => {
    return ({ 
        x: timeToValue(point.x),
        y: point.y
     });
}

export const getTimeNow = () => Math.ceil(new Date().getTime() / 1000);
export const getMsTimeNow = () => new Date().getTime();

export const addMinutes = (timestamp: number, minutes: number) => {
    return timestamp + minutes * 60 * 1000;
}

// 1737887405000 -> 10.5
const msToXValue = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();  // (0-23)
    const minutes = date.getMinutes();  // (0-59)

    const decimalTime = hours + minutes / 60;

    return parseFloat(decimalTime.toFixed(2));  // Round to 2 decimal places
}

const createPlot = (timestamp1: number, timestamp2: number, debug = false) => {
    if (timestamp1 > timestamp2) {
        console.error('The first time should be before the second, in order to create a plot')
    }
    debug && console.log(`From times ${timestampToHumanReadable(timestamp1)}, ${timestampToHumanReadable(timestamp2)}, created plot { x: ${msToXValue((timestamp1 + timestamp2) / 2)}, y: ${(timestamp2 - timestamp1) / 60000} }`)
    return {
        x: msToXValue((timestamp1 + timestamp2) / 2),
        y: (timestamp2 - timestamp1) / 1000 / 60
    };
}

const timestampToHumanReadable = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}`
}

const simulateWork = (timestamp: number) => {
    return workCycle.reduce<number[]>((acc, duration) => {
        const lastTime = acc.length > 0 ? acc[acc.length - 1] : timestamp;
        acc.push(addMinutes(lastTime, duration));
        return acc;
    }, [timestamp])
}

const now = getMsTimeNow();
const date = new Date(now);
const eightAm = new Date(date.setHours(8)).setMinutes(0);
const day = simulateWork(eightAm);

export const testBasicPlots = humanReadablePlots.map(humanReadableToGraphPlot)

const timestampsToPlots = (timestamps: number[]) => {
    if (!timestamps || timestamps.length < 2) return [];

    const plots: XYValue[] = []
    for (let i = 1; i < timestamps.length; i+=2) {
        const plot = createPlot(timestamps[i-1], timestamps[i]);
        plots.push(plot);
    }

    return plots
}

export const testPlots = timestampsToPlots(day);