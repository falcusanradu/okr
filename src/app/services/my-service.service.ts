import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class MyServiceService {
  itemList: AngularFireList<any> = null;
  // constructor(private firebase: AngularFireDatabase) {}

  // getData() {
  //   this.itemList = this.firebase.list("items");
  //   return this.itemList.snapshotChanges();
  // }

  // insertItem(item) {
  //   this.itemList.push({
  //     itemId: "myId",
  //     itemName: "itemName"
  //   });
  // }
}
