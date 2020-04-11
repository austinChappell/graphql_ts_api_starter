export interface QueryParams {
  [key: string]: any;
  page: number;
  pageSize: number;
}

export interface BaseType {
  id: string;
  label: string;
}

export interface BaseTypeInt {
  id: number;
  label: string;
}
