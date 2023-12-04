import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRechercheProduitComponent } from './page-recherche-produit.component';

describe('PageRechercheProduitComponent', () => {
  let component: PageRechercheProduitComponent;
  let fixture: ComponentFixture<PageRechercheProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRechercheProduitComponent]
    });
    fixture = TestBed.createComponent(PageRechercheProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
