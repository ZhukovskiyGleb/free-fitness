import { LocId } from "../../localization/localization";

export enum Exercise {
    Squats,
    LegPress,
    LegExtension,

    RomanianDeadLift,
    LegCurl,

    PullDown,
    BentOverRow,
    SeatedRow,
    OneArmSeatedRow,
    PullOver,

    HipThrust,
    CableKickback,
    Lunge,
    Thighs,

    InclineBenchPress,
    InclineBenchFlyes,
    BenchPress,
    BenchFlyes,

    MilitaryPress,
    FrontRaise,
    UprightRow,
    SideLateralRaise,
    RearDeltRaise,

    CloseGripBenchPress,
    BenchArmsExtension,
    CableArmsExtension,

    StandArmsCurl,
    InclineArmsCurl,
    HammerCurls,

    Hyperextension,

    StandCalfRaise,
    SeatedCalfRaise,

    ReverseCrunch,
    Crunch,

    // Cardio
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
    // Cardio
}

export enum Complexity {
    Compound,
    Isolation
}

export interface ExerciseDescription {type: Complexity, muscle: Muscle, locIds: LocId[]}

export const EXERCISES: {[key in Exercise]: ExerciseDescription} = {
    //Legs
    [Exercise.Squats]: {type: Complexity.Compound, muscle: Muscle.Quads, locIds: [LocId.BarbellSquats, LocId.SmithSquats]},
    [Exercise.LegPress]: {type: Complexity.Compound, muscle: Muscle.Quads, locIds: [LocId.LegPress, LocId.OneLegPress]},
    [Exercise.LegExtension]: {type: Complexity.Isolation, muscle: Muscle.Quads, locIds: [LocId.LegExtension, LocId.OneLegExtension]},

    [Exercise.LegCurl]: {type: Complexity.Isolation, muscle: Muscle.Hamstrings, locIds: [LocId.LyingLegCurl, LocId.SeatedLegCurl]},
    [Exercise.RomanianDeadLift]: {type: Complexity.Compound, muscle: Muscle.Hamstrings, locIds: [LocId.BarbellRomanianDeadLift, LocId.DumbbellRomanianDeadLift]},

    [Exercise.StandCalfRaise]: {type: Complexity.Isolation, muscle: Muscle.Calves, locIds: [LocId.StandCalfRaise]},
    [Exercise.SeatedCalfRaise]: {type: Complexity.Isolation, muscle: Muscle.Calves, locIds: [LocId.SeatedCalfRaise]},
    //Back
    [Exercise.PullDown]: {type: Complexity.Compound, muscle: Muscle.Lats, locIds: [LocId.WideGripCablePullDown, LocId.CloseGripCablePullDown, LocId.PullUps]},
    [Exercise.BentOverRow]: {type: Complexity.Compound, muscle: Muscle.Trapezius, locIds: [LocId.BentOverBarbellRow, LocId.TBarRowRow]},
    [Exercise.SeatedRow]: {type: Complexity.Compound, muscle: Muscle.Trapezius, locIds: [LocId.CableRow, LocId.LeverageRow]},
    [Exercise.PullOver]: {type: Complexity.Isolation, muscle: Muscle.Trapezius, locIds: [LocId.CablePullOver, LocId.DumbbellPullOver]},
    [Exercise.OneArmSeatedRow]: {type: Complexity.Compound, muscle: Muscle.Trapezius, locIds: [LocId.OneArmDumbbellRow, LocId.OneArmLeverageRow]},

    [Exercise.Hyperextension]: {type: Complexity.Isolation, muscle: Muscle.LowerBack, locIds: [LocId.Hyperextension]},
    //Glutes
    [Exercise.HipThrust]: {type: Complexity.Compound, muscle: Muscle.Glutes, locIds: [LocId.BarbellHipThrust, LocId.SmithHipThrust]},
    [Exercise.CableKickback]: {type: Complexity.Isolation, muscle: Muscle.Glutes, locIds: [LocId.CableKickback, LocId.SideCableLift]},
    [Exercise.Lunge]: {type: Complexity.Compound, muscle: Muscle.Glutes, locIds: [LocId.DumbbellLunge, LocId.SmithLunge, LocId.PlieSquats]},
    [Exercise.Thighs]: {type: Complexity.Isolation, muscle: Muscle.Glutes, locIds: [LocId.ThighAdductor, LocId.ThighAbductor]},
    //Chest
    [Exercise.InclineBenchPress]: {type: Complexity.Compound, muscle: Muscle.UpperChest, locIds: [LocId.BarbellInclineBenchPress, LocId.DumbbellInclineBenchPress, LocId.SmithInclineBenchPress]},
    [Exercise.InclineBenchFlyes]: {type: Complexity.Isolation, muscle: Muscle.UpperChest, locIds: [LocId.InclineDumbbellFlyes, LocId.InclineCableFlyes]},
    [Exercise.BenchPress]: {type: Complexity.Compound, muscle: Muscle.MiddleChest, locIds: [LocId.BarbellBenchPress, LocId.DumbbellBenchPress, LocId.SmithBenchPress, LocId.Dips]},
    [Exercise.BenchFlyes]: {type: Complexity.Isolation, muscle: Muscle.MiddleChest, locIds: [LocId.PekDek, LocId.DumbbellFlyes, LocId.CableFlyes, LocId.CableCrossover]},
    //Delts
    [Exercise.SideLateralRaise]: {type: Complexity.Isolation, muscle: Muscle.MiddleDeltoid, locIds: [LocId.DumbbellSideLateralRaise, LocId.OneArmDumbbellSideLateralRaise, LocId.CableSideLateralRaise, LocId.OneArmCableSideLateralRaise]},
    [Exercise.MilitaryPress]: {type: Complexity.Compound, muscle: Muscle.FrontDeltoid, locIds: [LocId.StandBarbellMilitaryPress, LocId.SeatedBarbellMilitaryPress, LocId.SmithMilitaryPress, LocId.SeatedDumbbellPress]},
    [Exercise.UprightRow]: {type: Complexity.Compound, muscle: Muscle.MiddleDeltoid, locIds: [LocId.BarbellUprightRow, LocId.SmithUprightRow]},
    [Exercise.FrontRaise]: {type: Complexity.Isolation, muscle: Muscle.FrontDeltoid, locIds: [LocId.DumbbellFrontRaise, LocId.CableFrontRaise]},
    [Exercise.RearDeltRaise]: {type: Complexity.Isolation, muscle: Muscle.RearDeltoid, locIds: [LocId.BentOverDumbbellRearDeltRaise, LocId.ReversePekDek, LocId.CableRearDeltRaise]},
    //Arms
    [Exercise.BenchArmsExtension]: {type: Complexity.Isolation, muscle: Muscle.Triceps, locIds: [LocId.BarbellBenchArmExtension, LocId.DumbbellBenchArmExtension, LocId.BarbellSeatedArmExtension, LocId.DumbbellSeatedArmExtension, LocId.OneArmDumbbellStandArmExtension]},
    [Exercise.CableArmsExtension]: {type: Complexity.Isolation, muscle: Muscle.Triceps, locIds: [LocId.CableArmExtension, LocId.RopeArmExtension]},
    [Exercise.CloseGripBenchPress]: {type: Complexity.Compound, muscle: Muscle.Triceps, locIds: [LocId.BarbellCloseGripBenchPress, LocId.SmithCloseGripBenchPress]},

    [Exercise.StandArmsCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: [LocId.WideGripBarbellStandArmsCurl, LocId.CloseGripBarbellStandArmsCurl, LocId.DumbbellStandArmsCurl]},
    [Exercise.InclineArmsCurl]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: [LocId.DumbbellBenchArmsCurl, LocId.BarbellPreacherCurl, LocId.OneArmDumbbellPreacherCurl]},
    [Exercise.HammerCurls]: {type: Complexity.Isolation, muscle: Muscle.Biceps, locIds: [LocId.HammerCurl, LocId.CableStandArmsCurl, LocId.CrossoverArmsCurl, LocId.ConcentrationCurl]},
    //Abs
    [Exercise.ReverseCrunch]: {type: Complexity.Isolation, muscle: Muscle.Abs, locIds: [LocId.LyingReverseCrunch, LocId.LyingReverseCrunch]},
    [Exercise.Crunch]: {type: Complexity.Isolation, muscle: Muscle.Abs, locIds: [LocId.Crunch, LocId.CableCrunch]},

    // [Exercise.Cardio]: {type: Complexity.Compound, muscle: Muscle.Cardio, locIds: [LocId.Walking, LocId.Bicycle, LocId.Orbitrek]},
};