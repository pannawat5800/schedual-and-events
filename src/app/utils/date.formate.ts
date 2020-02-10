export function dateMidnight(time: number | Date): Date {
    const date = new Date(time);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}