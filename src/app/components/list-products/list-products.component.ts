import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { PaginatedProducts } from 'src/app/model/PaginatedProducts';
import { ProductServiceService } from '../../services/products-services.service';
import { UsersServiceService } from '../../services/users-service.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterQuery: string = '';
  isAdmin: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  private userSub: Subscription | null = null;
  favoriteStatus: { [productId: number]: boolean } = {};

  constructor(
    private productService: ProductServiceService,
    private userService: UsersServiceService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.isAdmin = !!(user && user.role === 'admin');
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  loadProducts(): void {
    // Ensure that currentPage and itemsPerPage are passed as query parameters
    this.productService.getPaginatedProducts(this.currentPage, this.itemsPerPage).subscribe(
      (data: PaginatedProducts) => {
        this.products = data.products; 
        this.totalItems = data.totalItems; 
        this.applyFilter();
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }
  
  
  
  
  applyFilter(): void {
    const query = this.filterQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    );
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts(); // Reload products to reflect the change
    });
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  changeItemsPerPage(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.loadProducts(); // Reload products based on the new itemsPerPage value
  }

  

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
  


  loadFavorites(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Reset favorite status map
    this.favoriteStatus = favorites.reduce((acc: { [id: number]: boolean }, id: number) => {
      acc[id] = true;
      return acc;
    }, {});
  }

  toggleFavorite(product: Product): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(product.id);

    if (index > -1) {
      favorites.splice(index, 1); // Remove from favorites
      this.favoriteStatus[product.id] = false;
    } else {
      favorites.push(product.id); // Add to favorites
      this.favoriteStatus[product.id] = true;
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

