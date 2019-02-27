import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUsersComponent } from './board-users.component';

describe('BoardUsersComponent', () => {
  let component: BoardUsersComponent;
  let fixture: ComponentFixture<BoardUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
