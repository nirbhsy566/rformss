import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfiveComponent } from './cfive.component';

describe('CfiveComponent', () => {
  let component: CfiveComponent;
  let fixture: ComponentFixture<CfiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
