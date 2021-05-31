import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Iproduct } from '../interfaces/iproduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId: number = 0;
  productToUpdate: Iproduct;
  loader: boolean = false;
  
  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
  })

  constructor(private _fb: FormBuilder, private _productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
    }, error => {
      console.log('parammap error', error);
    })

    this._createForm();
  }

  getProductToUpdate(): Observable<Iproduct> {
    const observable = this._productService.geProductFromId(this.productId);
    observable.subscribe(product => {
      this.productToUpdate = product;
    }, error => {
      console.log(error);
    });

    return observable;
  }

  /**
       * create our reactive form here
       */
   private _createForm() {
     this.getProductToUpdate().subscribe(product => {
      this.productForm = this._fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required]
      });
     })
    
  }

  /**
       * submit new product to server
       */
   onSubmit() {
    const param = this.productForm.value;
    this._productService.update(param)
      .subscribe((product: Iproduct) => {
         this.loader = false;
         this.successNotification();
      },
        (error) => {
          console.error(error);
          this.loader = false;
        });
  }

  successNotification(){
    Swal.fire('Update succesful!', 'Check product list!', 'success')
  }

}
