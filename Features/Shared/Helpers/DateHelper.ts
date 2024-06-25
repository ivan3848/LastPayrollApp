export function addHours(date: Date, hours: number): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate
}

export function createDateFromTime(time: string): Date {
    let [hours, minutes] = time.split(":").map(Number);
    const period = time.slice(-2).toUpperCase();

    if (period === 'PM' && hours !== 12)
        hours += 12;

    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    return date;
}