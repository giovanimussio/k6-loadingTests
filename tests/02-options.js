//call google.com
//when 1000s users call google.com ,what will happen
// call means getr - hhtp.het

import http from 'k6/http';

export let options = {
    //DEclar configuration
    vus: 10,
    duration: '10s' 
}
//INIT CODE


//Main function where user will be spread
//Entry point for virtual users
export default function(){
    http.get('https://www.google.com')
    // Auto format document ALT+SHIFT+F

}
//test use execute test with 1 virtual user
//k6 run --vus <number_of_users> --duration <execution_time>s <folder_name>or<file_name> - 10 virtual users will hit the endpoint again and again for 5 seconds