import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public doExist(no: string) {
    return this.httpclient.get(this.PATH_OF_API + '/doesExist/'+no, {
      responseType: 'text',
    });
  }
  //registerNewUser  getAllLoans
  public registerNewUser(User : any){
    return this.httpclient.post("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/registerNewUser",User,{responseType:'json', 
      headers: this.requestHeader,
    });
    
    }
  public getAllLoans() {
    return this.httpclient.get(this.PATH_OF_API + '/getAllLoans', {
      responseType: 'json',
    });
  }

  public searchLoanByLoanId(no: string){
    return this.httpclient.get("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/searchLoanByLoanId/"+no);
  }

  public searchLoanByFname(fName: string){
    return this.httpclient.get("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/searchLoanByFname/"+fName);
  }

  public searchLoanByLname(lName: string){
    return this.httpclient.get("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/searchLoanByLname/"+lName);
  }

  public searchLoanByFullName(name: string){
    return this.httpclient.get("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/searchLoanByFullName/"+name);
  }

  public saveLoan(Loan : any){
    return this.httpclient.post("http://loanappcts-env.eba-g7hm3g3d.us-east-1.elasticbeanstalk.com/saveLoan",Loan,{responseType:'json'});
    }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
