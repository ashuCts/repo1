export class User{
    public userPassword: string;
    public userLastName: string;
    public userFirstName: string;
    public userName : string;
    
 
    constructor (userName : string, userPassword: string,
        userFirstName: string,
        userLastName : string){
                     this.userName=userName
                     this.userPassword=userPassword;
                     
                     this.userFirstName=userFirstName;
                     this.userLastName=userLastName;
                    
                 }
 }