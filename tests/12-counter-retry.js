import {Counter} from 'k6/metrics'
var retryCounter = new Counter("GetAPI_MAX_RETRY")
import http from 'k6/http'
import { sleep } from 'k6'

export default function(){
    //so retry the API call
    var maxAttemps = 5
    retryCounter.add(1)
    for(var retries = 5; retries>0; retries--){
        var numeberOfAttempts = maxAttemps-retries+1
        const response = http.get("https://run.mocky.io/v3/a400c4fc-2220-4dd1-93a8-1ca20a3e9026");
        //assumes this api returns 404
        if(response.status !== 404){
            retryCounter.add(1)
            console.log (`response is not correct, attempt is ${numeberOfAttempts} VU=${__VU} ITER=${__ITER} sleeping for 1 second`)
            // so e need to retry after every 1 second
            sleep(1)
        }else{
            //response is correct, retries ==0
            retries == 0

        }
    }

}