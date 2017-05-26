// import {Injectable} from '@angular/core';
// import {Midata} from 'Midata';
// import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";
// import {Events, Platform} from "ionic-angular";
// import {Network} from "@ionic-native/network";
//
//
// /*
//  I4MI - Adrian Wyss, 18.05.2017, contact: adrianroman.wyss@bfh.ch
//  */
//
// @Injectable()
// export class MidataWrapper {
//
//     protected midata: Midata;
//     protected secureStorage: SecureStorage;
//     protected platform: Platform;
//     protected network: Network;
//     protected events: Events;
//
//     constructor(midataObject: Midata, secureStorage: SecureStorage, platform: Platform, events: Events, network: Network) {
//         this.midata = midataObject;
//         this.secureStorage = secureStorage;
//         this.platform = platform;
//         this.events = events;
//         this.network = network;
//         this._init();
//     }
//
//     getConnection() {
//         return this.midata;
//     }
//
//     setConnection(connection) {
//         this.midata = connection;
//     }
//
//     authenticate(): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this.midata.authenticate().then((msg) => {
//                 this._setRefreshToken(msg.refresh_token).then((msg) => {
//                     resolve(msg)
//                 })
//             }).catch((err) => {
//                 reject(err);
//             })
//         })
//     }
//
//     refresh(): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this._getRefreshToken().then((refreshToken) => {
//                 this.midata.refresh(refreshToken).then((msg) => {
//                     this._setRefreshToken(msg.refresh_token).then((msg) => {
//                         resolve(msg)
//                     })
//                 }).catch((err) => {
//                     reject(err);
//                 })
//             },
//                 (err) => {
//                     reject(err);
//                 });
//         })
//     }
//
//     private _setRefreshToken(refreshToken: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this.secureStorage.create('MIDATA_CONNECTION_SERVICE')
//                 .then((storage: SecureStorageObject) => {
//                     storage.set('refreshToken', refreshToken)
//                         .then(
//                         data => resolve(data),
//                         error => reject(error)
//                         );
//                 }).catch((err) => {
//                     reject(err);
//                 })
//         })
//     }
//
//     private _getRefreshToken(): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this.secureStorage.create('MIDATA_CONNECTION_SERVICE')
//                 .then((storage: SecureStorageObject) => {
//                     storage.get('refreshToken')
//                         .then(
//                         data => resolve(data),
//                         error => reject(error)
//                         );
//                 }).catch((err) => {
//                     reject(err);
//                 })
//         })
//     }
//
//     logout(): Promise<any> {
//         this.getConnection().logout()
//         return new Promise((resolve, reject) => {
//             this.secureStorage.create('MIDATA_CONNECTION_SERVICE')
//                 .then((storage: SecureStorageObject) => {
//                     storage.remove('refreshToken')
//                         .then(
//                         data => resolve(data),
//                         error => reject(error)
//                         );
//                 }).catch((err) => {
//                     reject(err);
//                 })
//         })
//     }
//
//     syncSecureStorage(): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this._setRefreshToken(this.getConnection().refreshToken).then((msg) => {
//                 resolve("Token set: " + msg);
//             }).catch((err) => {
//                 reject(err);
//             })
//         })
//     }
//
//     private _init() {
//         this.platform.resume.subscribe(e => {
//             this._onResume();
//         });
//         this.platform.pause.subscribe(e => {
//             this._onPause();
//         })
//
//         let connectSubscription = this.network.onConnect().subscribe(() => {
//             this.events.publish('network:available', "Network available");
//         })
//
//         let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
//             this.events.publish('network:unavailable', "Network not available");
//         });
//
//
//     }
//
//     private _onResume() {
//         this.events.publish('application:resumed', "Application resumed");
//     }
//
//     private _onPause() {
//         this.events.publish('application:paused', "Application paused");
//     }
// }
