//call google.com
//when 1000s users call google.com ,what will happen
// call means getr - hhtp.het

import http from 'k6/http';

//Main function where user will be spread
export default function(){
    http.get('https://www.google.com')
    // Auto format document ALT+SHIFT+F

}
//test use execute test with 1 virtual user