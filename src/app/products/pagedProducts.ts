import { IProduct } from "./product";

export interface IProductsPaged {
	products: IProduct[];
	currentPage: number;
	totalItems: number;
	totalPages: number;
}