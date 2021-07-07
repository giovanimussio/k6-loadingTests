/*

*/

import {Counter} from 'k6/metrics'
var myCounter = new Counter('my counter')

export default function(){
    myCounter.add(1)
    myCounter.add(2)

    //call API used in your project
    /*
    GET API = http://yourapiname/v4/getusers
    Now this API may not provide you response within 1 second, it is bound to take time

    REquirement - Verify when above API returns lets say 200
    So you decie to call above GET API
    If response.status != 200
    then wait for 1 second
    and call above GET aPI

    do this for MAx 5 times
    That is retry calling above GET API after every 1 second for MAX 5 times till you get status code as 200
    So here, you can add counter to find out mas when it has returned 200 response
    
    */
}