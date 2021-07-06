/*
Post a JSON body to REST API

https://run.mocky.io/v3/a41970ac-dae0-4e97-a88b-8068cb267a9b
Post an email and password in Json format

*/
import http from 'k6/http'

export default function(){
    var url = 'https://run.mocky.io/v3/a41970ac-dae0-4e97-a88b-8068cb267a9b'

    var param={
        headers:{
            "Content-Type":"application/json"
        }
    }
    var payload = JSON.stringify({
        email: "abc@email.com",
        password: "123456"
    })

    // comando POST tem que mandar (URL,HEADER, Json Body)
    let response = http.post(url,param,payload)
}


