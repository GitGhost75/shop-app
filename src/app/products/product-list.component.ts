import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, observable, Subscription } from "rxjs";
import { IProduct } from "./product";
import { IProductsPaged } from "./pagedProducts";
import { ProductService } from "./product.service";

@Component({
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {


	constructor(private productService: ProductService) {

	}

	//_products: IProduct[] = [];
	//p = {} as IProductsPaged;
	pagedProducts : IProductsPaged | undefined;
	//pagedProducts = {} as IProductsPaged ;
	pageTitle: string = "Product List";
	imageWidth: number = 30;
	imageMargin: number = 2;
	showImage: boolean = false;
	private _listFilter: string = "";
	filteredProducts: IProduct[] = [];
	clickedRating: string = "";
	errorMessage: string = "";
	sub!: Subscription;
	size: number = 3;
	first: boolean = true;
	last: boolean = false;

	get listFilter(): string {
		return this._listFilter;
	}

	set listFilter(value: string) {
		this._listFilter = value;
		console.log("In setter:" + this._listFilter);
		this.filteredProducts = this.performFilter(value);
	}

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.pagedProducts?.products?.filter((product: IProduct) => product?.productName.toLocaleLowerCase().includes(filterBy));
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void {
		this.loadData(0);
		this.listFilter = "";
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe;
	}
	onRatingClicked(message: string): void {
		console.log('notified: ' + message);
		this.clickedRating = ": " + message;
	}

	previous(): void {
		console.log('show previous page');
		this.loadData(this.pagedProducts.currentPage - 1);
	}

	next(): void {
		console.log('show next page');
		this.loadData(this.pagedProducts.currentPage + 1);
	}

	loadData(page: number): void {
		this.sub = this.productService.getProductsPaged(page, this.size).subscribe({
			next: pagedProducts => {
				this.pagedProducts = pagedProducts;
				//this.products = pagedProducts.products;
				this.filteredProducts = this.pagedProducts.products;
				this.first = this.pagedProducts.currentPage == 0;
				this.last = this.pagedProducts.currentPage == this.pagedProducts.totalPages - 1;
				this.performFilter(this._listFilter);
			}, error: err => this.errorMessage = err

			//			products => {
			//				this.products = products;
			//				this.filteredProducts = this.products;
			//			}, error: err => this.errorMessage = err
		});
	}
}
