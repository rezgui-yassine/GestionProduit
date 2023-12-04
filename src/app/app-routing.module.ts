import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableproduitComponent } from './tableproduit/tableproduit.component';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { PageProduitComponent } from './page-produit/page-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { PageRechercheProduitComponent } from './page-recherche-produit/page-recherche-produit.component';

const routes: Routes = [
  
    {path:'tableProduit',component:TableproduitComponent},
    {path:"form-produit",component:FormProduitComponent},
    {path:"page-produit",component:PageProduitComponent},
    {path:"update/:id",component:UpdateProduitComponent},
    {path:"page-recherche-produit",component:PageRechercheProduitComponent },

  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
