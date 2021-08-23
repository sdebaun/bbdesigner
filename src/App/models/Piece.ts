import { costOfSkill, Skill } from "./Skill";
import { Position } from "./Position";

export type Piece = {
    title: string,
    positional: Position,
    addedSkills: Skill[],
    count: number,
}

export const pieceCost: (piece: Piece) => number =
    piece =>
        piece.positional.cost + piece.addedSkills.reduce((a, skill) => a + costOfSkill(piece.positional.double)(skill), 0)

