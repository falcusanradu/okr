import { Component, OnInit } from "@angular/core";
import { KeyResult } from "src/app/interfaces/interfaces";
// import { MyServiceService } from "src/app/services/my-service.service";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.scss"]
})
export class MyComponentComponent implements OnInit {
  // objective, quarter, year
  objective = "give me an objective";
  quarters = ["q1", "q2", "q3", "q4"];
  year = "2019";
  // table T1
  keyResultList: KeyResult[] = [];
  keyResult: KeyResult = {
    id: 1,
    name: "",
    type: "",
    target: "",
    levelOfConfidence: 1,
    result: 0
  };

  constructor() {}

  ngOnInit() {}
  insert() {
    console.log(this.keyResultList);
    this.keyResultList.push(this.keyResult);
    this.keyResult = {
      id: 1,
      name: "",
      type: "",
      target: "",
      levelOfConfidence: 1,
      result: 0
    };
  }
}

const resetObject = {
  id: 1,
  name: "",
  type: "",
  target: "",
  levelOfConfidence: 1,
  result: 0
};
