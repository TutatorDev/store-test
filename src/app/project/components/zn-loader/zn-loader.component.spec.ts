import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnLoaderComponent } from './zn-loader.component';

describe('ZnLoaderComponent', () => {
  let component: ZnLoaderComponent;
  let fixture: ComponentFixture<ZnLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZnLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZnLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
