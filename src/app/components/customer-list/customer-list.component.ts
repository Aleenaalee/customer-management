import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        this.filterCustomers();
      }
    );
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id !== id);
        this.filterCustomers();
        alert('Customer deleted successfully');
      });
    }
  }
  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.pageSize);
    this.currentPage = 1;
  }


  get paginatedCustomers(): Customer[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
