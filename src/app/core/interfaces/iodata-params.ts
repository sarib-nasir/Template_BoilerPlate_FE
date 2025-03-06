export interface IODataParams {
  selects?: string[];
  filter?: string;
  orderBy?: string[];
  top?: number;
  skip?: number;
  expand?: string;
}
