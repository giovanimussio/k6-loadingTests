/*
Checks - useful for assertions, pass/fail result
checks just act like assertion, verify if things test works as expected
They dont fail the load test
so we need thresholds


*/

import http from 'k6/http'
import {check} from 'k6'

export let options = {
    vus: 10,
    duration: '10s',
    thresholds:{
        //rate of successful checks must be greater than 95%. 95% check must Pass/Successful
        'checks': ['rate>0.95']
    }
}

export default function(){
    const response = http.get('https://run.mocky.io/v3/a41970ac-dae0-4e97-a88b-8068cb267a9b');

    check(response,{
        'is status is 200: ' : r => r.status ===200 
    })
}