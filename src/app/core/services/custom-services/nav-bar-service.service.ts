import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareObjectsService {

 data:any;
 Show:BehaviorSubject<any>;
 constructor(){
  this.Show=new BehaviorSubject(this.data);

 }

 nextCount(value:any){
  this.Show.next(value)
 }
 
}