import { Experience } from "../../user/user";
import { Muscle } from "./exercises";

export enum WorkoutTarget {
    Gain = 'gain',
    Strength = 'strength',
    Support = 'support',
    Complex = 'complex',
    Loss = 'loss',
    Pump = 'pump'
}

export enum Formation {
    Variety,
    Monotony
}

export enum WorkoutsAmount {
    Two = 'two',
    Three= 'three',
    Four = 'four',
    Five = 'five'
}

export enum MuscleGroup {
    Legs = 'legs',
    Back = 'back',
    Chest = 'chest',
    Delts = 'delts',
    Arms = 'arms',
    Abs = 'abs',
}

type ComplexGroup = MuscleGroup | Muscle;

export interface Split {
    [key: number]: (MuscleGroup | Muscle)[];
}

export class WorkoutUtils {

    private static readonly EXPERIENCE_TO_TARGETS: {[key in Experience]: WorkoutTarget[]} = {
        [Experience.Junior]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support],
        [Experience.Middle]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support, WorkoutTarget.Strength, WorkoutTarget.Complex],
        [Experience.Senior]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support, WorkoutTarget.Strength, WorkoutTarget.Complex, WorkoutTarget.Pump],
    };

    private static readonly MUSCLE_GROUP_TO_MUSCLES: {[key in MuscleGroup]: Muscle[]} = {
        [MuscleGroup.Legs]: [Muscle.Quads, Muscle.Hamstrings, Muscle.Glutes, Muscle.OuterCalves, Muscle.InnerCalves],
        [MuscleGroup.Back]: [Muscle.Lats, Muscle.Trapezius, Muscle.LowerBack],
        [MuscleGroup.Chest]: [Muscle.MiddleChest, Muscle.UpperChest],
        [MuscleGroup.Delts]: [Muscle.FrontDelt, Muscle.MiddleDelt, Muscle.RearDelt],
        [MuscleGroup.Arms]: [Muscle.Triceps, Muscle.Biceps],
        [MuscleGroup.Abs]: [Muscle.UpperAbs, Muscle.LowerAbs],
    };

    private static readonly WORKOUT_SPLITS: {[key in WorkoutsAmount]: Split} = {
        [WorkoutsAmount.Two]: [Muscle.Quads, Muscle.Hamstrings],
        [WorkoutsAmount.Three]: [],
        [WorkoutsAmount.Four]: [],
        [WorkoutsAmount.Five]: [],
    };

    public static getAvailableTargetsByExperience(experience: Experience): WorkoutTarget[] {
       return this.EXPERIENCE_TO_TARGETS[experience];
    }

    public static getMusclesByMuscleGroup(group: MuscleGroup): Muscle[] {
        return this.MUSCLE_GROUP_TO_MUSCLES[group];
    }

}