import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SpotifyService } from './services/spotify.service';
import { AuthInterceptor } from './helpers/httpInterceptor';
import { AuthService } from './services/authentication.service';
import { WebStorageService } from './services/webStorage.service';
import { AuthGuard } from './guards/authGuard';
import { LoginComponent } from './components/login/login.component';
import { PublicGuard } from './guards/publicGuard';
import { GuessFriendComponent } from './components/guess-friend/guess-friend.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'callback', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'guess-friend', component: GuessFriendComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GuessFriendComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [
    SpotifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    WebStorageService,
    AuthGuard,
    PublicGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
