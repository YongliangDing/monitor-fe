export interface IEchartsCommonData {
  xAxisData: string[] | number[];
  legendData?: string[];
  seriesData1: number[];
  seriesData2?: number[];
}

export interface IPieSeriesData {
  value: number;
  name: string;
}

export interface IEchartsPieData {
  legendData: string[] | number[];
  seriesData: IPieSeriesData[];
}

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

export interface IAggregateResult {
  _id: string | number;
  total: number;
}

export interface IEchartsNestedPiesData {
  countByName: IAggregateResult[];
  countByVersion: CountByVersion[];
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
