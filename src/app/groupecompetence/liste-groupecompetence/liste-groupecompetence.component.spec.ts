import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGroupecompetenceComponent } from './liste-groupecompetence.component';

describe('ListeGroupecompetenceComponent', () => {
  let component: ListeGroupecompetenceComponent;
  let fixture: ComponentFixture<ListeGroupecompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeGroupecompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGroupecompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
