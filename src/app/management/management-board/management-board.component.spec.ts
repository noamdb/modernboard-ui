import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBoardComponent } from './management-board.component';

describe('ManagementBoardComponent', () => {
  let component: ManagementBoardComponent;
  let fixture: ComponentFixture<ManagementBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
