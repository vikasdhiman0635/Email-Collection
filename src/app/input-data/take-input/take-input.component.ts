import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-take-input',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './take-input.component.html',
  styleUrl: './take-input.component.scss'
})
export class TakeInputComponent {

  errorMessage = signal('');

  constructor(
    private fb: FormBuilder
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
    console.log(this.jobPost.value);
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
