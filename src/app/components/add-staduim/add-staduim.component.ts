import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-staduim',
  templateUrl: './add-staduim.component.html',
  styleUrls: ['./add-staduim.component.css']
})
export class AddStaduimComponent implements OnInit {
  staduimForm:FormGroup
 
  staduim:any;
  staduimTab:any;
  constructor(private x: FormBuilder) { }

  ngOnInit() {

    this.staduimForm = this.x.group({
      nameSt: [''],
      capacitySt: [''],
      city: [''],
     
  })
}
  addStaduim() {
    console.log('here obj',this.staduimForm.value);
    this.staduimTab = JSON.parse(localStorage.getItem('staduims')||'[]');
    this.staduim=this.staduimForm.value;
    this.staduim.id=this.generateId (this.staduimTab)+1;
     console.log('here obj', this.staduim);
    
    
    // this.staduim.id=this.generateId(this.staduimTab);
    this.staduimTab.push(this.staduim);
    
    localStorage.setItem('staduims',JSON.stringify(this.staduimTab));

  }
  generateId(T) {
    let max;
    if (T.length == 0) {
      max = 0;
    } else {
      max = T[0].id;
      for (let i = 0; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;
        }
      }
    }
    return max;
  }
  

}
