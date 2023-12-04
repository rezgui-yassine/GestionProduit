import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableproduitComponent } from './tableproduit.component';

describe('TableproduitComponent', () => {
  let component: TableproduitComponent;
  let fixture: ComponentFixture<TableproduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableproduitComponent]
    });
    fixture = TestBed.createComponent(TableproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
