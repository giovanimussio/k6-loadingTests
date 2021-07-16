/*
Threshold define pass/fail critera for tests

Example
System does not produce more tha 1% of errors
Response time for 95% of APIs requests should be below 200miliseconds
Response time for 99% of requests should be below 400 miliseconds

Threshold analyse performance metrics defined above
determine final tests result
marc tests as pass/fail
*/

import http from 'k6/http'
import {Rate} from 'k6/metrics'

//Declare Rate
const failRate = new Rate('failed requests')
//     failed requests................: 0.00%  ✓ 0   ✗ 1  
//All below req satisfeid
export let options = {
    thresholds:{
        //Define requirements
        'failed requests' : ['rate < 0.1'],
        'http_req_duration':['p(95)<200','p(99)<400']
    }
};

export default function(){
    let res = http.get('https://run.mocky.io/v3/a41970ac-dae0-4e97-a88b-8068cb267a9b')

    //Apply threasholds
    failRate.add(res.status !== 200)//if response is not 200, then fail, so we checked if the response is 200

}
