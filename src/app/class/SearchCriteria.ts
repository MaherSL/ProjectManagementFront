import { OpCriteria } from "./OpCriteria";
export class SearchCriteria {
  key: string;
  operation: OpCriteria;
  value: any;

  constructor(key_?: string, operation_?: OpCriteria, value_?: any) {
    this.key = key_;
    this.operation = operation_;
    this.value = value_;


  }
}

