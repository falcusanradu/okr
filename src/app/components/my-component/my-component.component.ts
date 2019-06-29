import { Component, OnInit } from "@angular/core";
import { KeyResult, Risk } from "src/app/interfaces/interfaces";
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
  levelsOfConfidence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  defaultLevelOfConfidence = 1;
  keyResultList: KeyResult[] = [];
  keyResult: KeyResult = {
    id: 1,
    name: "",
    type: "",
    target: 0,
    levelOfConfidence: 1,
    result: 0
  };
  //  table T2
  riskList: Risk[] = [];
  risk: Risk = {
    id: 1,
    name: "",
    impact: "",
    likelihood: ""
  };
  impact = ["LOW", "MEDIUM", "High"];
  likeliHoods = ["UNLIKELY", "LIKELY", "VERY LIKELY"];

  constructor() {}

  ngOnInit() {}
  insertKeyResult() {
    // validations
    this.error = false;
    this.validate();
    if (!this.error) {
      if (!this.keyResult.type) {
        this.keyResult.type = "NUMERICAL";
      }
      this.keyResult.initialLevelOfConfidence = this.keyResult.levelOfConfidence;
      // execute
      this.keyResultList.push(this.keyResult);
      const lastElement: KeyResult = this.keyResultList[
        this.keyResultList.length - 1
      ];
      lastElement.result =
        lastElement.levelOfConfidence * lastElement.target * 0.1;

      //  reset
      this.keyResult = {
        id: this.initializeId(this.keyResultList),
        name: "",
        type: "",
        target: 0,
        levelOfConfidence: 1,
        result: 0
      };
      this.resetDropdowns();
    }
  }

  insertRisk() {
    // verify dropdown values
    this.verifyRiskDropdownValues();
    // execute
    // calculate score
    this.calculateScore(this.risk);

    this.riskList.push(this.risk);
    // modify level of confidence
    this.updateLevelOfConfidence(this.risk);
    // reset
    this.risk = {
      id: this.initializeId(this.riskList),
      name: "",
      impact: "",
      likelihood: ""
    };
    this.resetDropdowns();
  }

  // private updateLevelOfConfidence(): void {
  //   this.keyResultList.forEach(ks => {
  //     if (
  //       this.risk.keyResultimpacted &&
  //       ks.id === this.risk.keyResultimpacted.id
  //     ) {
  //       ks.levelOfConfidence =
  //         ks.levelOfConfidence - this.substractValueFromScore(this.risk.score);
  //       if (ks.levelOfConfidence < 1) {
  //         ks.levelOfConfidence = 1;
  //       }
  //       if (ks.levelOfConfidence > 9) {
  //         ks.levelOfConfidence = 9;
  //       }
  //       ks.result = ks.levelOfConfidence * ks.target * 0.1;
  //     }
  //   });
  // }

  private updateLevelOfConfidence(risk: Risk): void {
    this.keyResultList.forEach(ks => {
      if (
        risk.keyResultimpacted &&
        ks.id === risk.keyResultimpacted.id
      ) {
        ks.levelOfConfidence =
          ks.levelOfConfidence - this.substractValueFromScore(risk.score);
        if (ks.levelOfConfidence < 1) {
          ks.levelOfConfidence = 1;
        }
        if (ks.levelOfConfidence > 9) {
          ks.levelOfConfidence = 9;
        }
        ks.result = ks.levelOfConfidence * ks.target * 0.1;
      }
    });
  }


  // private calculateScore() {
  //   const result =
  //     this.convertImpactAndLikelihoodToNumbers(this.risk.impact) +
  //     this.convertImpactAndLikelihoodToNumbers(this.risk.likelihood);
  //   let score;
  //   if (result <= 3) {
  //     score = "Low";
  //   } else if (result === 4) {
  //     score = "Medium";
  //   } else {
  //     score = "High";
  //   }
  //   this.risk.score = score;
  // }

  private calculateScore(risk: Risk): Risk {
    const result =
      this.convertImpactAndLikelihoodToNumbers(risk.impact) +
      this.convertImpactAndLikelihoodToNumbers(risk.likelihood);
    let score;
    if (result <= 3) {
      score = "Low";
    } else if (result === 4) {
      score = "Medium";
    } else {
      score = "High";
    }
    risk.score = score;
    return risk;
  }

  private substractValueFromScore(value: string) {
    let scoreValue = 0;
    if (value === "Low") {
      scoreValue = 1;
    } else if (value === "Medium") {
      scoreValue = 2;
    } else if (value === "High") {
      scoreValue = 3;
    }
    return scoreValue;
  }

  selectLevelOfConfidence(event) {
    this.keyResult.levelOfConfidence = event.target.selectedIndex + 1;
  }

  selectType(event) {
    this.keyResult.type = event.target.selectedIndex;
  }

  selectImpactedKeyResults(event) {
    const keyResultimpacted: KeyResult = this.keyResultList.find(ks => {
      return ks.id === event.target.selectedIndex + 1;
    });
    this.risk.keyResultimpacted = keyResultimpacted;
  }

  selectImpact(event) {
    this.risk.impact = event.target.value;
  }

  selectLikelihood(event) {
    this.risk.likelihood = event.target.value;
  }

  selectEditableImpact(event, risk: Risk) {
    risk.impact = event.target.value;
    risk.keyResultimpacted.levelOfConfidence = risk.keyResultimpacted.initialLevelOfConfidence;
    risk = this.calculateScore(risk);
    this.updateLevelOfConfidence(risk);
  }

  selectEditableLikelihood(event, risk: Risk) {
    risk.likelihood = event.target.value;
    risk.keyResultimpacted.levelOfConfidence = risk.keyResultimpacted.initialLevelOfConfidence;
    risk = this.calculateScore(risk);
    this.updateLevelOfConfidence(risk);
  }

  private verifyRiskDropdownValues(): void {
    if (this.keyResultList.length > 0 && !this.risk.keyResultimpacted) {
      this.risk.keyResultimpacted = this.keyResultList[0];
    }
    if (this.keyResultList.length < 1) {
      this.risk.keyResultimpacted = undefined;
    }
    if (!this.risk.impact) {
      this.risk.impact = this.impact[0];
    }
    if (!this.risk.likelihood) {
      this.risk.likelihood = this.likeliHoods[0];
    }
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

  private resetDropdowns(): void {
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach(dd => {
      dd.selectedIndex = 0;
    });
  }

  private initializeId(items: any[]): number {
    let id = 1;
    const lastId: number = items[items.length - 1].id;
    if (lastId) {
      id = Number(lastId) + 1;
    }
    return id;
  }

  private convertImpactAndLikelihoodToNumbers(value: string): number {
    if (value === "LOW" || value === "UNLIKELY") {
      return 1;
    }
    if (value === "MEDIUM" || value === "LIKELY") {
      return 2;
    }
    if (value === "High" || value === "VERY LIKELY") {
      return 3;
    }
  }

  addClasses(value: KeyResult | Risk) {
    const classes = {
      colorRed: this.isRed(value),
      colorOrange: this.isOrange(value),
      colorGreen: this.isGreen(value)
    };
    return classes;
  }

  private isGreen(value: any): boolean {
    if (value.levelOfConfidence) {
      if (value.levelOfConfidence > 6) {
        return true;
      }
    }
    if (value.score) {
      if (value.score === "Low") {
        return true;
      }
    }
    return false;
  }

  private isOrange(value: any): boolean {
    if (value.levelOfConfidence) {
      if (value.levelOfConfidence >= 4 && value.levelOfConfidence <= 6) {
        return true;
      }
    }
    if (value.score) {
      if (value.score === "Medium") {
        return true;
      }
    }
    return false;
  }

  private isRed(value: any): boolean {
    if (value.levelOfConfidence) {
      if (value.levelOfConfidence <= 3) {
        return true;
      }
    }
    if (value.score) {
      if (value.score === "High") {
        return true;
      }
    }
    return false;
  }
}
