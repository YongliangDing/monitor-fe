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

export interface StrAndNum {
  _id: string;
  total: number;
}

interface NameVersion {
  name?: string;
  version?: string;
}

export interface CountByVersion {
  _id: NameVersion;
  total: number;
}

export interface INameVersion {
  countByName: StrAndNum[];
  countByVersion: CountByVersion[];
}
