import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementThreadDetailComponent } from './management-thread-detail.component';

describe('ManagementThreadDetailComponent', () => {
  let component: ManagementThreadDetailComponent;
  let fixture: ComponentFixture<ManagementThreadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementThreadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementThreadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
