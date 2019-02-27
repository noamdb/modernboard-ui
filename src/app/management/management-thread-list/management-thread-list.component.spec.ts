import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementThreadListComponent } from './management-thread-list.component';

describe('ManagementThreadListComponent', () => {
  let component: ManagementThreadListComponent;
  let fixture: ComponentFixture<ManagementThreadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementThreadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementThreadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
