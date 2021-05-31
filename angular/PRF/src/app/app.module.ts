import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { HttpReqInterceptor } from './utils/http.interceptor';

import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';

import { NgAlertModule } from '@theo4u/ng-alert';

import { ProductService } from './services/product.service';
import { PusherService } from './services/pusher.service';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    ErrorComponent,
    LoginComponent,
    ListProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ListTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgAlertModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpReqInterceptor, multi: true }, PusherService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
