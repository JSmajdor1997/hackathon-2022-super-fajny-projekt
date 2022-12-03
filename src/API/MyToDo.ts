import { Difficulty } from "./Difficulty"
import Tag from "./Tag"

export default interface MyToDo {
    name: string
    tags: Tag[]
    progress: number
    difficulty: Difficulty
}