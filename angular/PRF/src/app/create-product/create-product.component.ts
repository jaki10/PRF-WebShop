import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iproduct } from '../interfaces/iproduct';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
  })

  loader: boolean = false;

  constructor(private _fb: FormBuilder, private _productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this._createForm();
  }

  /**
       * create our reactive form here
       */
   private _createForm() {
    this.productForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  /**
       * submit new product to server
       */
   onSubmit() {
    const param = this.productForm.value;
    this._productService.create(param)
      .subscribe((product: Iproduct) => {
         this.loader = false;
         this.productForm.reset();
         this.successNotification();
      },
        (error) => {
          console.error(error);
          this.loader = false;
        });
  }

  successNotification(){
    Swal.fire('Save succesful!', 'Check product list!', 'success')
  }


}
