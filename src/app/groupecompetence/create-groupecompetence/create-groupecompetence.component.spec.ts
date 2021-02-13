import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupecompetenceComponent } from './create-groupecompetence.component';

describe('CreateGroupecompetenceComponent', () => {
  let component: CreateGroupecompetenceComponent;
  let fixture: ComponentFixture<CreateGroupecompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupecompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupecompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
