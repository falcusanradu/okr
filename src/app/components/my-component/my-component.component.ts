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
  error = false;
  // table T1
  types = ["NUMERICAL"];
  levelsOfConfidence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  defaultLevelOfConfidence = 0;
  keyResultList: KeyResult[] = [];
  keyResult: KeyResult = {
    id: 1,
    name: "",
    type: "",
    target: 0,
    levelOfConfidence: 0,
    result: 0
  };

  constructor() { }

  ngOnInit() { }
  insert() {
    this.error = false;
    this.validate();
    if (!this.error) {
      this.keyResult.type = "NUMERICAL";
      this.keyResultList.push(this.keyResult);
      const lastElement: KeyResult = this.keyResultList[this.keyResultList.length - 1];
      lastElement.result = lastElement.levelOfConfidence * lastElement.target * 0.1;

      //  reset
      let resetId = 1;
      const lastId: number = this.keyResultList[this.keyResultList.length - 1].id;
      if (lastId) {
        resetId = Number(lastId) + 1;
      }
      this.keyResult = {
        id: resetId,
        name: "",
        type: "",
        target: 0,
        levelOfConfidence: 0,
        result: 0
      };
    }
  }
  selectLevelOfConfidence(event) {
    this.keyResult.levelOfConfidence = event.target.selectedIndex;
  }

  selectType(event) {
    this.keyResult.type = event.target.selectedIndex;
  }

  private validate() {
    if (this.keyResult.target < 0) {
      this.error = true;
    }
    this.keyResultList.forEach(kr => {
      if (Number(kr.id) === Number(this.keyResult.id)) {
        this.error = true;
      }
    });
  }

}
