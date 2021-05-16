import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ErrorHandlingComponent } from './error-handling.component';

describe('ErrorHandlingComponent', () => {
  let component: ErrorHandlingComponent;
  let fixture: ComponentFixture<ErrorHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorHandlingComponent],
      providers: [{
        provide: ActivatedRoute, useValue: {
          // queryParams: of({ message: 'message' }),
          params: of({ code: 404 }),
          snapshot: {
            params: {
              errorCode: 404
            },
            queryParamMap: { 
              get: (key: string) => {
                switch (key) {
                  case 'code':
                    return 404;
                  case 'message':
                    return 'Not Found';
                  default:
                    return 'Not Found';
                }
              }
            }
          },
        }
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
