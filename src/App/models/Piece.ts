import { costOfSkill, Skill } from "./Skill";
import { Positional } from "./teams";

export type Piece = {
    title: string,
    positional: Positional,
    addedSkills: Skill[],
    count: number,
}

export const pieceCost: (piece: Piece) => number =
    piece =>
        piece.positional.cost + piece.addedSkills.reduce((a, skill) => a + costOfSkill(piece.positional.double)(skill), 0)

