export interface IProductDetails {
  status: number;
  imgs: string[];
  _id: string;
  name: string;
  desc: string;
  price: number;
  detail: string;
  pCategoryId: string;
  categoryId: string;
}

export interface IPageInfo {
  pageNum: number;
  total: number;
  pages: number;
  pageSize: number;
  list: IProductDetails[];
}