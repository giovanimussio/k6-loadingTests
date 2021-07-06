/*

REQUEST URL - https://run.mocky.io/v3/2c88699b-3f8a-426e-99ac-a70ea37c0431
Returns bellow:

[
    {
        "name" : "leanne graham",
        "email": "leanne@gmail.com",
        "job": "web developer",
        "location": "london"
    }, {
        "name" : "erwin howell",
        "email": "erviw@gmail.com",
        "job": "tech lead",
        "location": "london"
    }, {
        "name" : "clementine bauch",
        "email": "clementine@gmail.com",
        "job": "web developer",
        "location": "liverpool"
    }, {
        "name" : "chelsey dietrich",
        "email": "chelsey@gmail.com",
        "job": "baker",
        "location": "london"
    }, {
        "name" : "dennis schulist",
        "email": "dennis@gmail.com",
        "job": "tester",
        "location": "manchester"
    }
]
*/

import http from 'k6/http'

export default function(){
    let response= http.get('https://run.mocky.io/v3/2c88699b-3f8a-426e-99ac-a70ea37c0431')

    let body =  JSON.parse(response.body)
    //como parsear o array
    body.forEach(element => {
        console.log(`name is ${element.name}`)
    });
}