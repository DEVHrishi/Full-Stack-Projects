import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { authGuard } from './core/guard/auth.guard';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderTrackComponent } from './pages/order-track/order-track.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent},
  { path: 'food/:id', component: FoodPageComponent},
  { path: 'tag/:Tag', component: HomeComponent},
  { path: 'cart-page', component: CartPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard]},
  { path: 'track/:orderId', component: OrderTrackComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
