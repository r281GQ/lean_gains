import axios from 'axios';

export const validatePasswordAgain = (password, allValue) =>
  allValue.get('password') === allValue.get('passwordAgain')
    ? undefined
    : `passwords don't match`;

export const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
    ? undefined
    : 'Email is not valid';

export const validateIsEmailUnique = values =>
  axios
    .get(
      `/api/auth/unique/${values.get('email') ? values.get('email') : 'email'}`,
      {
        withCredentials: true
      }
    )
    .then(
      ({ data: { result } }) =>
        result ? undefined : { email: 'Email is already taken!' }
    )
    .catch(error => console.log(error));

export const required = message => value => (!value ? message : undefined);
