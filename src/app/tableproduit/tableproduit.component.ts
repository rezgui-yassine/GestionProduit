import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableproduit',
  templateUrl: './tableproduit.component.html',
  styleUrls: ['./tableproduit.component.css']
})
export class TableproduitComponent implements OnInit {
  table :Produit[] =[];
  id!: number;
  constructor( private ProduitServ : ProduitService ,  private route:Router){

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
    console.log("le id qui transfere a udate est "+ id)
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
        
        this.route.navigate(['/tableProduit'])
      }
    )
  }
  

}
