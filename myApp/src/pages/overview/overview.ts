import { Component, NgZone} from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { Midata } from 'midata';
let midata : Midata;
import {MidataService} from '../../providers/MidataService';


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  entries: Array<{ _date: Date, date: string, painLocation: string, painSensation: string, painValue: string,
  activity: string, mood: string, walkingAbility: string, work: string, socialLife: string, sleep: string,
  enjoyment: string, score: string
  }>;

  day: any;
  month: any;
  year: any;
  hours: any;
  minutes: any;
  seconds: any;

constructor(public navCtrl: NavController, private ngZone: NgZone, private midataService: MidataService) {

  }


  ionViewWillEnter(){
    this.update();
  }


  update(){
      this.midataService.getMidata().search('Observation', {_sort : "effectiveDateTime"}).then((resources : any)=> {
        this.ngZone.run(() => {

          // CLEAR ARRAY
          this.entries = [];

          console.log(resources);

          // GO THROUGH OBJECT
          for(let resource of resources){

            console.log(resource);
            console.log(resource.toJson().effectiveDateTime);
            console.log(resource.toJson().code.coding[0].code);


            var resourceDate = new Date(resource.toJson().effectiveDateTime);

            this.day = resourceDate.getDate();
            this.day = this.day <= 9 ? "0" + this.day : this.day;

            this.month = resourceDate.getMonth()+1;
            this.month = this.month <= 9 ? "0" + this.month : this.month;

            this.year = resourceDate.getFullYear();
            this.hours = resourceDate.getHours();
            this.minutes = resourceDate.getMinutes();
            this.minutes = this.minutes <= 9 ? "0" + this.minutes : this.minutes;

            //this.seconds = resourceDate.getSeconds();
          //  this.seconds = this.seconds <= 9 ? "0" + this.seconds : this.seconds;

            var arrayEntry : any = {
              _date : this.year + "." + this.month + "." + this.day + " " + this.hours + ":" + this.minutes,
              date: this.day + "." + this.month + "." + this.year + " " + this.hours + ":" + this.minutes,
              painLocation: "string",
              painSensation: "string",
              painValue: "string",
              activity: -1,
              mood: -1,
              walkingAbility: -1,
              work: -1,
              socialLife: -1,
              sleep: -1,
              enjoyment: -1,
              score: "string"
            };


            if(resource.toJson().code.coding[0].code === "77566-8"){
              console.log("Aktivität gefunden");
              // activity
              if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                arrayEntry.activity = resource.toJson().valueQuantity.value;
              } else {
                //arrayEntry.activity = -1;
              }
            } else if(resource.toJson().code.coding[0].code === "77572-6"){
                          console.log("Lebensfreude gefunden");
                          // enjoyment
                          if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                            arrayEntry.enjoyment = resource.toJson().valueQuantity.value;
                          } else {
                            //arrayEntry.activity = -1;
                          }
                        } else if(resource.toJson().code.coding[0].code === "77567-6"){
                                      console.log("Laune gefunden");
                                      // enjoyment
                                      if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                        arrayEntry.mood = resource.toJson().valueQuantity.value;
                                      } else {
                                        //arrayEntry.activity = -1;
                                      }
                                    } else if(resource.toJson().code.coding[0].code === "77571-8"){
                                                  console.log("Schlafen gefunden");
                                                  // enjoyment
                                                  if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                                    arrayEntry.sleep = resource.toJson().valueQuantity.value;
                                                  } else {
                                                    //arrayEntry.activity = -1;
                                                  }
                                                } else if(resource.toJson().code.coding[0].code === "77568-4"){
                                                              console.log("Gehen gefunden");
                                                              // enjoyment
                                                              if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                                                arrayEntry.walkingAbility = resource.toJson().valueQuantity.value;
                                                              } else {
                                                                //arrayEntry.activity = -1;
                                                              }
                                                            } else if(resource.toJson().code.coding[0].code === "77569-2"){
                                                                          console.log("Normal arbeiten gefunden");
                                                                          // enjoyment
                                                                          if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                                                            arrayEntry.work = resource.toJson().valueQuantity.value;
                                                                          } else {
                                                                            //arrayEntry.activity = -1;
                                                                          }
                                                                        } else if(resource.toJson().code.coding[0].code === "77570-0"){
                                                                                      console.log("andere Leute gefunden");
                                                                                      // enjoyment
                                                                                      if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                                                                        arrayEntry.socialLife = resource.toJson().valueQuantity.value;
                                                                                      } else {
                                                                                        //arrayEntry.activity = -1;
                                                                                      }
                                                                                    } else if(resource.toJson().code.coding[0].code === "410720000"){

                                                                                                  console.log("Sensation gefunden");

                                                                                                  // enjoyment
                                                                                                  if(resource.toJson().bodySite && resource.toJson().bodySite.coding[0].display){
                                                                                                    arrayEntry.painLocation = resource.toJson().bodySite.coding[0].display;
                                                                                                  }
                                                                                                  if(resource.toJson().component && resource.toJson().component[0].code.coding){
                                                                                                    var painSensation: string = ""
                                                                                                    for(let code of resource.toJson().component[0].code.coding){
                                                                                                      painSensation = painSensation + " " + code.display;
                                                                                                    }
                                                                                                    arrayEntry.painSensation = painSensation;
                                                                                                  }
                                                                                                } else if(resource.toJson().code.coding[0].code === "72514-3"){
                                                                                                              console.log("Schmerzstärke gefunden");
                                                                                                              if(resource.toJson().valueQuantity && resource.toJson().valueQuantity.value){
                                                                                                                arrayEntry.painValue = resource.toJson().valueQuantity.value

                                                                                                            }
                                                                                                          }


            this.entries.push(arrayEntry);
        //    console.log(this.entries);
            }

            var consolidatedArray : any = {
              _date : this.year + "." + this.month + "." + this.day + " " + this.hours + ":" + this.minutes,
              date: this.day + "." + this.month + "." + this.year + " " + this.hours + ":" + this.minutes,
              painLocation: "string",
              painSensation: "string",
              painValue: "string",
              activity: -1,
              mood: -1,
              walkingAbility: -1,
              work: -1,
              socialLife: -1,
              sleep: -1,
              enjoyment: -1,
              score: "string"
            };




/*
            this.entries.push({
                date: this.day +"."+this.month+"."+this.year + " " + this.hours + ":" + this.minutes,
                painLocation: 'Fuss links ',
                painSensation: 'Brennend',
                painValue: resource.toJson().valueQuantity.value,
                activity: '5',
                mood: '5',
                walkingAbility: '5',
                work: '5',
                socialLife: '5',
                sleep: '5',
                enjoyment: '5',
                score: '5'
            });}*/



        });
      });
  }

}
