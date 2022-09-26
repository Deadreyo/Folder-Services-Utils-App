export type oldFile = {
  name: string;
  path: string;
  date: Date;
};

export type bigFile = {
  name: string;
  path: string;
  size: number;
};

export type compressStatistic = {
  name: string;
  before: string;
  after: string;
}

export type searchFile = {
  name: string,
  path: string
}
