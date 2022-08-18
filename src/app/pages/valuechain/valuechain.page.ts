import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-valuechain',
  templateUrl: './valuechain.page.html',
  styleUrls: ['./valuechain.page.scss'],
})
export class ValuechainPage implements OnInit {
  dealer2form:FormGroup
  constructor(
    private fb:FormBuilder,
   
  ) { }

  ngOnInit() {
    this.dealer2form=this.fb.group({
      vchain:['',Validators.required]
    });
    this.dealer2form.reset();
  }

  tryReg(e){
   console.log(e);
   
  }

}
