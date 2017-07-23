const moment = require('moment');

const dailyLogDates = [
  moment('04-04-2017', 'DD-MM-YYYY').valueOf(),
  moment('03-05-2017', 'DD-MM-YYYY').valueOf()
];

const dailyLogs = [
  {
    _id: '0_daily_log',
    date: moment('04-04-2017', 'DD-MM-YYYY').valueOf(),
    macros: {
      protein: 110,
      carbohydrate: 90,
      fat: 60
    },
    measurements: {
      neck: undefined,
      weight: 123,
      chest: undefined,
      rightArm: undefined,
      leftArm: undefined,
      aboveBelly: undefined,
      belly: undefined,
      belowBelly: undefined,
      hips: 45,
      rightThigh: undefined,
      leftThigh: undefined
    },
    sleepIssues: 4,
    stressIssues: 5,
    hungerIssues: 2,
    fatigueLethargy: 1
  },
  {
    _id: '1_daily_log',
    date: moment('03-05-2017', 'DD-MM-YYYY').valueOf(),
    macros: {
      protein: 103,
      carbohydrate: 30,
      fat: 90
    },
    measurements: {
      neck: undefined,
      weight: 145,
      chest: 23,
      rightArm: undefined,
      leftArm: undefined,
      aboveBelly: undefined,
      belly: undefined,
      belowBelly: undefined,
      hips: undefined,
      rightThigh: undefined,
      leftThigh: undefined
    },
    sleepIssues: 1,
    stressIssues: 2,
    hungerIssues: 3,
    fatigueLethargy: 4
  }
];

const auth = {
  isNew: false,
  email: 'endre@mail.com',
  _id: 'randomId',
  token: 'randomToken',
  lastLogin: moment('05-07-2017', 'DD-MM-YYYY').valueOf()
};

const kcalTargets = [
  {
    _id: '0_kcal_target',
    startDate: moment('05-05-2017', 'DD-MM-YYYY').valueOf(),
    endDate: undefined,
    isLatest: true,
    rest: {
      calorie: 1000,
      protein: 100,
      carbohydrate: 30,
      fat: 80
    },
    training: {
      calorie: 2100,
      protein: 110,
      carbohydrate: 210,
      fat: 30
    }
  },
  {
    _id: '1_kcal_target',
    startDate: moment('04-04-2017', 'DD-MM-YYYY').valueOf(),
    endDate: moment('05-05-2017', 'DD-MM-YYYY').valueOf(),
    isLatest: false,
    rest: {
      calorie: 1100,
      protein: 100,
      carbohydrate: 30,
      fat: 80
    },
    training: {
      calorie: 2230,
      protein: 110,
      carbohydrate: 210,
      fat: 30
    }
  }
];

const userDetails = {
  dob: moment('22-05-1988', 'DD-MM-YYYY').valueOf(),
  sex: 'male',
  picture: `https://somerandomurl/pictureid`,
  userName: 'kfbr392'
};

const latestMeasurements = {
  height: 175,
  neck: 36,
  weight: 66.8,
  chest: 90,
  rightArm: 40,
  leftArm: 41,
  aboveBelly: 81,
  belly: 81,
  belowBelly: 87,
  hips: 92,
  rightThigh: 50,
  leftThigh: 50
};

const workoutTargets = [
  {
    _id: '0_workout_target',
    type: 'main',
    name: 'back',
    onDays: [1],
    exercises: ['deadlift', 'pullup']
  },
  {
    _id: '1_workout_target',
    type: 'main',
    name: 'chest',
    startDayofTraining: moment('05-05-2017', 'DD-MM-YYYY').valueOf(),
    onEveryxDay: 1,
    exercises: ['bench', 'pushup']
  }
];

const workoutLogDates = [
  moment('02-07-2017', 'DD-MM-YYYY').valueOf(),
  moment('01-01-2017', 'DD-MM-YYYY').valueOf(),
  moment('01-07-2017', 'DD-MM-YYYY').valueOf()
];

const workoutLogs = [
  {
    _id: '0_workout_log',
    date: moment('01-07-2017', 'DD-MM-YYYY').valueOf(),
    exercises: [
      {
        name: 'deadlift',
        _id: '0_workout_log_0_exercise',
        sets: [
          {
            _id: '0_workout_log_0_exercise_0_set',
            reps: 5,
            weight: 95.5
          },
          {
            _id: '0_workout_log_0_exercise_1_set',
            reps: 5,
            weight: 90.5
          }
        ]
      }
    ]
  },
  {
    _id: '1_0_workout_log',
    date: moment('02-07-2017', 'DD-MM-YYYY').valueOf(),
    exercises: [
      {
        name: 'squat',
        _id: '1_workout_log_0_exercise',
        sets: [
          {
            _id: '1_workout_log_0_exercise_0_set',
            reps: 5,
            weight: 60.5
          }
        ]
      }
    ]
  },
  {
    _id: '2_workout_log',
    date: moment('01-01-2017', 'DD-MM-YYYY').valueOf(),
    exercises: [
      {
        name: 'benchpress',
        _id: '2_workout_log_0_exercise',
        sets: [
          {
            _id: '2_workout_log_0_exercise_0_set',
            reps: 5,
            weight: 50
          },
          {
            _id: '2_workout_log_0_exercise_1_set',
            reps: 5,
            weight: 45.5
          }
        ]
      }
    ]
  }
];

module.exports = {
  dailyLogDates,
  dailyLogs,
  auth,
  kcalTargets,
  userDetails,
  workoutTargets,
  latestMeasurements,
  workoutLogDates,
  workoutLogs
};
