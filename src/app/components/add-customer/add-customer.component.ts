import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  customerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    website: [''],
    company: this.fb.group({
      name: ['', Validators.required],
      catchPhrase: [''],
      bs: ['']
    }),
    address: this.fb.group({
      street: ['', Validators.required],
      suite: [''],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      geo: this.fb.group({
        lat: [''],
        lng: ['']
      })
    })
  });

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value as Customer).subscribe(() => {
        alert('Customer added successfully');
        this.customerForm.reset();
      });
    }
  }
}
