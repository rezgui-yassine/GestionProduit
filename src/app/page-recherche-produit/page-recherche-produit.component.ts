import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-recherche-produit',
  templateUrl: './page-recherche-produit.component.html',
  styleUrls: ['./page-recherche-produit.component.css']
})
export class PageRechercheProduitComponent implements OnInit {
  searchTerm: string = ''; 
  filteredProducts: Produit[] = []; // Variable pour stocker les produits filtrés

  table :Produit[] =[];
  id!: number;
  constructor( private ProduitServ : ProduitService ,  private route:Router){


  }
  search() {
    this.filterProducts(); // Appeler la méthode pour filtrer les produits à chaque changement de la valeur de recherche

  }
  
  filterProducts() {
    this.filteredProducts = this.table.filter((prod: Produit) => {
      return prod.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  ngOnInit(): void {
    this.getAllProduit();
  }

 
  getAllProduit() {
    this.ProduitServ.getAllproduit().subscribe(data => {
      this.table = data;
    });
  }



  onUpdate(id:number)
  {
    console.log("le id qui transfere a update est "+ id)
      this.route.navigate(['/update',id])
  }

  ondelete(id:number)
  {
    console.log("le id est :" + id);
    this.ProduitServ.deleteproduit(id).subscribe(
    
      ()=>{
        
        this.ProduitServ.getAllproduit().subscribe(
          (listproduit)=>{

            this.table =listproduit;

          }
        )
        
        this.route.navigate(['/page-recherche-produit'])
      }
    )
  }

}
