import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CthreeComponent } from './cthree.component';

describe('CthreeComponent', () => {
  let component: CthreeComponent;
  let fixture: ComponentFixture<CthreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CthreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
