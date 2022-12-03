export default function addToDate(date: Date, ms: number) {
    const copy = new Date(date)

    copy.setTime(copy.getTime()+ms)

    return copy
}