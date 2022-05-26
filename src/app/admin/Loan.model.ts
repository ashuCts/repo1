export class Loan{
   public loanNo: string;
   public fname: string;
   public lname: string;
   public propertyAddress : string;
   public loanamount: number;
   public loanType: string;
   public loanTerm : number;

   constructor (loanNo: string, fName: string,lName: string,
                propertyAddress : string,loanamount: number,
                loanType: string,loanTerm : number){
                    this.loanNo=loanNo
                    this.fname=fName;
                    this.lname=lName;
                    this.propertyAddress=propertyAddress;
                    this.loanamount=loanamount;
                    this.loanType=loanType
                    this.loanTerm=loanTerm;
                }
}