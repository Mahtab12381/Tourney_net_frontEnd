import fetchIntercept from 'fetch-intercept';

 export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        if(localStorage.getItem('user-info')){
            var token= JSON.parse(localStorage.getItem('user-info')).Token_key;
            config.headers.Authorization=token; 
        }  
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});