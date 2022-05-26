
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { appRouts } from 'src/app/app-routing.module';
import { Loan } from 'src/app/models/Loan.model';
import { LoanService } from '../loan.service';
import { LoanComponent } from './loan.component';

describe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;
  let router:Router;
  let location: Location;
 

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoanComponent],
      imports: [RouterTestingModule.withRoutes(appRouts)],
      providers: [LoanService]
    })

    router= TestBed.inject(Router) as Router;
    location=TestBed.inject(Location) as Location;
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
  });

  it('should create ', () => { 
    expect(component).toBeDefined();
  });

  it('should addorModifyLoan success', waitForAsync(inject([LoanService], (loanSrvc: LoanService) => {
    expect(loanSrvc.addOrModifyLoan(new Loan("loan1001", "Sujith", "AK", "Palakkad-Kerala", 1000, "Housing", 60))).toBeTruthy();
  })));

  it('Should navigate to home', fakeAsync(() => { 
    component.homeNavigate();
    tick(); 
    expect(location.path()).toBe('/home');
 }));



 it('Save or Update Loan Function',waitForAsync(inject([LoanService],(loanSrvc: LoanService)=>{   
   let count=loanSrvc.loans.length;
   component.saveOrUpdateLoan();
  // if(component.vModify==='MODIFY'){
      expect(loanSrvc.loans.length).toEqual(count);
  //  }
  //  else{
  //  expect(loanSrvc.loans.length).toEqual(count+1);
   //}

 }
 )));

 
});
