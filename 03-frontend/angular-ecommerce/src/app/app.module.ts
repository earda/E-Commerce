import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Route } from '@angular/router';

import{Routes,RouterModule} from '@angular/router';
const routes: Routes = [
 {path:'category/:id',component:ProductListComponent},
 {path:'category',component:ProductListComponent},
 {path:'products',component:ProductListComponent},
 {path:'',redirectTo:'/products',pathMatch:'full'},
 {path:'**',redirectTo:'/products',pathMatch:'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
