import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit{
  forminput!:FormGroup
  valCount=1;
  imageUrl!: string| null;
idproduit!:number;
PR!:Produit;
  // selectedImage: File | null = null;
  selectedImageBase64: string | null = null;
  imageRequiredError: boolean = false;

  constructor(private fb:FormBuilder, private route: Router , private ProduitServ:ProduitService, private router: ActivatedRoute){

  }

  onImageSelected(event: any) {
    this.imageRequiredError = false; // Réinitialiser le message d'erreur
    console.log("la valeur de imageRequiredError est "+ this.imageRequiredError)
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
  this.router.params.subscribe(

    (param)=>{

      this.idproduit=param['id']

      console.log("param passé ="+this.idproduit)

    }
  )
this.ProduitServ.getProduitfromid(this.idproduit).subscribe(

  (produit)=>{
    this.PR=produit;
this.selectedImageBase64=produit.image;

    console.log("returned username !!!!: "+produit.nom);

    this.forminput.controls['Nom'].setValue(this.PR.nom)
    this.forminput.controls['price'].setValue(this.PR.price)
   this.valCount = this.PR.Quantite;
   this.imageUrl=this.selectedImageBase64;
  }
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
    onupdate()
    {

  let Prod: Produit = new Produit();
  Prod.nom = this.forminput.controls['Nom'].value;
  Prod.price = this.forminput.controls['price'].value;
  Prod.Quantite = this.valCount;

  // Vérifier s'il y a une nouvelle image sélectionnée, sinon utiliser l'image existante
  if (this.selectedImageBase64) {
    Prod.image = this.selectedImageBase64;
  } else {
    Prod.image = this.PR.image;
  }

  console.log(this.forminput.controls);
  console.log('Produit ajouté :');
  console.log("id :" + Prod.id);

  this.ProduitServ.onupdateProuit(this.idproduit, Prod).subscribe(
    (usrr) => {
      this.route.navigate(['/tableProduit']);
    }
  );
    
}
}
