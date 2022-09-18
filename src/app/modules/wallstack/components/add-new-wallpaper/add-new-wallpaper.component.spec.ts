import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWallpaperComponent } from './add-new-wallpaper.component';

describe('AddNewWallpaperComponent', () => {
  let component: AddNewWallpaperComponent;
  let fixture: ComponentFixture<AddNewWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewWallpaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
