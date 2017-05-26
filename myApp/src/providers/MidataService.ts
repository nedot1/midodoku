// import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/map';
// import {Observable} from 'rxjs/Observable';
// import {Midata} from 'Midata';
// import {User} from '../Entity/user';
// import {MidataWrapper} from './MidataWrapper';
// import {Events, Platform, NavController} from "ionic-angular";
// import {Network} from "@ionic-native/network";
// import {Storage} from '@ionic/storage';
// import {LoginPage} from '../pages/login/login';
// // import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";
//
// @Injectable()
// /**
//  * Service to manage the Connection to midata server.
//  */
// export class MidataConnectionService extends MidataWrapper {
//     /**
//     * Contains the Midata object.
//     */
//     // connection: any = new Midata('https://test.midata.coop' + ':9000', 'evoli', 'test');
//     /**
//     * Contains all the steps goal to the connected user.
//     */
//     stepsGoals: any;
//     /**
//     * Contains all the steps to the connected user.
//     */
//     steps: any;
//
//     CONNECTION_STATE: boolean;
//
//     /**
//
//     * Constructor of the class.
//     * @param secureStorageServices  Parameter to use the provider SecureStorageServices which help to use the Secure Storage plugin.
//     * @param user  Parameter to use the provider entity User in order to get the informations related to the connected user.
//     */
//     //constructor(protected secureStorage: SecureStorage, protected user: User, protected platform: Platform, protected events: Events, protected network: Network) {
//     constructor(protected platform: Platform, protected events: Events) {
//          //super(new Midata('https://test.midata.coop' + ':9000', 'evoli', 'test'), secureStorage, platform, events, network)
//          super(new Midata('https://test.midata.coop' + ':9000', 'developer@midodoku.ch', 'Test1234'), platform)
//         // //  check network connectivity on inital start
//         // if (this.network.type === "none") {
//         //     this.setConnectionState(false);
//         // } else {
//         //     this.setConnectionState(true);
//         // }
//     }
// 
//
//     // getEvoliUser(): User {
//     //   //  return this.user;
//     //   return null;
//     // }
//
//     /**
//     * Get the connection.
//     * @returns the connection object
//     */
//     getConnection() {
//         return super.getConnection();
//     }
//
//     getConnectionState() {
//         return this.CONNECTION_STATE;
//     }
//
//     setConnectionState(flag: boolean) {
//         this.CONNECTION_STATE = flag;
//     }
//
//     /**
//     * Set the connection.
//     */
//     setConnection(connection) {
//         //super.setConnection(connection);
//     }
//
//     /**
//     * Function to determine if the user is logged
//     * @returns Boolean to say if the user is connected
//     */
//     loggedIn(): Boolean {
//         return this.getConnection().loggedIn;
//     }
//
//     /**
//     * Get the refreshToken of the autorization of the user
//     * @returns string with the refreshToken
//     */
//     getRefreshToken(): string {
//         return this.getConnection().refreshToken;
//     }
//     /**
//     * Get the refreshToken of the autorization of the user
//     * @returns string with the refreshToken
//     */
//     getAuthToken(): string {
//         return this.getConnection().authToken;
//     }
//     /**
//     * Get the refreshToken of the autorization of the user
//     * @returns string with the refreshToken
//     */
//     getUser() {
//         return this.getConnection().user;
//     }
//
//
//
//     loginOAuth() {
//         return super.authenticate();
//     }
//
//     /**
//     * Login to midata
//     * @param username  Username used to the connection to midata.
//     * @param password  Password used to the connection to midata.
//     * @param callback  Callback function used to determine when the asynchronous login is done or get an error
//     */
//     login(username, password, callback) {
//         this.getConnection().login(username, password).then((value) => {
//             if (value.status === 'ACTIVE') {
//                 callback(true, true);
//             } else {
//                 callback(false, false);
//             }
//
//         }, () => {
//             callback(false, true);
//         });
//     }
//
//     /**
//     * Logout to midata
//     */
//     logout(): Promise<any> {
//
//         //Remove the password from secure storage
//         //this.secureStorageServices.removeValue('password');
//         //Delete the values of the connection from the midata API
//         return super.logout();
//     }
//
//     /**
//     * Search a value in midata using the midata API
//     * @param resourceType  Type of ressource searched in midata (for example "Observation".
//     * @param params  Parameter to add to the request.
//     * @returns An observable of the search result
//     */
//     search(resourceType: string, params: any = {}): Observable<any> {
//         return Observable.fromPromise(
//             <Promise<any>> this.getConnection().search(resourceType, params));
//     }
//
//     /**
//     * Save a value in midata using the midata API
//     * @param resource  Ressource which will be saved in midata server.
//     * @returns An observable of the save result
//     */
//     save(resource: any) {
//         return Observable.fromPromise(
//             <Promise<any>> this.getConnection().save(resource));
//     }
//
//     /**
//     * Update all the value in the evoli app. This function will be done at login time.
//     * @param callback the callback function will be called when all the searched values are returned by midata server and saved in the app
//     */
//     updateAll(callback) {
//         this.searchStepsGoals().subscribe(() => {
//             this.updateHeight().subscribe(() => {
//                 this.getEvents().subscribe(() => {
//                     this.updateWeight().subscribe(() => {
//                         this.updatePhoto().subscribe(() => {
//                             this.updateLevelOfEmployement().subscribe(() => {
//                                 this.updateActivityField().subscribe(() => {
//                                     this.updateEvent().subscribe(() => {
//                                         this.updateTemperatur().subscribe(() => {
//                                             this.updatePain().subscribe(() => {
//                                                 this.updateSteps().subscribe(() => {
//                                                     this.updateLeukozytes().subscribe(() => {
//                                                         this.updateThrombozytes().subscribe(() => {
//                                                             this.updateCReactiveProtein().subscribe(() => {
//                                                                 this.updateHemoblobin().subscribe(() => {
//                                                                     this.updateMGradient().subscribe(() => {
//                                                                         this.updateKappaLambdaRatio().subscribe(() => {
//                                                                             this.updateLifeQuality().subscribe(() => {
//                                                                                 this.updateTreatment().subscribe(() => {
//                                                                                     this.updateLastLaborDate().subscribe(() => {
//                                                                                         this.updatePatientInformations().subscribe(() => {
//                                                                                             this.updateLastXDaysStepsGoal(28, () => {
//                                                                                                 this.updateStepsLastXDays(28, () => {
//                                                                                                     callback();
//                                                                                                 });
//                                                                                             });
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     }
//
//     /**
//     * update all the information of the patient user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updatePatientInformations() {
//         return this.search('Patient', {_id: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     this.user.setPatientAccount(true);
//                     this.user.setName(response[0].name[0].given[0] + ' ' + response[0].name[0].family);
//                     this.user.setUsername(response[0].telecom[0].value);
//                     this.user.setBirthdate(response[0].birthDate);
//                     this.user.setGender(response[0].gender);
//                 } else {
//                     this.user.setPatientAccount(false);
//                 }
//             }
//             )
//
//     }
//
//     /**
//     * update the photo of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updatePhoto() {
//         return this.search('Media', {patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     this.user.setPhotoURL(response[0].content.url);
//                     this.user.setPhoto(response[0].toJson());
//                 } else {
//                     this.user.setPhotoURL('');
//                     this.user.setPhoto('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * update the height of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateHeight() {
//         return this.search('Observation', {code: 'http://loinc.org|8302-2', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     //If the unit of the height is in meter, transform it to cm
//                     if (obj.valueQuantity.unit === 'm') {
//                         this.user.setHeight(obj.valueQuantity.value * 100);
//                     } else {
//                         this.user.setHeight(obj.valueQuantity.value);
//                     }
//                     this.user.setHeightUnit(obj.valueQuantity.unit);
//                 } else {
//                     this.user.setHeight('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * update the weight of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateWeight() {
//         return this.search('Observation', {code: 'http://loinc.org|3141-9', patient: this.getConnection().user.id})
//             .map(response => {
//
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastWeight(obj.valueQuantity.value);
//                     this.user.setLastWeightDate(obj.effectiveDateTime);
//                     this.user.setLastWeightUnit(obj.valueQuantity.unit);
//                 } else {
//                     this.user.setLastWeight('');
//                     this.user.setLastWeightDate('');
//                     this.user.setLastWeightUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get all the levelOfEmployement related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     getLevelOfEmployement() {
//         return this.search('Observation', {code: 'LevelOfEmployment', patient: this.getConnection().user.id})
//             .map(response => response[0]);
//     }
//
//     /**
//     * update the Level Of Employement of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateLevelOfEmployement() {
//         return this.search('Observation', {code: 'LevelOfEmployment', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLevelOfEmployement(obj.valueQuantity.value);
//                     this.user.setLevelOfEmployementDate(obj.effectiveDateTime);
//                     this.user.setLevelOfEmployementUnit(obj.valueQuantity.unit);
//                 } else {
//                     this.user.setLevelOfEmployement('');
//                     this.user.setLevelOfEmployementDate('');
//                     this.user.setLevelOfEmployementUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get all the Activity Field related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     getActivityField() {
//         return this.search('Observation', {code: 'FieldOfOccupation', patient: this.getConnection().user.id})
//             .map(response => response[0]);
//     }
//
//     /**
//     * update the Field Of Occupation of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateActivityField() {
//         return this.search('Observation', {code: 'FieldOfOccupation', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     this.user.setActivityField(this.sortArrayByEffectiveDateTime(response).toJson().valueCodeableConcept.coding[0].code);
//                 } else {
//                      this.user.setActivityField('');
//                 }
//             }
//             );
//     }
//     /**
//     * Find all the event related to the user to be used in the class.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     private getEvents() {
//         return this.search('Observation', {code: '160786009', patient: this.getConnection().user.id})
//             .map(response => {
//                 this.user.setEvents(response);
//             });
//     }
//
//     /**
//     * update the Events of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateEvent() {
//         return this.search('Observation', {code: '160786009', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     this.getEvents().subscribe(() => {
//                         var dateNow = new Date().getTime();
//                         var arrayFuturDates = [];
//                         for (var i = 0; i < response.length; i++) {
//
//                             var dateTested = new Date(response[i].effectiveDateTime).getTime();
//                             var eventTested = response[i];
//                             if (dateTested > dateNow) {
//                                 arrayFuturDates.push(eventTested);
//                             }
//                         }
//                         if (arrayFuturDates.length > 0) {
//                             arrayFuturDates.sort(function (a, b) {
//                                 return new Date(a.effectiveDateTime).getTime() - new Date(b.effectiveDateTime).getTime()
//                             });
//                             var lastEvent = arrayFuturDates[0];
//                             this.user.setNextEvent(lastEvent.valueCodeableConcept.text);
//                             this.user.setNextEventDate(lastEvent.effectiveDateTime);
//                         }
//                     })
//                 }else {
//                      this.user.setNextEvent('');
//                      this.user.setNextEventDate('');
//                 }
//             });
//     }
//
//     /**
//     * update the Temperatur of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateTemperatur() {
//         return this.search('Observation', {code: 'http://loinc.org|8310-5', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastTemperatur(this.sortArrayByEffectiveDateTime(response).toJson().valueQuantity.value);
//                     this.user.setLastTemperaturDate(obj.effectiveDateTime);
//                     this.user.setLastTemperaturUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastTemperatur('');
//                      this.user.setLastTemperaturDate('');
//                      this.user.setLastTemperaturUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * update the Pain of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updatePain() {
//         return this.search('Observation', {code: 'http://loinc.org|72514-3', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastPain(obj.valueQuantity.value);
//                     this.user.setLastPainDate(obj.effectiveDateTime);
//                     this.user.setLastPainUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastPain('');
//                      this.user.setLastPainDate('');
//                      this.user.setLastPainUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * update the Steps of the user in the user entity to be used in the rest of the application.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateSteps() {
//         return this.search('Observation', {code: 'http://loinc.org|41950-7', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastSteps(obj.valueQuantity.value);
//                     this.user.setLastStepsDate(obj.effectiveDateTime);
//                     this.steps = response;
//                 }else {
//                      this.user.setLastSteps('');
//                      this.user.setLastStepsDate('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * update the Steps of the user in the last X days.
//     * @param days The number of days from now to search from.
//     * @param callback The function is returned only when it is completely executed.
//     */
//     updateStepsLastXDays(days, callback) {
//         let list = [];
//         days--;
//         //For each day
//         for (let i = 0; i <= days; i++) {
//             //find the day form now to i day before now
//             let dayXBefore = this.dateWithoutDays(new Date(), i);
//             //find the steps for this day
//             let response = this.findStepsForDate(this.getFormatDate(dayXBefore));
//             //if steps exist, then return date and value, if not return date and null.
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: null};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().valueQuantity.value};
//             }
//         }
//         //update the 4 weeks besfore now
//         this.update1WeekSteps();
//         this.update2WeekSteps();
//         this.update3WeekSteps();
//         this.update4WeekSteps();
//         //set the result in user entity
//         this.user.setStepsLast7Days(list);
//         callback();
//     }
//
//     /**
//     * update the steps of the user for all the days of last week and stock them in the user entity.
//     */
//     update1WeekSteps() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let dayXBefore = this.dateWithoutDays(new Date(), i);
//             //find the steps for this day
//             let response = this.findStepsForDate(this.getFormatDate(dayXBefore));
//             //if steps exist, then return date and value, if not return date and null.
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: null};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().valueQuantity.value};
//             }
//         }
//         //set the result in user entity
//         this.user.setSteps1Week(list);
//     }
//
//     /**
//     * update the steps of the user for all the days from the last week to 7 day before and stock them in the user entity.
//     */
//     update2WeekSteps() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let dayWeek2 = this.dateWithoutDays(new Date(), 7);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(dayWeek2, i);
//             //if steps exist, then return date and value, if not return date and null.
//             let response = this.findStepsForDate(this.getFormatDate(dayXBefore));
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: null};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().valueQuantity.value};
//             }
//         }
//         //set the result in user entity
//         this.user.setSteps2Week(list);
//     }
//
//     /**
//     * update the steps of the user for all the days from 14 day before now to 21 days before now and stock them in the user entity.
//     */
//     update3WeekSteps() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let dayWeek2 = this.dateWithoutDays(new Date(), 14);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(dayWeek2, i);
//             //if steps exist, then return date and value, if not return date and null.
//             let response = this.findStepsForDate(this.getFormatDate(dayXBefore));
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: null};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().valueQuantity.value};
//             }
//         }
//         //set the result in user entity
//         this.user.setSteps3Week(list);
//     }
//
//     /**
//     * update the steps of the user for all the days from 21 day before now to 28 days before now and stock them in the user entity.
//     */
//     update4WeekSteps() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let dayWeek2 = this.dateWithoutDays(new Date(), 21);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(dayWeek2, i);
//             //if steps exist, then return date and value, if not return date and null.
//             let response = this.findStepsForDate(this.getFormatDate(dayXBefore));
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: null};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().valueQuantity.value};
//             }
//         }
//         //set the result in user entity
//         this.user.setSteps4Week(list);
//     }
//
//     /**
//     * Format the date.
//     */
//     getFormatDate(date) {
//         var fullYear = new Date(date).getFullYear();
//         var month;
//         var day;
//         if (new Date(date).getDate() < 10) {
//             day = '0' + new Date(date).getDate();
//         } else {
//             day = new Date(date).getDate();
//         }
//         if (new Date(date).getMonth() < 10) {
//             month = '0' + (new Date(date).getMonth() + 1);
//         } else {
//             month = new Date(date).getMonth();
//         }
//         var dateFinal = fullYear + '-' + month + '-' + day;
//         return dateFinal;
//     }
//
//     /**
//     * Find the date from a date with a number of days before.
//     * @param fromDate the date from which the number of days will be diminued
//     * @param numberOfDays the number a of days to substract the the fromDate
//     *
//     * @return the date obtained
//     *
//     */
//     dateWithoutDays(fromDate, numberOfDays) {
//         return (d => new Date(d.setDate(d.getDate() - numberOfDays)))(new Date(fromDate));
//     }
//
//     /**
//     * update the Steps goal of the user in the last X days.
//     * @param days The number of days from now to search from.
//     * @param callback The function is returned only when it is completely executed.
//     */
//     updateLastXDaysStepsGoal(days, callback) {
//         let list = [];
//         days--;
//         //For each day
//         for (let i = 0; i <= days; i++) {
//             //find the day form now to i day before now
//             let dayXBefore = this.dateWithoutDays(new Date(), i);
//             //find the steps for this day
//             let response = this.findLastGoalFromDate(this.getFormatDate(dayXBefore));
//             //if steps exist, then return date and value, if not return date and null.
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: 10000};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().extension[0].extension[1].valueQuantity.value};
//             }
//
//         }
//         //update the 4 weeks before now
//         this.update1WeekStepsGoal();
//         this.update2WeekStepsGoal();
//         this.update3WeekStepsGoal();
//         this.update4WeekStepsGoal();
//         let response = this.findLastGoalFromDate(new Date());
//         //set the last goal in the user entity
//         if (typeof response !== 'undefined') {
//             this.user.setLastStepsGoal(response.toJson().extension[0].extension[1].valueQuantity.value);
//         }
//         this.user.setLastStepsGoalXDays(list);
//         callback();
//     }
//
//     /**
//     * update the steps goal of the user for all the days from now to a week before now and stock them in the user entity.
//     */
//     update1WeekStepsGoal() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let dayXBefore = this.dateWithoutDays(new Date(), i);
//             //find the steps for this day
//             let response = this.findLastGoalFromDate(this.getFormatDate(dayXBefore));
//             //if steps exist, then return date and value, if not return date and null.
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: 10000};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().extension[0].extension[1].valueQuantity.value};
//             }
//         }
//         this.user.set1WeekStepsGoal(list);
//     }
//     /**
//     * update the steps goal of the user for all the days from 7 day before now to 14 days before now and stock them in the user entity.
//     */
//     update2WeekStepsGoal() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let day7Before = this.dateWithoutDays(new Date(), 7);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(day7Before, i);
//             //if steps exist, then return date and value, if not return date and null.
//             let response = this.findLastGoalFromDate(this.getFormatDate(dayXBefore));
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: 10000};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().extension[0].extension[1].valueQuantity.value};
//             }
//         }
//         this.user.set2WeekStepsGoal(list);
//     }
//
//     /**
//     * update the steps goal of the user for all the days from 14 day before now to 21 days before now and stock them in the user entity.
//     */
//     update3WeekStepsGoal() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let day7Before = this.dateWithoutDays(new Date(), 14);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(day7Before, i);
//             //if steps exist, then return date and value, if not return date and null.
//             let response = this.findLastGoalFromDate(this.getFormatDate(dayXBefore));
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: 10000};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().extension[0].extension[1].valueQuantity.value};
//             }
//         }
//         this.user.set3WeekStepsGoal(list);
//     }
//
//     /**
//     * update the steps goal of the user for all the days from 21 day before now to 28 days before now and stock them in the user entity.
//     */
//     update4WeekStepsGoal() {
//         let list = [];
//         let days = 7;
//         //For each day
//         for (let i = 0; i < days; i++) {
//             //find the day form now to i day before now
//             let day7Before = this.dateWithoutDays(new Date(), 21);
//             //find the steps for this day
//             let dayXBefore = this.dateWithoutDays(day7Before, i);
//             //find the steps for this day
//             let response = this.findLastGoalFromDate(this.getFormatDate(dayXBefore));
//             //if steps exist, then return date and value, if not return date and null.
//             if (typeof response === 'undefined') {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: 10000};
//             } else {
//                 list['day' + (i + 1)] = {date: dayXBefore, value: response.toJson().extension[0].extension[1].valueQuantity.value};
//             }
//         }
//         this.user.set4WeekStepsGoal(list);
//     }
//
//     /**
//     * Find the steps for a date.
//     * @param date the date searched
//     */
//     findStepsForDate(date) {
//         let obj;
//         if (typeof this.steps !== 'undefined') {
//
//             for (let i = 0; i < this.steps.length; i++) {
//                 if (this.steps[i].toJson().effectiveDateTime === date) {
//                     obj = this.steps[i];
//                 }
//             }
//         }
//         return obj;
//     }
//
//     /**
//     * Find the last steps goal for a date.
//     * @param date the date searched
//     */
//     findLastGoalFromDate(date) {
//         let newResp = [];
//         if (typeof this.stepsGoals !== 'undefined') {
//             for (let i = 0; i < this.stepsGoals.length; i++) {
//                 if (new Date(this.stepsGoals[i].toJson().startDate) <= new Date(date)) {
//                     newResp.push(this.stepsGoals[i]);
//                 }
//             }
//             var obj = newResp.reduce(function (max, c) {
//                 return (max.toJson().startDate > c.toJson().startDate) ? max : c;
//             }, newResp[0]);
//         }
//         return obj;
//     }
//
//     /**
//     * Search all the steps goal in midata server
//     */
//     searchStepsGoals() {
//         return this.search('Goal', {patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     this.stepsGoals = response;
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last the Leukozytes related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateLeukozytes() {
//         return this.search('Observation', {code: 'http://loinc.org|6690-2', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastLeukozytes(obj.valueQuantity.value);
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                     this.user.setLastLeukozytesUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastLeukozytes('');
//                      this.user.setLastLeukozytesUnit('');
//                 }
//             }
//             );
//     }
//     /**
//     * Get the last the Thromobzytes related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//
//     updateThrombozytes() {
//         return this.search('Observation', {code: 'http://loinc.org|26515-7', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastThrombozytes(obj.valueQuantity.value);
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                     this.user.setLastThrombozytesUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastThrombozytes('');
//                      this.user.setLastThrombozytesUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last the CRP related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateCReactiveProtein() {
//         return this.search('Observation', {code: 'http://loinc.org|1988-5', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastCReactiveProtein(obj.valueQuantity.value);
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                     this.user.setLastCReactiveProteinUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastCReactiveProtein('');
//                      this.user.setLastCReactiveProteinUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last the Hemoglobin related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateHemoblobin() {
//         return this.search('Observation', {code: 'http://loinc.org|718-7', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastHemoglobin(obj.valueQuantity.value);
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                     this.user.setLastHemoglobinUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastHemoglobin('');
//                      this.user.setLastHemoglobinUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last the MG related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateMGradient() {
//         return this.search('Observation', {code: 'http://loinc.org|33358-3', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastMGradient(obj.valueQuantity.value);
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                     this.user.setLastMGradientUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastMGradient('');
//                      this.user.setLastMGradientUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last the KLR related to this user from midata.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateKappaLambdaRatio() {
//         return this.search('Observation', {code: 'http://loinc.org|15189-4', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastKappaLambdaRatio(obj.valueQuantity.value);
//                     this.user.setLastKappaLambdaRatioDate(obj.effectiveDateTime);
//                     this.user.setLastKappaLambdaRatioUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastKappaLambdaRatio('');
//                      this.user.setLastKappaLambdaRatioDate('');
//                      this.user.setLastKappaLambdaRatioUnit('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get The date of the last updated value of the labor values.
//     */
//     updateLastLaborDate() {
//         return this.search('Observation', {code: 'http://loinc.org|15189-4,http://loinc.org|33358-3,http://loinc.org|718-7,http://loinc.org|1988-5,http://loinc.org|26515-7,http://loinc.org|6690-2', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastLaborDate(obj.effectiveDateTime);
//                 }else {
//                      this.user.setLastLaborDate('');
//                 }
//             }
//             );
//     }
//
//     /**
//     * Get the last life quality value form midata server.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateLifeQuality() {
//         return this.search('Observation', {code: 'http://loinc.org|72098-7', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     let obj = this.sortArrayByEffectiveDateTime(response).toJson();
//                     this.user.setLastLifeQuality(obj.valueQuantity.value);
//                     this.user.setLastLifeQualityDate(obj.effectiveDateTime);
//                     this.user.setLastLifeQualityUnit(obj.valueQuantity.unit);
//                 }else {
//                      this.user.setLastLifeQuality('');
//                      this.user.setLastLifeQualityDate('');
//                      this.user.setLastLifeQualityUnit('');
//                 }
//             }
//             );
//     }
//     /**
//     * Get the last treatment value form midata server.
//     * @returns A mapped promise, which could be subscribe in another part of the application
//     */
//     updateTreatment() {
//         return this.search('Condition', {code: 'C91.0,C92.0', patient: this.getConnection().user.id})
//             .map(response => {
//                 if (response.length > 0) {
//                     if (response[0].code.coding[0].code === 'C91.0') {
//                         this.user.setLastTreatment('Lymphom');
//                     } else if (response[0].code.coding[0].code === 'C92.0') {
//                         this.user.setLastTreatment('Myelom');
//                     }
//                 }
//             }
//             );
//     }
//
//     /**
//     * Helper function, to sort all the values obtained in a response by effectiveDateTime.
//     * @returns the value sorted
//     */
//     sortArrayByEffectiveDateTime(array) {
//         return array.reduce(function (max, c) {
//             return max.toJson().effectiveDateTime > c.toJson().effectiveDateTime ? max : c;
//         }, array[0]);
//     }
// }
