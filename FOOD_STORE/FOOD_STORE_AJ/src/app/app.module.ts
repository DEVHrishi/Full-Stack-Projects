import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/widgets/header/header.component';
import { PrimengModule } from './shared/modules/primeng.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './shared/widgets/search/search.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { TagsComponent } from './shared/widgets/tags/tags.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { NotFoundComponent } from './shared/widgets/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './pages/register/register.component';
import { LoadingComponent } from './shared/widgets/loading/loading.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MapComponent } from './shared/widgets/map/map.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaypalComponent } from './shared/widgets/paypal/paypal.component';
import { OrderTrackComponent } from './pages/order-track/order-track.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    TagsComponent,
    CartPageComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    CheckoutComponent,
    MapComponent,
    PaymentComponent,
    PaypalComponent,
    OrderTrackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
