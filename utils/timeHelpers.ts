import { XYValue } from "react-native-responsive-linechart";
import { humanReadablePlots, workCycle as exampleWorkDurations } from "./testData";


// =============================
// TIME CONVERSION UTILITIES
// =============================

// For Graph X Axis
// Convert decimal time (e.g. 20.2916666) to human-readable format (e.g. "20:17:30")
export const valueToTime = (value: number): string => {
  const hours = Math.floor(value);

  const decimal = value % 1;
  const totalMinutes = decimal * 60;
  const minutes = Math.floor(totalMinutes);

  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${formattedMinutes}`;
}

// For timeline
// Convert decimal time (e.g. 20.516666) to human-readable format (e.g. "20m 30s")
export const valueToTimeLine = (value: number): string => {
  const minutes = Math.floor(value);

  const decimal = value % 1;
  const totalSeconds = decimal * 60;
  const seconds = Math.floor(totalSeconds);

  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}m ${formattedSeconds}s`;
}

// Convert minutes (e.g. 15.725) to human-readable format (e.g. "15m 43s")
// To display in the y axis. Receives minutes from plot y values.
export const valueToTimeLength = (value: number): string => {
  const minutes = Math.floor(value);
  const decimal = value % 1;
  const seconds = Math.floor(decimal * 60);

  if (minutes === 0) {
    if (seconds === 0) {
      return '0'
    }
    return `${seconds}s`
  }
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`
  }
  return `${minutes}m ${seconds}s`
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
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

// Convert timestamp to human-readable time
// (e.g. 1737887405000 -> "10:30")
export const timestampToHumanReadable = (timestamp: number): string => {
  if (!timestamp || isNaN(timestamp)) {
    console.log('Invalid timestamp received:', timestamp);
    return 'Invalid time';
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    console.log('Date creation failed for timestamp:', timestamp);
    return 'Invalid date';
  }

  const hours = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// =============================
// DATE & TIME MANIPULATION
// =============================

export const getTimeNowInMillis = (h:number = 0) => {
  return Date.now() + (h * 60 * 60 * 100)
};

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
    y: ((timestamp2 - timestamp1) / 1000 / 60)
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

export const timestampsToPlots = (timestamps: number[]): XYValue[] => {
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
console.log('AnExampleDaytimestamps:', anExampleDaysTimestamps)

export const testBasicPlots = humanReadablePlots.map(humanReadableToGraphPlot);
export const testPlots = timestampsToPlots(anExampleDaysTimestamps);