import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementToolbarComponent } from './management-toolbar.component';

describe('ManagementToolbarComponent', () => {
  let component: ManagementToolbarComponent;
  let fixture: ComponentFixture<ManagementToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
