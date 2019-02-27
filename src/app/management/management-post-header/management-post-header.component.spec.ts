import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPostHeaderComponent } from './management-post-header.component';

describe('ManagementPostHeaderComponent', () => {
  let component: ManagementPostHeaderComponent;
  let fixture: ComponentFixture<ManagementPostHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPostHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPostHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
