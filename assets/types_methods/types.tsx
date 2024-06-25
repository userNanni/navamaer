export interface pointsTypes {
  [key: string]: any;
  collectionId: string;
  collectionName: string;
  created: string;
  escola: string;
  id: string;
  modalidade: string;
  pontos: number;
  updated: string;
}
export interface escolasTypes {
  [key: string]: any;
  id: number;
  name: string;
  pointsTotal: number;
}

export interface newsTypes {
  [key: string]: any;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  topic: string;
  title: string;
  img: string;
  author: string;
  body: any;
  updated: string;
}

export function compare(a: escolasTypes, b: escolasTypes) {
  if (a.pointsTotal < b.pointsTotal) {
    return 1;
  }
  if (a.pointsTotal > b.pointsTotal) {
    return -1;
  }
  return 0;
}
