import { Difficulty } from "./API/Difficulty"

export default class Theme {
    static difficultyToColor(difficulty: Difficulty): string {
        const map: {[key in Difficulty]: string} = {
            [Difficulty.Easy]: "#43978D",
            [Difficulty.Medium]: "#F0A719",
            [Difficulty.Hard]: "#E15B35",
        }

        return map[difficulty] ?? map[Difficulty.Easy]
    } 
}