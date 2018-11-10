import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticGraphComponent } from './static-graph.component';

describe('StaticGraphComponent', () => {
  let component: StaticGraphComponent;
  let fixture: ComponentFixture<StaticGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
