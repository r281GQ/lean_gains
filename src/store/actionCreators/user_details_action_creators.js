const fetchUserDetails = () => (dispatch, getState) => {
  const USERDETAILSRL = `http://localhost/4000/api/${USERDETAILSRL}`;

  let response = await axios({
    url: USERDETAILSRL,
    method: "GET",
    headers: { "x-auth": getState().auth.token }
  });

  console.log(response);

};
