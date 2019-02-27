import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesDialogComponent } from './replies-dialog.component';

describe('RepliesDialogComponent', () => {
  let component: RepliesDialogComponent;
  let fixture: ComponentFixture<RepliesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepliesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepliesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
