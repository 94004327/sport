import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayearInfoComponent } from './playear-info.component';

describe('PlayearInfoComponent', () => {
  let component: PlayearInfoComponent;
  let fixture: ComponentFixture<PlayearInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayearInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayearInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
