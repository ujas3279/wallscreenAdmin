import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallPaperPostsComponent } from './wall-paper-posts.component';

describe('WallPaperPostsComponent', () => {
  let component: WallPaperPostsComponent;
  let fixture: ComponentFixture<WallPaperPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallPaperPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallPaperPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
