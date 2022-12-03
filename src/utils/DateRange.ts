export default class DateRange {
    constructor(public readonly from: Date, public readonly to: Date) {}

    getSpan() {
        return this.to.getTime() - this.from.getTime()
    }
}