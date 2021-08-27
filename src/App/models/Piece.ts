import { costOfSkill, Skill } from "./Skill";
import { Position } from "./Position";
import { WithStats } from "./Stat";

export type Piece = {
    title: string,
    positional: Position,
    addedSkills: Skill[],
    count: number,
    increase: WithStats,
}

export const pieceCost: (piece: Piece) => number =
    piece =>
        piece.positional.cost +
            piece.addedSkills.reduce((a, skill) => a + costOfSkill(piece.positional.double)(skill), 0)
            // + piece.increase cost

