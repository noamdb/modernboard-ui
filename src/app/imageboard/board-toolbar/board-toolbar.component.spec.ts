import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardToolbarComponent } from './board-toolbar.component';

describe('BoardToolbarComponent', () => {
  let component: BoardToolbarComponent;
  let fixture: ComponentFixture<BoardToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
