import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallPaperPostComponent } from './wall-paper-post.component';

describe('WallPaperPostComponent', () => {
  let component: WallPaperPostComponent;
  let fixture: ComponentFixture<WallPaperPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallPaperPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallPaperPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
