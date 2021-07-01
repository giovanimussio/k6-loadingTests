/*
###RAMP UP and RAMP DOWN###
In this file 10 users ramp the google.com for 10 seconds
And after that, 20users ramp up for 1 minute
*/
import http from 'k6/http';

//RAMP up and RAMP down configuration should me made inside options
//target = virtual users(vus)
export let options = {
    stages :[
        {duration: '10s', target:'10'}, //10 users for 10 seconds
        {duration: '60s', target:'20'}  //again 20 users for 1 minute(60s)
    ]
}
//Main function for VU will call endpoint
export default function(){
    http.get('https://www.google.com')
    // Auto format document ALT+SHIFT+F

}