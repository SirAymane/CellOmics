import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { PaginatedProducts } from '../model/PaginatedProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiBaseUrl: string = 'http://localhost:3000/api/products'; // URL to the backend API
  apiUrl: any;

  constructor(private http: HttpClient) {
    this.apiUrl = this.apiBaseUrl; // Initialize apiUrl with the base URL
  }

  // Fetch all products from the backend
  public getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiBaseUrl);
  }

  // Fetch a single product by its id
  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/${productId}`);
  }

  // Add a new product
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiBaseUrl, product);
  }

  // Update an existing product
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiBaseUrl}/${product.id}`, product);
  }

  // Delete a product
  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${productId}`);
  }

  // Method to get a specific page of products based on pagination settings
  getPaginatedProducts(page: number, limit: number): Observable<PaginatedProducts> {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<PaginatedProducts>(url);
  }

  // Method to calculate the total number of pages based on items per page
  // This is something your backend should calculate and send as part of the response metadata
  public getTotalPages(itemsPerPage: number): Observable<number> {
    return this.http.get<number>(`${this.apiBaseUrl}/totalPages?itemsPerPage=${itemsPerPage}`);
  }
}
