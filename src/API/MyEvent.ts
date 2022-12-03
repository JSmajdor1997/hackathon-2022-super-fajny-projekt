import DateRange from "../utils/DateRange"

export interface Tag {
    name: string
}

export enum Difficulty {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}

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