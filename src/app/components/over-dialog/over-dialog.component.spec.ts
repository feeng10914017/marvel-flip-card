import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDialogComponent } from './over-dialog.component';

describe('OverDialogComponent', () => {
  let component: OverDialogComponent;
  let fixture: ComponentFixture<OverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OverDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
