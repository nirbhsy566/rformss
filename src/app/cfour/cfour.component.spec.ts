import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfourComponent } from './cfour.component';

describe('CfourComponent', () => {
  let component: CfourComponent;
  let fixture: ComponentFixture<CfourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
