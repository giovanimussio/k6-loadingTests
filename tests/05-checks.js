/*
Create a mock API for testing -  DUMMY API
https://designer.mocky.io/

will be perform a request to (https://run.mocky.io/v3/36cb8d92-64e2-4005-92e7-fbb3e2ff7cf5) validating if every request reponse is status code 200


///{ "Message": "API Executed Sucessfully" }
*/
import http from 'k6/http';
import {check} from 'k6';


export default function(){
    let response = http.get('https://run.mocky.io/v3/36cb8d92-64e2-4005-92e7-fbb3e2ff7cf5')
    let response2 = http.get('https://run.mocky.io/v3/d8a60eb7-cb67-4c3e-b182-8a5564d75657')//returns { "Message": "API Executed Sucessfully" }

    //console.log(`response body length ${response.body.length} for VU= ${__VU} e iteration number= ${__ITER}`) // virtual user number ${__VU}
    //console.log(`response body length ${response2.body}`)

    check(response,{
        'is response status is 200 :' : (r) => r.status === 200,
        'body size is 0 bytes: ' : (r) => r.body.length ==0,
    });

    check(response2,{
        'is response2 status is 200 :' : (r) => r.status === 200,
        'body size is 43 bytes: ' : (r) => r.body.length == 41,
        'response2 body is API Executed Sucessfully: ' : (r) => r.body == '{\n"Message": "API Executed Sucessfully"\n}'
    });
}