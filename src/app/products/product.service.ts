import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { IProduct } from "./product";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IProductsPaged } from "./pagedProducts";

@Injectable({ providedIn: 'root' })
export class ProductService {

	private productUrl = 'http://localhost:8080/api/product';//'api/products/products.json';

	constructor(private http: HttpClient) { }

//	getProducts(page: number, size: number): Observable<IProduct[]> {
//
//		return this.http.get<IProduct[]>(this.productUrl, { params: {page:page, size:size} }).pipe(
//			tap(data => console.log('All: ', JSON.stringify(data))), catchError(this.handleError)
//		);
//	}

	getProductsPaged(page: number, size: number): Observable<IProductsPaged> {

		return this.http.get<IProductsPaged>(this.productUrl, { params: {page:page, size:size} }).pipe(
			tap(data => console.log('All: ', JSON.stringify(data))), catchError(this.handleError)
		);
	}
	
	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occured: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(() => errorMessage);
	}
}