import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableproduitComponent } from './tableproduit/tableproduit.component';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageProduitComponent } from './page-produit/page-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { PageRechercheProduitComponent } from './page-recherche-produit/page-recherche-produit.component';
import { SearchPipe } from './search.pipe';
import { CustomFilterPipePipe } from './custom-filter-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableproduitComponent,
    FormProduitComponent,
    PageProduitComponent,
    UpdateProduitComponent,
    PageRechercheProduitComponent,
    SearchPipe,
    CustomFilterPipePipe,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
