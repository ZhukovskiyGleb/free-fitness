import { Experience, Gender } from "../../user/user";
import { Muscle } from "./exercises";

export const enum WorkoutTarget {
    Gain = 'gain',
    Strength = 'strength',
    Support = 'support',
    Complex = 'complex',
    Loss = 'loss',
    Pump = 'pump'
}

export const enum Formation {
    Variety,
    Monotony
}

export const enum WorkoutsAmount {
    Two = 'two',
    Three= 'three',
    Four = 'four',
    Five = 'five'
}

export const enum MuscleGroup {
    Legs = 'legs',
    Glutes = 'glutes',
    Back = 'back',
    Chest = 'chest',
    Delts = 'delts',
    Arms = 'arms',
    Abs = 'abs',
}

interface MuscleCondition {
    gender: Gender,
    muscle: MuscleGroup | Muscle
}

export interface Split {
    [key: number]: (MuscleGroup | Muscle | MuscleCondition)[];
}

export class WorkoutUtils {

    private static readonly EXPERIENCE_TO_TARGETS: {[key in Experience]: WorkoutTarget[]} = {
        [Experience.Junior]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support],
        [Experience.Middle]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support, WorkoutTarget.Strength, WorkoutTarget.Complex],
        [Experience.Senior]: [WorkoutTarget.Gain, WorkoutTarget.Loss, WorkoutTarget.Support, WorkoutTarget.Strength, WorkoutTarget.Complex, WorkoutTarget.Pump],
    };

    private static readonly MUSCLE_GROUP_TO_MUSCLES: {[key in MuscleGroup]: Muscle[]} = {
        [MuscleGroup.Legs]: [Muscle.Quads, Muscle.Hamstrings, Muscle.OuterCalves, Muscle.InnerCalves],
        [MuscleGroup.Glutes]: [Muscle.Glutes, Muscle.Thigs],
        [MuscleGroup.Back]: [Muscle.Lats, Muscle.Trapezius, Muscle.LowerBack],
        [MuscleGroup.Chest]: [Muscle.MiddleChest, Muscle.UpperChest],
        [MuscleGroup.Delts]: [Muscle.FrontDelt, Muscle.MiddleDelt, Muscle.RearDelt],
        [MuscleGroup.Arms]: [Muscle.Triceps, Muscle.Biceps],
        [MuscleGroup.Abs]: [Muscle.UpperAbs, Muscle.LowerAbs],
    };

    private static readonly WORKOUT_SPLITS: {[key in WorkoutsAmount]: Split} = {
        [WorkoutsAmount.Two]: [
            [Muscle.Quads, Muscle.Hamstrings, Muscle.FrontDelt, Muscle.MiddleDelt],
            [Muscle.Lats, Muscle.Trapezius, Muscle.UpperAbs, {gender: Gender.Male, muscle: Muscle.MiddleChest}, {gender: Gender.Female, muscle: Muscle.Glutes}],
        ],
        [WorkoutsAmount.Three]: [
            [Muscle.Quads, Muscle.Hamstrings, Muscle.FrontDelt, Muscle.MiddleDelt],
            [MuscleGroup.Back, Muscle.UpperAbs, Muscle.Biceps],
            [Muscle.Triceps, Muscle.UpperAbs, {gender: Gender.Male, muscle: MuscleGroup.Chest}, {gender: Gender.Female, muscle: Muscle.Glutes}],
        ],
        [WorkoutsAmount.Four]: [
            [Muscle.Quads, Muscle.Hamstrings, Muscle.OuterCalves],
            [MuscleGroup.Abs, {gender: Gender.Male, muscle: MuscleGroup.Chest}, {gender: Gender.Female, muscle: MuscleGroup.Glutes}],
            [MuscleGroup.Back, Muscle.Biceps],
            [MuscleGroup.Delts, Muscle.Triceps],
        ],
        [WorkoutsAmount.Five]: [
            [Muscle.Quads, Muscle.Hamstrings, Muscle.OuterCalves],
            [MuscleGroup.Abs, {gender: Gender.Male, muscle: MuscleGroup.Chest}, {gender: Gender.Female, muscle: MuscleGroup.Glutes}],
            [MuscleGroup.Back],
            [MuscleGroup.Delts, Muscle.InnerCalves],
            [MuscleGroup.Arms],
        ],
    };

    public static getAvailableTargetsByExperience(experience: Experience): WorkoutTarget[] {
       return this.EXPERIENCE_TO_TARGETS[experience];
    }

    public static getMusclesByMuscleGroup(group: MuscleGroup): Muscle[] {
        return this.MUSCLE_GROUP_TO_MUSCLES[group];
    }

}