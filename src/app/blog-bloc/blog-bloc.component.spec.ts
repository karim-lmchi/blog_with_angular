import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBlocComponent } from './blog-bloc.component';

describe('BlogBlocComponent', () => {
  let component: BlogBlocComponent;
  let fixture: ComponentFixture<BlogBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
