import {LocId} from "../../localization/localization";

export enum Exercise {
    Salmon,
}

export enum Muscle {
    Quads,
    Hamstrings,
    Lats,
    Trapezius,
    Glutes,
    UpperChest,
    MiddleChest,
    FrontDeltoid,
    MiddleDeltoid,
    RearDeltoid,
    Triceps,
    Biceps,
    LowerBack,
    Calves,
    Abs,
    Cardio
}

export enum ExerciseType {
    Complex,
    Isolation
}

export interface ExerciseDescription {type: ExerciseType, locId: LocId}

export const EXERCISES: {[key in Exercise]: ExerciseDescription} = {

};