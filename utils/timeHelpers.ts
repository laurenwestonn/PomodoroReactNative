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
     })
}