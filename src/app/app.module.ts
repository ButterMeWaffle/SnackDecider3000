// Angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';

// My imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
  // Pages
  import { HomeComponent } from './pages/home/home.component';
  import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
  // Components
  import { HeaderComponent } from './components/header/header.component';
  import { FooterComponent } from './components/footer/footer.component';
  import { ErrorSnackComponent } from './components/error-snack/error-snack.component';
  import { ErrorVotesComponent } from './components/error-votes/error-votes.component';
  // Directives
  import { KonamiDirective } from './directives/konami.directive';
  import { HamburgerToggleDirective } from './directives/hamburger-toggle.directive';
  // Services
  import {HttpInterceptorService} from './services/http-interceptor.service';
  import { ErrorInterceptor } from './services/error.interceptor';

//Extras
import { CookieModule } from 'ngx-cookie';
import { NgxSpinnerModule } from "ngx-spinner";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    KonamiDirective,
    ErrorSnackComponent,
    ErrorVotesComponent,
    HamburgerToggleDirective
  ],
  imports: [
    CookieModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // required by NgxSpinnerModule 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
