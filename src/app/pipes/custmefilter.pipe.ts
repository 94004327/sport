import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custmefilter'
})
export class CustmefilterPipe implements PipeTransform {
  

  transform(objs:any, x:string){
    if (x === undefined) {
      return (objs);
      
    }
    return (objs.filter(
       (obj:any) => {return obj.teamsOne.toLowerCase().includes(x.toLowerCase()) || 
        obj.teamsTwo.toLowerCase().includes(x.toLowerCase())
       }
    )
    )
   
  }

}
