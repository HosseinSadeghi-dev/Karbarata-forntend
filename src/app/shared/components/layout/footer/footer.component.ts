import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@app/core/services";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactWay: ['',Validators.required],
  });
    console.log('form',this.stFormGroup)
  }

  onSubmit(){
    this.userService.createUser(this.stFormGroup.value).
    subscribe( );
  }
}
