import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

interface Product {
  name: string;
  price: string;
  Quantite: number,
  image:string,
} 
@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.css']
})
export class FormProduitComponent implements OnInit  {
  forminput!:FormGroup
  valCount=1;
  imageUrl!: string;


  // selectedImage: File | null = null;
  selectedImageBase64: string | null = null;
  imageRequiredError: boolean = false;

  onImageSelected() {
    this.imageRequiredError = false; // Réinitialiser le message d'erreur
    console.log("la valeur de imageRequiredError est "+ this.imageRequiredError)
    
  }

  
constructor( private ProduitServ:ProduitService , private fb:FormBuilder , private route:Router ){

}
 
 
ngOnInit(): void {
  let uploadButton: HTMLInputElement = document.getElementById("upload-button") as HTMLInputElement;
let chosenImage: HTMLImageElement = document.getElementById("chosen-image") as HTMLImageElement;
let fileName: HTMLElement = document.getElementById("file-name") as HTMLElement;

uploadButton.onchange = () => {
  if (uploadButton.files?.length) {
    let file = uploadButton.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      chosenImage.setAttribute("src", reader.result as string);
       // Récupérer l'URL de données (base64) nouvellement définie
       let imageUrl = chosenImage.src;
       // Mettre à jour selectedImageBase64 avec l'URL de données (base64) nouvellement définie
       this.selectedImageBase64 = reader.result as string;
       console.log("le selectedImageBase64 "+this.selectedImageBase64)

       console.log("URL de l'image sélectionnée : ", imageUrl);
    };
    fileName.textContent = file.name;
  }
};

this.forminput=this.fb.group(

  {
    
  "Nom":["", [Validators.required,Validators.minLength(4), Validators.maxLength(20)]],
  "price":["", [Validators.required,Validators.pattern("^[0-9]+$")]],
  "image":[null, [Validators.required]],
},

)

}


onclickIncrement()
  {
     
      this.valCount=this.ProduitServ.counter; 
      this.ProduitServ.onIncrement();
  }
  onclicksubstract(){
    this.valCount=this.ProduitServ.counter; 
    this.ProduitServ.onsubstraction();

  }
  
  onsubmit(){
    let maVariable: string = "Hello";
    console.log("maVariable : "+ maVariable); 
    console.log("le selectedImageBase64 "+this.selectedImageBase64)
  if (!this. selectedImageBase64) {
    this.imageRequiredError = true;
    console.log("le imageRequiredError "+this.imageRequiredError)
    return;
  }
 
  let nouveauProduit: Produit = new Produit();
 

  console.log(this.forminput.controls)

  nouveauProduit.nom=this.forminput.controls['Nom'].value;
    console.log("le nom : "+ nouveauProduit.nom);

    nouveauProduit.price=this.forminput.controls['price'].value;
    console.log("le price : "+ nouveauProduit.price);

    nouveauProduit.Quantite=this.valCount;
    console.log("le Quantite : "+ nouveauProduit.Quantite);

    nouveauProduit.image=this.selectedImageBase64;
    console.log("le image : "+ nouveauProduit.image);
    console.log(this.forminput.controls);
    console.log('Produit ajouté :');

   if(this.forminput.valid)
   {
       this.ProduitServ.addproduit(nouveauProduit).subscribe(
      (prd)=>{

        console.log("le nom de user ajouté est :"+prd.nom)

        this.route.navigate(['/tableProduit'])
      }
    )
   }
   else{

    console.log(this.forminput.controls)
    console.log("formulaire non valid !!!")
   }
 
  }
}

