import { Difficulty } from "./Difficulty"

export default interface MyToDo {
    name: string
    tags: string[]
    taskProgress: number
    difficulty: Difficulty
}