import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessFriendComponent } from './guess-friend.component';

describe('GuessFriendComponent', () => {
  let component: GuessFriendComponent;
  let fixture: ComponentFixture<GuessFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
