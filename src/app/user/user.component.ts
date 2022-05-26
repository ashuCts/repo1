import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Loan } from './Loan.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userType: boolean = false;

  matching_loans: Loan[];

  loanNo: string;
  fName: string;
  lName: string;
  
  isAvlbLoan=false
  invalidUser=false;

  constructor(private router: Router,
    private service : UserService) { }

  ngOnInit(): void {

  }


  addNewLoan() {
    localStorage.setItem('status', "ADD");
    this.router.navigate(['admin']);
  }

  serchLoan() {
    // this.sFilter = new searchFilter(this.loanNo, this.fName, this.lName);
    //this.matching_loans = this.loanService.loanSearch(this.sFilter);
    console.log( this.loanNo+" "+ this.fName+" "+this.lName)
    if(this.loanNo == null && this.lName==null && this.fName==null){
      this.service.getAllLoans().subscribe((data)=>{
        console.log(data)
        const myJSON = JSON.stringify(data);
            const json = myJSON
            var obj = JSON.parse(json)
            this.matching_loans = obj
            this.isAvlbLoan=true;
      })
    }
    else{
      this.isAvlbLoan=true
      if(this.loanNo){
        this.service.searchLoanByLoanId(this.loanNo).subscribe((data)=>{
          console.log(data)
          const myJSON = JSON.stringify(data);
          const json = myJSON
          var obj = JSON.parse(json)
          this.matching_loans = obj
          this.isAvlbLoan=true
        })
    
      }else{
        
        {
        let fn =0
        let ln =0
        if(this.fName!=null || this.fName != undefined) {fn=1}
        if(this.lName!=null || this.lName != undefined) {ln=1}
        
        if(fn==1 && ln==0)
        {
          this.service.searchLoanByFname(this.fName).subscribe((data)=>{
          console.log(data)
          const myJSON = JSON.stringify(data);
          const json = myJSON
          var obj = JSON.parse(json)
          this.matching_loans = obj
          }) 
        }else if(fn==0 && ln==1){
          this.service.searchLoanByLname(this.lName).subscribe((data)=>{
           console.log(data)
           const myJSON = JSON.stringify(data);
          const json = myJSON
          var obj = JSON.parse(json)
          this.matching_loans = obj
          })
        }else if((fn+ln)==2){
          let name = this.fName+" "+this.lName
          this.service.searchLoanByFullName(name).subscribe((data)=>{
            console.log(data)
            const myJSON = JSON.stringify(data);
          const json = myJSON
          var obj = JSON.parse(json)
          this.matching_loans = obj
           })
        }
  
          
        }
       
      }
    }

    
    
    
    
    this.loanNo = null;
    this.fName = null;
    this.lName = null;
  }

  viewLoanDetails(selectedLoan: Loan) {
    localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    localStorage.setItem('status', "VIEW");
    this.router.navigate(['loanDetails']);
  }

  modifyLoanDetails(selectedLoan: Loan) {
    localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    localStorage.setItem('status', "MODIFY");
    this.router.navigate(['loanDetailsUpdate']);
  }

  clearSearch() {
    this.loanNo = null;
    this.fName = null ;
    this.lName = null;
  }


}
