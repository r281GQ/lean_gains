import Immutable, {fromJS} from ''

const INITIAL_STATE = {
  0: {
    _id: "",
    date: undefined,
    exercises: [
      {
        name: "",
        id: "",
        repetitions: [
          {
            _id: "",
            set: "",
            kg: ""
          }
        ]
      }
    ]
  }
};
