import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FirstComponent } from './first/first.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SecondComponent } from './second/second.component';
import { ListProductsComponent } from './list-products/list-products.component'
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'first', component: FirstComponent, canActivate: [AuthGuard]},
  {path: 'second/:id', component: SecondComponent, canActivate: [AuthGuard]},
  {path: 'listProducts', component: ListProductsComponent, canActivate: [AuthGuard]},
  {path: 'addNewProduct', component: CreateProductComponent, canActivate: [AuthGuard]},
  {path: 'updateProduct/:id', component: UpdateProductComponent, canActivate: [AuthGuard]},
  {path: 'listTransactions', component: ListTransactionsComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
