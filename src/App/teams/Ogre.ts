import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Ogre'

const prepend = prependPositionTitle(title)

export const OgreGnoblar: Position = prepend({
    title: 'Gnoblar',
    ma: 5, st: 1, ag: 3, av: 5,
    startingSkills: ['Dodge', 'Right Stuff', 'Side Step', 'Stunty', 'Titchy'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 20,
    max: 16,
})

export const OgreOgre: Position = prepend({
    title: 'Ogre',
    ma: 5, st: 5, ag: 2, av: 9,
    startingSkills: ['Bone-Head', 'Mighty Blow', 'Thick Skull', 'Throw Team-Mate'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 140,
    max: 5,
})

export const Ogre: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        OgreGnoblar,
        OgreOgre,
    ]
}