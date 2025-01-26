import { addMinutes } from "./timeHelpers";

export const humanReadablePlots = [
    { x: '8:00', y: 25},
    { x: '9:15', y: 30},
    { x: '9:30', y: 20},
    { x: '10:15', y: 60},
    { x: '10:45', y: 50},
];

export const simulateWork = (timestamp: number) => {
    return [
        timestamp,
        addMinutes(timestamp, 20),
        addMinutes(timestamp, 45),
        addMinutes(timestamp, 75),
        addMinutes(timestamp, 90),
        addMinutes(timestamp, 150),
    ]
}