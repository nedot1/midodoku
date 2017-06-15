import { Component, NgZone} from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { Midata } from 'midata';
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

          // initialize clean array
          // here we will store our summarised entries...
          let entries = [];

  }

  ionViewWillEnter(){
    // invoke this.update on ViewWillEnter hook
    this.update();
  }

  private update(){
    // @wya3
    // NOTE: this approach ought not be used generally as it serves the current needs 
    // (display of records in a consolidated manner)
    // TODO: Query the api accordingly...
    this.midataService.getMidata().search('Observation', {_sort : "effectiveDateTime"}).then((resources : any)=> {
        this.ngZone.run(() => {

          // some variables for convenience...
          this.entries = [];
          let iMin = 0;
          let iMax = 9;
          let spliced = [];

          for(var _i = 0; _i < (resources.length / 9); _i++){
              spliced.push(resources.slice(iMin, iMax));
              iMin = iMin + 9;
              iMax = iMax + 9;
            }

              console.log("Spliced array:");
              console.log(spliced);

              for (var _i = 0; _i < spliced.length; _i++){

            // definition of skeleton...
            // this will temporarily hold our entries..
            var arrayEntry : any = {
              _date : Date,
              date: "string",
              painLocation: "string",
              painSensation: "string",
              painValue: 0,
              activity: 0,
              mood: 0,
              walkingAbility: 0,
              work: 0,
              socialLife: 0,
              sleep: 0,
              enjoyment: 0,
              score: 0
            };
            
              for(var _j = 0; _j < spliced[_i].length; _j++){
              
              // finally on the object...

              // timestamp is always the same in here, we can neglect the allocation
              var resourceDate = new Date(spliced[_i][_j].toJson().effectiveDateTime);
              this.day = resourceDate.getDate();
              this.day = this.day <= 9 ? "0" + this.day : this.day;
              this.month = resourceDate.getMonth()+1;
              this.month = this.month <= 9 ? "0" + this.month : this.month;
              this.year = resourceDate.getFullYear();
              this.hours = resourceDate.getHours() + -2;
              this.minutes = resourceDate.getMinutes();
              this.minutes = this.minutes <= 9 ? "0" + this.minutes : this.minutes;

              // hidden _date value, this value is only used in order to sort the array
              // it won't be displayed
              arrayEntry._date = resourceDate;

              // the date to display...
              arrayEntry.date = this.day + "." + this.month + "." + this.year + ", " + this.hours +":"+ this.minutes

              // fetch and allocate entries to the skeleton according to their codes

                if(spliced[_i][_j].toJson().code.coding[0].code === "77566-8"){
                  console.log("found 77566-8 // activity");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.activity = spliced[_i][_j].toJson().valueQuantity.value;
                  }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77572-6"){
                  console.log("found 77572-6 // enjoyment");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.enjoyment = spliced[_i][_j].toJson().valueQuantity.value;
                  }
              }
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77567-6"){
                  console.log("found 77567-6 // mood");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.mood = spliced[_i][_j].toJson().valueQuantity.value;
                  }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77571-8"){
                  console.log("found 77571-8 //  sleep");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.sleep = spliced[_i][_j].toJson().valueQuantity.value;
                  }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77568-4"){
                  console.log("found 77568-4 // walkingAbility");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.walkingAbility = spliced[_i][_j].toJson().valueQuantity.value;
                  }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77569-2"){
                  console.log("found 77569-2 // work ");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.work = spliced[_i][_j].toJson().valueQuantity.value;
                }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "77570-0"){
                  console.log("found 77570-0 // socialLife");
                  if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                  arrayEntry.socialLife = spliced[_i][_j].toJson().valueQuantity.value;
                }  
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "410720000"){
                 console.log("found 410720000 (SNOMED CT) // painLocation & painSensation");
                    if(spliced[_i][_j].toJson().bodySite && spliced[_i][_j].toJson().bodySite.coding[0].display){
                    arrayEntry.painLocation = spliced[_i][_j].toJson().bodySite.coding[0].display;
                    }
                    if(spliced[_i][_j].toJson().component && spliced[_i][_j].toJson().component[0].code.coding){
                    var painSensation: string = ""
                      for(let code of spliced[_i][_j].toJson().component){
                      painSensation = painSensation + " " + code.code.coding[0].display;
                    }
                    arrayEntry.painSensation = painSensation;
                    }
              } 
                else if(spliced[_i][_j].toJson().code.coding[0].code === "72514-3"){
                console.log("found 72514-3 // painValue");
                if(spliced[_i][_j].toJson().valueQuantity && spliced[_i][_j].toJson().valueQuantity.value){
                arrayEntry.painValue = spliced[_i][_j].toJson().valueQuantity.value
              }
          }

      } // inner loop closure

      // score value
      arrayEntry.score = Math.round((arrayEntry.activity + 
                          arrayEntry.mood + 
                          arrayEntry.walkingAbility + 
                          arrayEntry.work + 
                          arrayEntry.socialLife + 
                          arrayEntry.sleep + 
                          arrayEntry.enjoyment) / 7);

      

      // push the array entry into the entries 
      this.entries.push(arrayEntry);
      

  } // outer loop closure

    // finally, sort the array so it is displayed chronologically...
    console.log("The unsorted array:");
    console.log(this.entries);
    this.entries.sort((a,b) => { return new Date(b._date).getTime() - new Date(a._date).getTime() });
    console.log("The sorted one:");
    console.log(this.entries);
  })
  })
  }

}