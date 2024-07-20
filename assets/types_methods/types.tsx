import { ImageSourcePropType } from "react-native";

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
  imageSource: ImageSourcePropType;
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
  publicacao: any;
  subtitle: any;
}

export interface sportsTypes {
  [key: string]: any;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  modalidade: string;
  prova: string;
  coletivo: boolean;
  resultados: resultados[];
  updated: string;
}

export interface resultados {
  [key: string]: any;
  id: number;
  nome: string;
  escola: string;
  resultado: string;
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
