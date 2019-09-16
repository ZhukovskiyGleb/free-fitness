import { LocId } from "../../localization/localization";

export const enum Exercise {
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
    ConcentrationCurls,

    Hyperextension,

    StandCalfRaise,
    SeatedCalfRaise,

    ReverseCrunch,
    Crunch,

    // Cardio
}

export const enum Muscle {
    Quads = 'quads',
    Hamstrings = 'hamstrings',
    Lats = 'lats',
    Trapezius = 'trapezius',
    Glutes = 'glutes',
    Thigs = 'thigs',
    MiddleChest = 'middleChest',
    UpperChest = 'upperChest',
    FrontDelt = 'frontDelt',
    MiddleDelt = 'middleDelt',
    RearDelt = 'rearDelt',
    Triceps = 'triceps',
    Biceps = 'biceps',
    LowerBack = 'lowerBack',
    OuterCalves = 'outerCalves',
    InnerCalves = 'innerCalves',
    UpperAbs = 'upperAbs',
    LowerAbs = 'lowerAbs',
    // Cardio
}

export const enum Complexity {
    Compound,
    Isolation
}

export interface ExerciseDescription {type: Complexity, locIds: LocId[], priority: number}

export const EXERCISES: {[key in Exercise]: ExerciseDescription} = {
    //Legs
    [Exercise.Squats]: {type: Complexity.Compound, locIds: [LocId.BarbellSquats, LocId.SmithSquats], priority: 1},
    [Exercise.LegPress]: {type: Complexity.Compound, locIds: [LocId.LegPress, LocId.OneLegPress], priority: 2},
    [Exercise.LegExtension]: {type: Complexity.Isolation, locIds: [LocId.LegExtension, LocId.OneLegExtension], priority: 3},

    [Exercise.LegCurl]: {type: Complexity.Isolation, locIds: [LocId.LyingLegCurl, LocId.SeatedLegCurl], priority: 1},
    [Exercise.RomanianDeadLift]: {type: Complexity.Compound, locIds: [LocId.BarbellRomanianDeadLift, LocId.DumbbellRomanianDeadLift], priority: 2},

    [Exercise.StandCalfRaise]: {type: Complexity.Isolation, locIds: [LocId.StandCalfRaise], priority: 3},
    [Exercise.SeatedCalfRaise]: {type: Complexity.Isolation, locIds: [LocId.SeatedCalfRaise], priority: 3},
    //Back
    [Exercise.PullDown]: {type: Complexity.Compound, locIds: [LocId.WideGripCablePullDown, LocId.CloseGripCablePullDown, LocId.PullUps], priority: 1},
    [Exercise.BentOverRow]: {type: Complexity.Compound, locIds: [LocId.BentOverBarbellRow, LocId.TBarRowRow], priority: 2},
    [Exercise.SeatedRow]: {type: Complexity.Compound, locIds: [LocId.CableRow, LocId.LeverageRow], priority: 3},
    [Exercise.PullOver]: {type: Complexity.Isolation, locIds: [LocId.CablePullOver, LocId.DumbbellPullOver], priority: 3},
    [Exercise.OneArmSeatedRow]: {type: Complexity.Compound, locIds: [LocId.OneArmDumbbellRow, LocId.OneArmLeverageRow], priority: 3},

    [Exercise.Hyperextension]: {type: Complexity.Isolation, locIds: [LocId.Hyperextension], priority: 2},
    //Glutes
    [Exercise.Lunge]: {type: Complexity.Compound, locIds: [LocId.DumbbellLunge, LocId.SmithLunge, LocId.PlieSquats], priority: 1},
    [Exercise.CableKickback]: {type: Complexity.Isolation, locIds: [LocId.CableKickback, LocId.SideCableLift], priority: 1},
    [Exercise.HipThrust]: {type: Complexity.Compound, locIds: [LocId.BarbellHipThrust, LocId.SmithHipThrust], priority: 3},
    [Exercise.Thighs]: {type: Complexity.Isolation, locIds: [LocId.ThighAdductor, LocId.ThighAbductor], priority: 3},
    //Chest
    [Exercise.BenchPress]: {type: Complexity.Compound, locIds: [LocId.BarbellBenchPress, LocId.DumbbellBenchPress, LocId.SmithBenchPress, LocId.Dips], priority: 1},
    [Exercise.InclineBenchFlyes]: {type: Complexity.Isolation, locIds: [LocId.InclineDumbbellFlyes, LocId.InclineCableFlyes], priority: 2},
    [Exercise.InclineBenchPress]: {type: Complexity.Compound, locIds: [LocId.BarbellInclineBenchPress, LocId.DumbbellInclineBenchPress, LocId.SmithInclineBenchPress], priority: 2},
    [Exercise.BenchFlyes]: {type: Complexity.Isolation, locIds: [LocId.PekDek, LocId.DumbbellFlyes, LocId.CableFlyes, LocId.CableCrossover], priority: 3},
    //Delts
    [Exercise.SideLateralRaise]: {type: Complexity.Isolation, locIds: [LocId.DumbbellSideLateralRaise, LocId.OneArmDumbbellSideLateralRaise, LocId.CableSideLateralRaise, LocId.OneArmCableSideLateralRaise], priority: 1},
    [Exercise.MilitaryPress]: {type: Complexity.Compound, locIds: [LocId.StandBarbellMilitaryPress, LocId.SeatedBarbellMilitaryPress, LocId.SmithMilitaryPress, LocId.SeatedDumbbellPress], priority: 1},
    [Exercise.UprightRow]: {type: Complexity.Compound, locIds: [LocId.BarbellUprightRow, LocId.SmithUprightRow], priority: 2},
    [Exercise.RearDeltRaise]: {type: Complexity.Isolation, locIds: [LocId.BentOverDumbbellRearDeltRaise, LocId.ReversePekDek, LocId.CableRearDeltRaise], priority: 2},
    [Exercise.FrontRaise]: {type: Complexity.Isolation, locIds: [LocId.DumbbellFrontRaise, LocId.CableFrontRaise], priority: 3},
    //Arms
    [Exercise.BenchArmsExtension]: {type: Complexity.Isolation, locIds: [LocId.BarbellBenchArmExtension, LocId.DumbbellBenchArmExtension, LocId.BarbellSeatedArmExtension, LocId.DumbbellSeatedArmExtension, LocId.OneArmDumbbellStandArmExtension], priority: 1},
    [Exercise.CableArmsExtension]: {type: Complexity.Isolation, locIds: [LocId.CableArmExtension, LocId.RopeArmExtension], priority: 2},
    [Exercise.CloseGripBenchPress]: {type: Complexity.Compound, locIds: [LocId.BarbellCloseGripBenchPress, LocId.SmithCloseGripBenchPress], priority: 3},

    [Exercise.StandArmsCurl]: {type: Complexity.Isolation, locIds: [LocId.WideGripBarbellStandArmsCurl, LocId.CloseGripBarbellStandArmsCurl, LocId.DumbbellStandArmsCurl], priority: 1},
    [Exercise.InclineArmsCurl]: {type: Complexity.Isolation, locIds: [LocId.DumbbellBenchArmsCurl, LocId.BarbellPreacherCurl, LocId.OneArmDumbbellPreacherCurl], priority: 2},
    [Exercise.ConcentrationCurls]: {type: Complexity.Isolation, locIds: [LocId.HammerCurl, LocId.CableStandArmsCurl, LocId.CrossoverArmsCurl, LocId.ConcentrationCurl], priority: 3},
    //Abs
    [Exercise.ReverseCrunch]: {type: Complexity.Isolation, locIds: [LocId.LyingReverseCrunch, LocId.LyingReverseCrunch], priority: 1},
    [Exercise.Crunch]: {type: Complexity.Isolation, locIds: [LocId.Crunch, LocId.CableCrunch], priority: 3},

    // [Exercise.Cardio]: {type: Complexity.Compound, muscle: Muscle.Cardio, locIds: [LocId.Walking, LocId.Bicycle, LocId.Orbitrek]},
};

const MUSCLE_EXERCISES: {[key in Muscle]: Exercise[]} = {
    [Muscle.Quads]: [Exercise.Squats, Exercise.LegPress, Exercise.LegExtension],
    [Muscle.Hamstrings]: [Exercise.LegCurl, Exercise.RomanianDeadLift],
    [Muscle.Lats]: [Exercise.PullDown],
    [Muscle.Trapezius]: [Exercise.BentOverRow, Exercise.SeatedRow, Exercise.PullOver, Exercise.OneArmSeatedRow],
    [Muscle.Glutes]: [Exercise.Lunge, Exercise.CableKickback, Exercise.HipThrust],
    [Muscle.Thigs]: [Exercise.Thighs],
    [Muscle.MiddleChest]: [Exercise.BenchPress, Exercise.BenchFlyes],
    [Muscle.UpperChest]: [Exercise.InclineBenchFlyes, Exercise.InclineBenchPress],
    [Muscle.MiddleDelt]: [Exercise.SideLateralRaise, Exercise.UprightRow],
    [Muscle.FrontDelt]: [Exercise.MilitaryPress, Exercise.FrontRaise],
    [Muscle.RearDelt]: [Exercise.RearDeltRaise],
    [Muscle.Triceps]: [Exercise.BenchArmsExtension, Exercise.CableArmsExtension, Exercise.CloseGripBenchPress],
    [Muscle.Biceps]: [Exercise.StandArmsCurl, Exercise.InclineArmsCurl, Exercise.ConcentrationCurls],
    [Muscle.LowerBack]: [Exercise.Hyperextension],
    [Muscle.OuterCalves]: [Exercise.StandCalfRaise],
    [Muscle.InnerCalves]: [Exercise.SeatedCalfRaise],
    [Muscle.UpperAbs]: [Exercise.Crunch],
    [Muscle.LowerAbs]: [Exercise.ReverseCrunch],
};