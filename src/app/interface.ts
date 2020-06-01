export interface INameValue {
  value: number;
  name: string;
}

export interface IPieData {
  legendData?: string[];
  seriesData: INameValue[];
}

export interface IBLData {
  legendData?: string[];
  xAxisData: string[];
  seriesData1: number[];
  seriesData2?: number[];
}

export interface INestedPies {
  innerData: INameValue[];
  outerData: INameValue[];
}