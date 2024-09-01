import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer | null = null;
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
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id).subscribe(customer => {
      this.customer = customer;
      this.customerForm.patchValue(customer);
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid && this.customer) {
      const updatedCustomer = { ...this.customer, ...this.customerForm.value };
      this.customerService.updateCustomer(updatedCustomer as Customer).subscribe(() => {
        alert('Customer updated successfully');
      });
    }
  }

}
