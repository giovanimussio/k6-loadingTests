/*
COMPLEX ARRAY  or JSON 
REQUEST - https://run.mocky.io/v3/daf74efc-afff-4b26-9b0a-0b6f77223a9e
{
   "data":[ {
        "name" : "leanne graham",
        "email": "leanne@gmail.com",
        "job": "web developer",
        "location": "london",
        "array": [
            1,
            2,
            3
        ]
    }, {
        "name" : "erwin howell",
        "email": "erviw@gmail.com",
        "job": "tech lead",
        "location": "london",
         "array": [
            1,
            2,
            3,
            4
        ]
    }, {
        "name" : "clementine bauch",
        "email": "clementine@gmail.com",
        "job": "web developer",
        "location": "liverpool",
         "array": [
            4
        ]
    }, {
        "name" : "chelsey dietrich",
        "email": "chelsey@gmail.com",
        "job": "baker",
        "location": "london",
         "array": [
            3,
            4
        ]
    }, {
        "name" : "dennis schulist",
        "email": "dennis@gmail.com",
        "job": "tester",
        "location": "manchester",
         "array": [
            1,
            2
        ]
    }
    ]
}
*/

import http from 'k6/http';

export default function(){
    let response  = http.get('https://run.mocky.io/v3/daf74efc-afff-4b26-9b0a-0b6f77223a9e');

    let body = JSON.parse(response.body);
    body.data.forEach(element => {
        console.log(`value of name from data is ${element.name}`)
        element.array.forEach(elementArray =>{
            console.log(`value of property array is ${elementArray}`)
        })
    });


}