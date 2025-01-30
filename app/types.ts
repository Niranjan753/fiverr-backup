import { NextPage } from 'next';

export type BrandProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type BrandData = {
  name: string;
  products: BrandProduct[];
};

export type CategoryProduct = BrandProduct;
export type CategoryData = BrandData;
