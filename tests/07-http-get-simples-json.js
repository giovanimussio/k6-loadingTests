/*
HTTp API is - https://run.mocky.io/v3/a400c4fc-2220-4dd1-93a8-1ca20a3e9026
HTTP HEADEr is content-typ: application/json

*/

import http from "k6/http"
import {check} from "k6"


export default function(){
    var url = "https://run.mocky.io/v3/a400c4fc-2220-4dd1-93a8-1ca20a3e9026"

    var headerParam = {
        headers: {
            'Content-Type' :'application/json',
        }
    }

    const response = http.get(url,headerParam)
    //executing tests
    check(response,{
        'is status 200:' : (r) => r.status ===200,
    })

    //reading the response
    //it is json response
    let body = JSON.parse(response.body)

    console.log(`response body is ${JSON.stringify(body)}`)
    console.log(`Message is ${body.message}`)

    //So now, you can parse JSON response and return value of anything to other APIs
    check(response,{
        'is message correct' : (r) =>  JSON.parse(r.body).message === "Data fetched successfully",
    })


}