import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionService } from '../../service/connection.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-take-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './take-input.component.html',
  styleUrl: './take-input.component.scss'
})
export class TakeInputComponent {

  errorMessage = signal('');
  private allData: undefined | null | any = [];

  constructor(
    private fb: FormBuilder,
    private service: ConnectionService
  ) { }

  jobPost = this.fb.group({
    email: ['', [Validators.required]],
    fName: [''],
    lName: [''],
    compnayName: ['', [Validators.required]],
    date: [''],
    postURL: ['']
  });

  save() {
    let compnayName = this.jobPost.value.compnayName;
    let currentDate = new Date();
    this.jobPost.value.date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    this.service.getCompnay(this.jobPost.value.compnayName).subscribe({
      next: (value: []) => {
        if (value === null) {
          let data = [
            {
              "email": this.jobPost.value.email,
              "fName": this.jobPost.value.fName,
              "lName": this.jobPost.value.lName,
              "compnayName": this.jobPost.value.compnayName,
              "date": this.jobPost.value.date,
              "postURL": this.jobPost.value.postURL
            }
          ];
          this.pushData(data, compnayName);
        }
        else {
          let data = {
            "email": this.jobPost.value.email,
            "fName": this.jobPost.value.fName,
            "lName": this.jobPost.value.lName,
            "compnayName": this.jobPost.value.compnayName,
            "date": this.jobPost.value.date,
            "postURL": this.jobPost.value.postURL
          };
          this.allData = value;
          this.allData.push(data);
          this.pushData(this.allData, compnayName);
        }
      },
      error: err => { console.log("data is not there") },
      complete: () => { }
    });
  }

  pushData(data: any, compnayName: any) {
    this.service.putData(data, compnayName).subscribe({
      next: (res) => { this.jobPost.reset(); },
      error: err => { }
    })
    // this.service.putData(data, compnayName).subscribe(
    //   (res) => {
    //     this.jobPost.reset();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  updateErrorMessage() {
    if (this.jobPost.controls.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.jobPost.controls.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

}
