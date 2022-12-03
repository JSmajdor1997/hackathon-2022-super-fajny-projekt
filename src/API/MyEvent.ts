import DateRange from "../utils/DateRange"
import { Difficulty } from "./Difficulty"

export default interface MyEvent {
    id: string
    dateRange: DateRange
    summary: string
    description: string
    location: string | null
    tag: string[]
    difficulty: Difficulty
    progress: number
    travelTimeMs: number
}

export interface MyCustomEvent {
    id: string
    name: string 
    taskprogress: number
    difficulty: Difficulty
    tag: string[]
    dateRange: DateRange
}

export function isMyCustomEvent(item: MyEvent | MyCustomEvent): item is MyCustomEvent {
    return (item as MyEvent).travelTimeMs == undefined;
}