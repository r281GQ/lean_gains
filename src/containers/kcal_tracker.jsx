import React, {Component} from 'react';
import {TextField} from 'material-ui';
import  axios from 'axios';
const refkey = 0;
const api = `https://trackapi.nutritionix.com/v2/natural/nutrients`;



class KcalLog extends Component {
  render() {
    return <div>kclalog



        <TextField name='search' onKeyPress={event => {  if(event.key === 'Enter')
          axios({
            url: api,
            method: 'post',
            data: {
              query: event.target.value
            },
             headers: {
            "x-app-id": "8c0712d2",
            "x-app-key":"a9ff02753543e452faaaa3bb2936e49e",
            "x-remote-user-id":"0"
          } })
          .then(response => console.log(response.data))
          .catch(error => console.log(error))
        }} />


    </div>
  }
}

export default KcalLog;
