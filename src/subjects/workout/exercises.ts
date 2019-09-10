import { LocId } from "../../localization/localization";

export enum Exercise {
    Squats,
    LegPress,
    LegExtension,
    Lunge,

    RomanianDeadLift,
    LegCurl,

    PullDown,
    BentOverRow,
    CableRow,
    PullOver,

    HipThrust,
    CableKickback,
    ThighAdductor,
    ThighAbductor,

    InclineBenchPress,
    InclineBenchFlyes,
    BenchPress,
    BenchFlyes,

    MilitaryPress,
    FrontRaise,
    SideLateralRaise,
    UprightRow,
    RearDeltRaise,

    CloseGripBenchPress,
    BenchArmsExtension,
    StandArmsExtension,
    CableArmsExtension,

    StandArmsCurl,
    InclineArmsCurl,
    HammerCurls,
    PreacherCurl,
    ConcentrationCurl,

    Hyperextension,

    StandCalfRaise,
    SeatCalfRaise,

    ReverseCrunch,
    Crunch,
    CableCrunch,

    Cardio
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

export enum Complexity {
    Compound,
    Isolation
}

export interface ExerciseDescription {type: Complexity, muscle: Muscle, locIds: LocId[]}

export const EXERCISES: {[key in Exercise]: ExerciseDescription} = {
    [Exercise.Squats]: {type: Complexity.Compound, muscle: Muscle.Quads, locIds: [LocId.BarbellSquats, LocId.SmithSquats]},
    [Exercise.LegPress]: {type: Complexity.Compound, muscle: Muscle.Quads, locIds: [LocId.LegPress, LocId.OneLegPress]},
    [Exercise.LegExtension]: {type: Complexity.Isolation, muscle: Muscle.Quads, locIds: [LocId.LegExtension, LocId.OneLegExtension]},
    [Exercise.Lunge]: {type: Complexity.Compound, muscle: Muscle.Quads, locIds: [LocId.DumbbellLunge, LocId.SmithLunge]},

    [Exercise.RomanianDeadLift]: {type: Complexity.Compound, muscle: Muscle.Hamstrings, locIds: [LocId.BarbellRomanianDeadLift, LocId.DumbbellRomanianDeadLift]},
    [Exercise.LegCurl]: {type: Complexity.Isolation, muscle: Muscle.Hamstrings, locIds: [LocId.LyingLegCurl, LocId.SeatedLegCurl]},

    [Exercise.PullDown]: {type: Complexity.Compound, muscle: Muscle.Lats, locIds: [LocId.WideGripCablePullDown, LocId.CloseGripCablePullDown, LocId.PullUps]},
    [Exercise.BentOverRow]: {type: Complexity.Compound, muscle: Muscle.Trapezius, locIds: [LocId.BentOverBarbellRow, LocId.TBarRowRow]},
    [Exercise.CableRow]: {type: Complexity.Compound, muscle: Muscle.Trapezius, locIds: [LocId.CableRow, LocId.LeverageRow, LocId.OneArmLeverageRow, LocId.OneArmDumbbellRow]},
    [Exercise.PullOver]: {type: Complexity.Isolation, muscle: Muscle.Trapezius, locIds: [LocId.CablePullOver, LocId.DumbbellPullOver]},

    [Exercise.HipThrust]: {type: Complexity.Compound, muscle: Muscle.Glutes, locIds: [LocId.BarbellHipThrust, LocId.SmithHipThrust]},
    [Exercise.CableKickback]: {type: Complexity.Isolation, muscle: Muscle.Glutes, locIds: [LocId.CableKickback]},
    [Exercise.ThighAdductor]: {type: Complexity.Isolation, muscle: Muscle.Glutes, locIds: [LocId.PlieSquats, LocId.ThighAdductor]},
    [Exercise.ThighAbductor]: {type: Complexity.Isolation, muscle: Muscle.Glutes, locIds: [LocId.ThighAbductor]},

    [Exercise.InclineBenchPress]: {type: Complexity.Compound, muscle: Muscle.UpperChest, locIds: [LocId.BarbellInclineBenchPress, LocId.DumbbellInclineBenchPress, LocId.SmithInclineBenchPress]},
    [Exercise.InclineBenchFlyes]: {type: Complexity.Isolation, muscle: Muscle.UpperChest, locIds: [LocId.InclineDumbbellFlyes, LocId.InclineCableFlyes]},
    [Exercise.BenchPress]: {type: Complexity.Compound, muscle: Muscle.MiddleChest, locIds: [LocId.BarbellBenchPress, LocId.DumbbellBenchPress, LocId.SmithBenchPress, LocId.Dips]},
    [Exercise.BenchFlyes]: {type: Complexity.Isolation, muscle: Muscle.MiddleChest, locIds: [LocId.PekDek, LocId.DumbbellFlyes, LocId.CableFlyes, LocId.CableCrossover]},

    [Exercise.MilitaryPress]: {type: Complexity.Compound, muscle: Muscle.FrontDeltoid, locIds: []},
    [Exercise.FrontRaise]: {type: Complexity.Isolation, muscle: Muscle.FrontDeltoid, locIds: []},
    [Exercise.SideLateralRaise]: {type: Complexity.Isolation, muscle: Muscle.MiddleDeltoid, locIds: []},
    [Exercise.UprightRow]: {type: Complexity.Compound, muscle: Muscle.MiddleDeltoid, locIds: []},
    [Exercise.RearDeltRaise]: {type: Complexity.Isolation, muscle: Muscle.RearDeltoid, locIds: []},

    [Exercise.CloseGripBenchPress]: {type: Complexity.Compound, muscle: Muscle.Triceps, locIds: []},
    [Exercise.BenchArmsExtension]: {type: Complexity.Isolation, muscle: Muscle.Triceps, locIds: []},
    [Exercise.CableArmsExtension]: {type: Complexity.Isolation, muscle: Muscle.Triceps, locIds: []},
    [Exercise.StandArmsExtension]: {type: Complexity.Isolation, muscle: Muscle.Triceps, locIds: []},

    [Exercise.StandArmsCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: []},
    [Exercise.InclineArmsCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: []},
    [Exercise.HammerCurls]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: []},
    [Exercise.PreacherCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: []},
    [Exercise.ConcentrationCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: []},

    [Exercise.Hyperextension]: {type: Complexity.Isolation, muscle: Muscle.LowerBack, locIds: []},

    [Exercise.StandCalfRaise]: {type: Complexity.Isolation, muscle: Muscle.Calves, locIds: []},
    [Exercise.SeatCalfRaise]: {type: Complexity.Isolation, muscle: Muscle.Calves, locIds: []},

    [Exercise.ReverseCrunch]: {type: Complexity.Isolation, muscle: Muscle.Abs, locIds: []},
    [Exercise.Crunch]: {type: Complexity.Isolation, muscle: Muscle.Abs, locIds: []},
    [Exercise.CableCrunch]: {type: Complexity.Isolation, muscle: Muscle.Abs, locIds: []},

    [Exercise.Cardio]: {type: Complexity.Compound, muscle: Muscle.Cardio, locIds: []},
};