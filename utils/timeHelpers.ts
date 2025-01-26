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

const addMinutes = (timestamp: number, minutes: number) => {
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

const createPlot = (timestamp1: number, timestamp2: number) => {
    console.log(`From times ${timestampToHumanReadable(timestamp1)}, ${timestampToHumanReadable(timestamp2)}, created plot { x: ${msToXValue((timestamp1 + timestamp2) / 2)}, y: ${(timestamp2 - timestamp1) / 60000} }`)
    return {
        x: msToXValue((timestamp1 + timestamp2) / 2),
        y: (timestamp2 - timestamp1) / 1000 / 60
    };
}

const timestampToHumanReadable = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
}


const now = getMsTimeNow();
createPlot(now, addMinutes(now, 30));
