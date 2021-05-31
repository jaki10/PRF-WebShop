import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Iproduct } from '../interfaces/iproduct';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Itransaction } from '../interfaces/itransaction';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  adminEmail: String = "admin@gmail.com";
  products: Iproduct[] = [];
  transaction: Itransaction;
  loading = true;
  loader: boolean = false;

  constructor(private _productService: ProductService, private _transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
        this._productService.getProducts()
          .subscribe(products => {
            this.loading = false;
            this.products = products;
          });
  }

  delete(product: Iproduct) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this._productService.delete(product)
          .subscribe(() => {
        // remove the product if removed successfully
        this.products = this.products.filter(item => item !== product);
        this.ngOnInit();
      });
        Swal.fire(
          'Removed!',
          'Product removed successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Product still in our database.',
          'error'
        )
      }
    })
    
  }

  createNewTransaction(product: Iproduct) {
    const transaction: Itransaction = {
      productId: product.id,
      datum: new Date(),
      sum: product.price
    };

    this._transactionService.create(transaction)
      .subscribe((transaction: Itransaction) => {
         this.loader = false;
         this.successNotification();
      },
        (error) => {
          console.error(error);
          this.loader = false;
        });
  }

  tinyAlert(){
    Swal.fire('Hey there!');
  }
  
  successNotification(){
    Swal.fire('Succesful purchase!', 'Check transaction list!', 'success')
  }

  goToAddNewProduct() {
    this.router.navigate(['/addNewProduct']);
  }

  goToUpdateProduct(product: Iproduct) {
    this.router.navigate(['/updateProduct/' + product.id]);
  }

  isAdminAuthenticated(): boolean {
    return (localStorage.getItem('user') === this.adminEmail);
  }
}
