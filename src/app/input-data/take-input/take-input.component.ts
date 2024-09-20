import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionService } from '../../service/connection.service';
import { HttpClientModule } from '@angular/common/http';


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
    time: [''],
    postURL: ['']
  });

  save() {
    let currentDate = new Date();
    this.jobPost.value.date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    this.service.putData(this.jobPost.value).subscribe(
      (res) => {
        this.jobPost.reset();
      },
      (error) => {
        console.log(error);
      }
    )
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
