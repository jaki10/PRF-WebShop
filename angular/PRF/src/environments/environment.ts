// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  custom: 'This is PRF dev',
  serverUrl: 'http://localhost:4200/server',
  springUrl:'http://localhost:8080',
  firebase: {
    /* apiKey */
    authDomain: "angular-webshop-5fcd7.firebaseapp.com",
    projectId: "angular-webshop-5fcd7",
    storageBucket: "angular-webshop-5fcd7.appspot.com",
    messagingSenderId: "576739265794",
    appId: "1:576739265794:web:720a29012e33dd343f461b",
    measurementId: "G-WLL0PM40W3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
