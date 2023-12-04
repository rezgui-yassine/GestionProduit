import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.css']
})
export class PageProduitComponent implements OnInit {
  table :Produit[] =[];
constructor(private ProduitServ : ProduitService){

}
  ngOnInit(): void {
    this.getAllProduit();
  }


  getAllProduit() {
    this.ProduitServ.getAllproduit().subscribe(data => {
      this.table = data;
    });
  }
}
