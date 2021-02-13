import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupecompetenceComponent } from './groupecompetence.component';

describe('GroupecompetenceComponent', () => {
  let component: GroupecompetenceComponent;
  let fixture: ComponentFixture<GroupecompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupecompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupecompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
