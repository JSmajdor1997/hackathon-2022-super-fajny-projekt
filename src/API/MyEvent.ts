import DateRange from "../utils/DateRange"
import { Difficulty } from "./Difficulty"
import Tag from "./Tag"

export default interface MyEvent {
    id: string
    dateRange: DateRange
    summary: string
    description: string
    location: string | null
    tag: Tag[]
    difficulty: Difficulty
    progress: number
    travelTimeMs: number
}