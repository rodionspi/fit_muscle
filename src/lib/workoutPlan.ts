import type { EquipmentTag, Muscle } from "@/types/Muscle";

/*
 * Rules that turn the Beginner Guide answers into a weekly plan.
 *
 * Every table is keyed by the exact option text the form shows, and the form reads
 * its <select> options from these keys (planOptions below) - so adding a row is all
 * it takes to offer a new option, and an option can never exist without a rule.
 */

type GoalRule = {
  aim: string; // finishes "aimed at ..." in the summary
  sets: number;
  reps: string;
  restSeconds: number;
  tip: string;
};

const GOALS = {
  "Build muscle": {
    aim: "building muscle",
    sets: 3,
    reps: "8-12",
    restSeconds: 90,
    tip: "Once you reach the top of the rep range on every set, add weight next session.",
  },
  "Lose fat": {
    aim: "losing fat",
    sets: 3,
    reps: "12-15",
    restSeconds: 45,
    tip: "Training keeps your muscle while a small calorie deficit and daily walks take care of the fat.",
  },
  "Get stronger": {
    aim: "getting stronger",
    sets: 4,
    reps: "5-8",
    restSeconds: 150,
    tip: "Add a little weight every session for as long as your form stays clean.",
  },
  "General fitness": {
    aim: "general fitness",
    sets: 3,
    reps: "10-12",
    restSeconds: 60,
    tip: "Showing up every week matters more than any single hard session.",
  },
} satisfies Record<string, GoalRule>;

type ExperienceRule = {
  maxDifficulty: number; // highest Exercise.diff allowed, see DIFFICULTY
  setsDelta: number; // added to the goal's sets
  tip: string;
};

const DIFFICULTY: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };

const EXPERIENCE = {
  "I have never trained": {
    maxDifficulty: 1,
    setsDelta: -1,
    tip: "For the first two weeks, use weights you could lift three more times - you are learning the movements, not testing them.",
  },
  "Less than 6 months": {
    maxDifficulty: 1,
    setsDelta: 0,
    tip: "Keep these exercises for 6-8 weeks before changing anything, so you can see your numbers go up.",
  },
  "6 to 12 months": { maxDifficulty: 2, setsDelta: 0, tip: "" },
  "More than a year": { maxDifficulty: 3, setsDelta: 0, tip: "" },
} satisfies Record<string, ExperienceRule>;

// Muscle ids from muscles.json - named so the day templates below stay readable
const MUSCLE_IDS = {
  traps: 1,
  shoulders: 2,
  back: 3,
  triceps: 4,
  glutes: 5,
  hamstrings: 6,
  calves: 7,
  chest: 8,
  biceps: 9,
  abs: 10,
  grip: 11,
  quads: 12,
} as const;

type MuscleKey = keyof typeof MUSCLE_IDS;

/** One training day. Muscles are in priority order: short sessions drop the ones at the end. */
type DayTemplate = { focus: string; muscles: MuscleKey[] };

const FULL_BODY_A: DayTemplate = {
  focus: "Full body",
  muscles: ["quads", "chest", "back", "hamstrings", "shoulders", "abs", "biceps", "calves"],
};
const FULL_BODY_B: DayTemplate = {
  focus: "Full body",
  muscles: ["glutes", "back", "chest", "hamstrings", "shoulders", "triceps", "abs", "traps"],
};
const UPPER: DayTemplate = {
  focus: "Upper body",
  muscles: ["chest", "back", "shoulders", "biceps", "triceps", "traps", "abs", "grip"],
};
const LOWER: DayTemplate = { focus: "Lower body", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] };
const PUSH: DayTemplate = { focus: "Push", muscles: ["chest", "shoulders", "triceps", "abs"] };
const PULL: DayTemplate = { focus: "Pull", muscles: ["back", "biceps", "traps", "grip"] };
const LEGS: DayTemplate = { ...LOWER, focus: "Legs" };

type Split = { name: string; days: DayTemplate[]; note?: string };

const SPLITS = {
  "2 days": { name: "full body", days: [FULL_BODY_A, FULL_BODY_B] },
  "3 days": { name: "full body", days: [FULL_BODY_A, FULL_BODY_B, FULL_BODY_A] },
  "4 days": { name: "upper/lower", days: [UPPER, LOWER, UPPER, LOWER] },
  "5 or more days": {
    name: "upper/lower + push/pull/legs",
    days: [UPPER, LOWER, PUSH, PULL, LEGS],
    note: "The plan stops at 5 days - at this stage you grow while you recover, not while you train.",
  },
} satisfies Record<string, Split>;

const SESSION_MINUTES = {
  "30 minutes": 30,
  "45 minutes": 45,
  "60 minutes": 60,
  "90 minutes": 90,
} satisfies Record<string, number>;

const EQUIPMENT = {
  "Full gym": ["barbell", "dumbbell", "cable", "machine", "bar", "bodyweight", "band", "wheel"],
  "Home gym with dumbbells": ["dumbbell", "bodyweight"],
  "Resistance bands only": ["band", "bodyweight"],
  "Bodyweight only": ["bodyweight"],
} satisfies Record<string, EquipmentTag[]>;

export type BeginnerAnswers = {
  goal: keyof typeof GOALS;
  experience: keyof typeof EXPERIENCE;
  daysPerWeek: keyof typeof SPLITS;
  sessionLength: keyof typeof SESSION_MINUTES;
  equipment: keyof typeof EQUIPMENT;
  notes: string;
};

const keysOf = <T extends object>(table: T) => Object.keys(table) as Extract<keyof T, string>[];

/** The options for each select in the Beginner Guide form, in display order. */
export const planOptions = {
  goal: keysOf(GOALS),
  experience: keysOf(EXPERIENCE),
  daysPerWeek: keysOf(SPLITS),
  sessionLength: keysOf(SESSION_MINUTES),
  equipment: keysOf(EQUIPMENT),
};

export type PlannedExercise = {
  name: string;
  muscleId: number;
  muscle: string;
  sets: number;
  reps: string;
};

export type WorkoutDay = {
  day: number;
  focus: string;
  exercises: PlannedExercise[];
};

export type WorkoutPlan = {
  summary: string;
  days: WorkoutDay[];
  /** Muscle groups the split asks for that no exercise covers with this equipment and experience */
  skipped: string[];
};

const WARM_UP_MINUTES = 10;
const SECONDS_PER_SET = 45; // the set itself plus getting into position
const MIN_EXERCISES = 2;
const MAX_EXERCISES = 8; // past this, a beginner piles on volume they cannot recover from
const MAX_EXERCISES_PER_MUSCLE = 2;
// r: 1 in muscles.json marks a hold or a carry (Plank, Farmer's Walk) - their tips ask for 30-45 seconds
const HOLD_REPS = "30-45 s";

/** The same list, starting at `offset` and wrapping around. */
const rotate = <T>(list: T[], offset: number): T[] => {
  const start = list.length ? offset % list.length : 0;
  return [...list.slice(start), ...list.slice(0, start)];
};

const formatRest = (seconds: number) => (seconds < 120 ? `${seconds} seconds` : `${seconds / 60} minutes`);

/**
 * Builds a weekly plan from the Beginner Guide answers. Pure: nothing outside the
 * arguments is read or changed, and the same input always gives the same plan -
 * so it is safe to store only the answers and rebuild the plan whenever it is shown.
 */
export function buildWorkoutPlan(answers: BeginnerAnswers, muscles: Muscle[]): WorkoutPlan {
  const goal: GoalRule = GOALS[answers.goal];
  const experience: ExperienceRule = EXPERIENCE[answers.experience];
  const split: Split = SPLITS[answers.daysPerWeek];
  const minutes = SESSION_MINUTES[answers.sessionLength];
  const equipment: EquipmentTag[] = EQUIPMENT[answers.equipment];

  const sets = Math.max(1, goal.sets + experience.setsDelta);
  // Sized with the goal's own set count, so a newcomer's lower volume means a shorter session, not extra exercises
  const secondsPerExercise = goal.sets * (SECONDS_PER_SET + goal.restSeconds);
  const perSession = Math.min(
    MAX_EXERCISES,
    Math.max(MIN_EXERCISES, Math.round(((minutes - WARM_UP_MINUTES) * 60) / secondsPerExercise)),
  );

  // Firestore can hand ids back as strings, so compare them as text like the rest of the app does
  const byId = new Map(muscles.map((muscle) => [String(muscle.id), muscle]));
  const muscleFor = (key: MuscleKey) => byId.get(String(MUSCLE_IDS[key]));
  // Exercises this user can do for a muscle, main lift first (muscles.json keeps them in that order)
  const optionsFor = (key: MuscleKey) =>
    (muscleFor(key)?.ex ?? []).filter(
      (exercise) =>
        (DIFFICULTY[exercise.diff] ?? Infinity) <= experience.maxDifficulty &&
        (exercise.eqTag ?? []).some((tag) => equipment.includes(tag)),
    );

  const timesPicked = new Map<MuscleKey, number>();

  const days = split.days.map((template, index): WorkoutDay => {
    const usedToday = new Set<string>();
    const perMuscle: PlannedExercise[][] = template.muscles.map(() => []);

    // Every muscle gets one exercise before any muscle gets a second
    for (let round = 0; round < MAX_EXERCISES_PER_MUSCLE; round++) {
      template.muscles.forEach((key, slot) => {
        const muscle = muscleFor(key);
        if (!muscle || usedToday.size === perSession) return;

        // Carry on from where this muscle stopped last time, so repeated days vary
        const picked = timesPicked.get(key) ?? 0;
        const exercise = rotate(optionsFor(key), picked).find((option) => !usedToday.has(option.n));
        if (!exercise) return;

        usedToday.add(exercise.n);
        timesPicked.set(key, picked + 1);
        perMuscle[slot].push({
          name: exercise.n,
          muscleId: MUSCLE_IDS[key],
          muscle: muscle.n,
          sets,
          reps: exercise.r > 1 ? goal.reps : HOLD_REPS,
        });
      });
    }

    return { day: index + 1, focus: template.focus, exercises: perMuscle.flat() };
  });

  const skipped = [...new Set(split.days.flatMap((day) => day.muscles))]
    .filter((key) => optionsFor(key).length === 0)
    .map((key) => muscleFor(key)?.n ?? key);

  const summary = [
    `${days.length} sessions a week (${split.name}), about ${minutes} minutes each, aimed at ${goal.aim}.`,
    `Do ${sets} sets of ${goal.reps} reps and rest ${formatRest(goal.restSeconds)} between sets.`,
    split.note,
    goal.tip,
    experience.tip,
  ]
    .filter(Boolean)
    .join(" ");

  return { summary, days, skipped };
}
