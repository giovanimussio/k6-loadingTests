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


//curl -H 'Host: api.ze.delivery' -H 'content-type: application/json' -H 'x-visitorid: 2c194340-db28-11eb-a097-09bfb49d7518' -H 'accept: */*' -H 'x-remote-config: {"test_hidden_shelves_identifiers":["605544b0-caa0-4a31-a69f-832c502b9c79","d4eae414-6d2f-43ed-8578-bc6f8068c1ac","3b0de116-2e6b-4674-8399-52d5e56b1bf6","8734bee7-f718-4d2d-9274-d777b7cce51c"],"test_chat_rollout_state":{"AC":1,"AL":1,"CE":1,"ES":0.3,"MG":1,"PB":1,"PI":1,"PR":1,"RS":1,"SC":1,"SP":0.05,"TO":1,"BA":1,"SE":1,"PE":1,"RN":1,"MA":1},"test_timeline_description":""}' -H 'x-accesstoken: eyJraWQiOiJSRmFwYnM0dkZxSFdUVDJocnFLbHhjMElhOW03Z2duNFFPVlNFTzh0T3NjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwN2U5MWMwNy03YWM4LTQ3Y2QtYWRkNC00NmU2NWE0MjBhYTkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfeVdvS2FUclk5X0ZhY2Vib29rIl0sInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MjUyMjUxODUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3lXb0thVHJZOSIsImV4cCI6MTYyNTMxMTU4NSwiaWF0IjoxNjI1MjI1MTg1LCJ2ZXJzaW9uIjoyLCJqdGkiOiI3Nzc2ZjQwZi0zODYwLTQwNjUtODc2MC04YmI4NTU1MmI3NGYiLCJjbGllbnRfaWQiOiI1bmY0aHUyZW1lZTFwc3VzN2E1b2dubWZyaiIsInVzZXJuYW1lIjoiRmFjZWJvb2tfNDUwMDI0MDg4MzMzNTc4NSJ9.r9Us4jnTGEIcrGR5xtnBaNQ1WaQaFz6NSp-WVQh__9TkvKH4W5-Cnp6EygMAB0xhrxmq6ptozC2x9-NzkdhrqVx5B2tnZ1wi2OjHFZyLShRH71zXQ6uMQiWIRFUNS46lOK8xf1XxtgnsWowET6kmer_7suiSkGbz3mbcU8Z2_OrjRURDSyo0QFfmBfm_Ciq0SERUhI3fqJfYyzCDssAxXRGI7Q0mivbJIfizJQc5uIKTPSbzJAoxibZp_5PEAggv5OU_-gBKwUo0V2hPLUA7p37G66hf6au2zb_Q4OSZc_ax0obcGxI_3pCPCsLxBP-agJ7XaIA7WJo_40DW3ErLEA' -H 'accept-language: en-us' -H 'x-request-origin: APP' -H 'user-agent: CourierReactNative/936 CFNetwork/1240.0.4 Darwin/20.5.0' --data-binary '{"operationName":"Showcase","variables":{"filter":{"type":"CATEGORY","id":"94d3d53d-840d-4ca8-ab26-edc205b4daee"},"pageLength":5},"query":"query Showcase($filter: ShowCaseFilter, $cursor: String, $pageLength: Int) {\n  loadNewShowCase(filter: $filter, cursor: $cursor, pageLength: $pageLength) {\n    messages {\n      category\n      target\n      key\n      message\n    }\n    showCase {\n      images\n      nextCursor\n      hasNextPage\n      shelves {\n        id\n        type\n        displayName\n        hasNextItems\n        items {\n          id\n          type\n          images\n          displayName\n          applicableDiscount {\n            presentedDiscountValue\n            discountType\n            finalValue\n          }\n          category {\n            id\n            displayName\n          }\n          brand {\n            id\n            displayName\n          }\n          price {\n            min\n            max\n          }\n        }\n      }\n    }\n  }\n}\n"}' --compressed 'https://api.ze.delivery/public-api'

//curl -H 'Host: api.ze.delivery' -H 'content-type: application/json' -H 'x-visitorid: 2c194340-db28-11eb-a097-09bfb49d7518' -H 'accept: */*' -H 'x-remote-config: {"test_hidden_shelves_identifiers":["605544b0-caa0-4a31-a69f-832c502b9c79","d4eae414-6d2f-43ed-8578-bc6f8068c1ac","3b0de116-2e6b-4674-8399-52d5e56b1bf6","8734bee7-f718-4d2d-9274-d777b7cce51c"],"test_chat_rollout_state":{"AC":1,"AL":1,"CE":1,"ES":0.3,"MG":1,"PB":1,"PI":1,"PR":1,"RS":1,"SC":1,"SP":0.05,"TO":1,"BA":1,"SE":1,"PE":1,"RN":1,"MA":1},"test_timeline_description":""}' -H 'x-accesstoken: eyJraWQiOiJSRmFwYnM0dkZxSFdUVDJocnFLbHhjMElhOW03Z2duNFFPVlNFTzh0T3NjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwN2U5MWMwNy03YWM4LTQ3Y2QtYWRkNC00NmU2NWE0MjBhYTkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfeVdvS2FUclk5X0ZhY2Vib29rIl0sInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MjUyMjUxODUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3lXb0thVHJZOSIsImV4cCI6MTYyNTMxMTU4NSwiaWF0IjoxNjI1MjI1MTg1LCJ2ZXJzaW9uIjoyLCJqdGkiOiI3Nzc2ZjQwZi0zODYwLTQwNjUtODc2MC04YmI4NTU1MmI3NGYiLCJjbGllbnRfaWQiOiI1bmY0aHUyZW1lZTFwc3VzN2E1b2dubWZyaiIsInVzZXJuYW1lIjoiRmFjZWJvb2tfNDUwMDI0MDg4MzMzNTc4NSJ9.r9Us4jnTGEIcrGR5xtnBaNQ1WaQaFz6NSp-WVQh__9TkvKH4W5-Cnp6EygMAB0xhrxmq6ptozC2x9-NzkdhrqVx5B2tnZ1wi2OjHFZyLShRH71zXQ6uMQiWIRFUNS46lOK8xf1XxtgnsWowET6kmer_7suiSkGbz3mbcU8Z2_OrjRURDSyo0QFfmBfm_Ciq0SERUhI3fqJfYyzCDssAxXRGI7Q0mivbJIfizJQc5uIKTPSbzJAoxibZp_5PEAggv5OU_-gBKwUo0V2hPLUA7p37G66hf6au2zb_Q4OSZc_ax0obcGxI_3pCPCsLxBP-agJ7XaIA7WJo_40DW3ErLEA' -H 'accept-language: en-us' -H 'x-request-origin: APP' -H 'user-agent: CourierReactNative/936 CFNetwork/1240.0.4 Darwin/20.5.0' --data-binary '{"operationName":"Showcase","variables":{"filter":null,"pageLength":8},"query":"query Showcase($filter: ShowCaseFilter, $cursor: String, $pageLength: Int) {\n  loadNewShowCase(filter: $filter, cursor: $cursor, pageLength: $pageLength) {\n    messages {\n      category\n      target\n      key\n      message\n    }\n    showCase {\n      images\n      nextCursor\n      hasNextPage\n      shelves {\n        id\n        type\n        displayName\n        hasNextItems\n        items {\n          id\n          type\n          images\n          displayName\n          applicableDiscount {\n            presentedDiscountValue\n            discountType\n            finalValue\n          }\n          category {\n            id\n            displayName\n          }\n          brand {\n            id\n            displayName\n          }\n          price {\n            min\n            max\n          }\n        }\n      }\n    }\n  }\n}\n"}' --compressed 'https://api.ze.delivery/public-api'