/*
Checks will not fail the whole load test suite
So we will use Rate along with check
*/

/*
Create a mock API for testing -  DUMMY API
https://designer.mocky.io/

will be perform a request to (https://run.mocky.io/v3/36cb8d92-64e2-4005-92e7-fbb3e2ff7cf5) validating if every request reponse is status code 200


///{ "Message": "API Executed Sucessfully" }

Condition - Fail load tests if 10% os results gets failed
Fo example, 1000 VU call API once
So in short API gets called 1000 times
Tottal 1000 requests
Failure rate should be less than 10%
Less than 10% results failed is allowed else please fail the load tests
*/
import http from 'k6/http';
import {check} from 'k6';
//Import Rate
import {Rate} from 'k6/metrics'
//Export variable that we will use in test
export let errorRate = new Rate('errors')

//define options
export let options ={
    thresholds :{
        errors: ['rate<0.1']// i.e 10% requests fail 
    }
}


export default function(){
    let response = http.get('https://run.mocky.io/v3/36cb8d92-64e2-4005-92e7-fbb3e2ff7cf5')


    const check1 = check(response,{
        'is response status is 200 :' : (r) => r.status === 200,
    });
    errorRate.add(!check1) // not status code 200, body length not matched also add not operator

    const check2 = check(response,{
        'body size is 0 bytes: ' : (r) => r.body.length ==0,
    });
    errorRate.add(!check2)
}