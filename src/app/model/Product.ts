export class Product {
	id: number;
	name: string;
	description: string;
	image: string; 
	price: number;
	category: string;
	favorite: boolean;
  
	constructor(
	  id: number,
	  name: string,
	  description: string,
	  image: string,
	  price: number,
	  category: string,
	  favorite: boolean
	) {
	  this.id = id;
	  this.name = name;
	  this.description = description;
	  this.image = image;
	  this.price = price;
	  this.category = category;
	  this.favorite = favorite;
	}
  }
  