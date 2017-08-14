import asyncComponent from './async_container';

export const AsyncMainContainer = asyncComponent(() =>
  System.import('./../main').then(module => module.default)
);

export const AsyncDailyLogsRouter = asyncComponent(() =>
  System.import('./../daily_logs/daily_logs_router').then(
    module => module.default
  )
);

export const AsyncCalorieTargetContainer = asyncComponent(() =>
  System.import('./../calorie_target/calorie_target_container').then(module => module.default)
);

export const AsyncUserDetailsContainer = asyncComponent(() =>
  System.import('./../user_details').then(module => module.default)
);

export const AsyncWorkoutLogsRouter = asyncComponent(() =>
  System.import('./../workout_logs/workout_logs_router').then(
    module => module.default
  )
);

export const AsyncWorkoutTargetsRouter = asyncComponent(() =>
  System.import('./../workout_targets/workout_targets_router').then(
    module => module.default
  )
);

export const AsyncCalorieTrackerContainer = asyncComponent(() =>
  System.import('./../calorie_tracker/calorie_tracker_container').then(module => module.default)
);
