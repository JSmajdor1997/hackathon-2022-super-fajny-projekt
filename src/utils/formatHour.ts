export enum Side {
    Left,
    Right
}

export function normalizeLength(str: string, desiredLength: number, fillChar: string, side: Side): string {
    if(desiredLength == str.length) {
        return str
    }

    const nrOfCharsToAdd = desiredLength - str.length;
    const filling = new Array<string>(nrOfCharsToAdd).fill(fillChar).reduce((accu, val) => accu + val)

    return side == Side.Left ? filling + str : str + filling
}

export default function formatHour(date: Date): string {
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()

    return `${normalizeLength(hours, 2, "0", Side.Left)}:${normalizeLength(minutes, 2, "0", Side.Right)}`
}
