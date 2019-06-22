import { NumberValueAccessor } from "@angular/forms";

export interface KeyResult {
  id: number;
  name: string;
  type: string;
  target: number;
  levelOfConfidence: number;
  result: number;
}

export interface Risk {
  id: number;
  name: string;
  keyResultimpacted?: KeyResult;
  impact: string;
  likelihood: string;
  score?: string;
}
