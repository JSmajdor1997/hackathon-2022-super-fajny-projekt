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