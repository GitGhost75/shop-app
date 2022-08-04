import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

@Component({
	selector: "pm-star",
	templateUrl: "./star.component.html",
	styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges {
	cropWidth: number = 75;
	@Input() rating: number = 0;
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
	
	ngOnChanges(): void {
		this.cropWidth = this.rating * 75 / 5;
	}

	onClick(): void {
		console.log(`The rating ${this.rating} was clicked!`);
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
		
	}
}
