import DateRange from "../utils/Range";

export interface Event {
    dateRange: DateRange
}

export default class API {
    getEvents(date: Date): Promise<Event[]> {
        throw "ToDo"
    }
}