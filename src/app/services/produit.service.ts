import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

item=new BehaviorSubject(1);

  counter=1;

 

  constructor(private httpclt:HttpClient) { 

    this.item.subscribe(

      (x)=>{
        this.counter=x;
      }

    )

  }

  onIncrement()
  {
    this.item.next(this.item.getValue()+1);
  }
  onsubstraction()
  {
    this.item.next(this.item.getValue()-1);
  }
  getAllproduit():Observable<Produit[]>
  {
    
    return this.httpclt.get<Produit[]>("http://localhost:3000/products");
  }
  deleteproduit(id: number): Observable<Produit> {
    const url = `http://localhost:3000/products/${id}`;
    return this.httpclt.delete<Produit>(url);
  }
addproduit(prod: Produit): Observable<Produit> {
  return this.httpclt.post<Produit>("http://localhost:3000/products/", prod);
}

getProduitfromid(id:number):Observable<Produit>
{
  return this.httpclt.get<Produit>("http://localhost:3000/products/"+id);
}

onupdateProuit(id: number, Produit:Produit):Observable<Produit> {

   return this.httpclt.put<Produit>("http://localhost:3000/products/"+id,Produit);
   }
   // Recherche d'un produit par nom
   searchProduits(searchTerm: string): Observable<Produit[]> {
    return this.httpclt.get<Produit[]>("http://localhost:3000/products/" + searchTerm)
      .pipe(
        map((response: any) => response as Produit[]) // Transformation de la réponse en Produit[]
      );
  }
}
