import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanDialogComponent } from './ban-dialog.component';

describe('BanDialogComponent', () => {
  let component: BanDialogComponent;
  let fixture: ComponentFixture<BanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
