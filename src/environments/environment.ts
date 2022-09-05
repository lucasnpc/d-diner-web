// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "http://localhost:8000/",
  firebase: {
    projectId: 'd-diner',
    appId: '1:592852065637:web:470ed702aa4080e300d58c',
    databaseURL: 'https://d-diner-default-rtdb.firebaseio.com',
    storageBucket: 'd-diner.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAHdsr45sjl4gSzPwxAvhg8vI3wK0CNGUE',
    authDomain: 'd-diner.firebaseapp.com',
    messagingSenderId: '592852065637',
    measurementId: 'G-Y4DZKEQFKY',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
