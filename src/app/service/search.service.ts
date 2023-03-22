import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  
  getProduct(search:string){
    return this.http.get("http://localhost/api_rest/public/api/produit/"+search)
  }
}
