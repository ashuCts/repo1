import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/_services/user.service';
import { Loan } from '../Loan.model';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styles: [
  ]
})
export class LoanUpdateComponent implements OnInit {

  
  modify: boolean =false;
  loanNodisable:boolean=true;
  disableInput: boolean= true;
  selectedLoan: Loan;
  
  fnMeassge:string =null;

  loanNo: string ;
  fname:string;
  lname:string;
  propertyAddress:string;
  loanAmount:number;
  loantype:string;
  lnTerm:number;
  vModify:string;

  constructor(private router: Router, private service : UserService) { }

  ngOnInit(): void {    

    this.fnMeassge=null;

    this.vModify=localStorage.getItem('status');  
     console.log("Status="+this.vModify);
     localStorage.removeItem ('status');
     var slLoan=JSON.parse(localStorage.getItem('selectedLoan'));      
     localStorage.removeItem('selectedLoan');

    if (slLoan != null) {
      this.loanNo = slLoan.loanNo;
      this.fname = slLoan.fname;
      this.lname = slLoan.lname;
      this.propertyAddress = slLoan.propertyAddress;
      this.loanAmount = slLoan.loanamount;
      this.loantype = slLoan.loanType;
      this.lnTerm = slLoan.loanTerm;
     }
     
    if(this.vModify === 'MODIFY'){
      this.modify=true;
      this.disableInput=false;
    }
    else if(this.vModify === 'ADD'){
      this.modify=true;
      this.disableInput=false;
      this.loanNodisable=false;
    }
  }

  homeNavigate(){
    this.router.navigate(['admin']);
  }

  saveOrUpdateLoan(){
      if(this.loanNo===null || this.fname===null|| this.lname===null||this.propertyAddress===null|| this.loanAmount===null ||this.loantype===null|| this.lnTerm==null){
        console.log("==>"+this.loanNo+"--"+ this.fname+"--"+ this.lname+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm);
        this.fnMeassge='Please fill the blanks..!';

    }
    else{
        let obj=new Loan(this.loanNo, this.fname, this.lname,this.propertyAddress, this.loanAmount, this.loantype, this.lnTerm);
        //this.loanService.addOrModifyLoan(obj);
        this.service.saveLoan(obj).subscribe((data)=>{
          console.log(data)
        })  
        this.fnMeassge='Details has been saved..!';
    }
  }

  clearFields(){
      this.fname = null;
      this.lname = null;
      this.propertyAddress = null;
      this.loanAmount = null;
      this.loantype = null;
      this.lnTerm = null;
  }

}
