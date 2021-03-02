import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferentielComponent } from './create-referentiel.component';

describe('CreateReferentielComponent', () => {
  let component: CreateReferentielComponent;
  let fixture: ComponentFixture<CreateReferentielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReferentielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
