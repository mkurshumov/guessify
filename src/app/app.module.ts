import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

//components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/private/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { GuessFriendComponent } from './components/private/guess-friend/guess-friend.component';
import { PrivateComponent } from './components/private/private.component';
import { PublicComponent } from './components/public/public.component';
import { HeaderComponent } from './components/private/partials/header/header.component';
import { ProfileComponent } from './components/private/profile/profile.component';
import { ErrorComponent } from './components/private/error/error.component';

//services
import { SpotifyService } from './services/spotify.service';
import { AuthInterceptor } from './helpers/httpInterceptor';
import { AuthService } from './services/authentication.service';
import { WebStorageService } from './services/webStorage.service';
import { DataService } from './services/data.service';

//guards
import { PrivateGuard } from './guards/privateGuard';
import { PublicGuard } from './guards/publicGuard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PrivateComponent,
    canActivate: [PrivateGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'callback', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'guess-friend', component: GuessFriendComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'error', component: ErrorComponent }
    ]
  },
  {
    path: '',
    component: PublicComponent,
    canActivate: [PublicGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PublicComponent,
    HomeComponent,
    LoginComponent,
    GuessFriendComponent,
    HeaderComponent,
    NotFoundComponent,
    ProfileComponent,
    ErrorComponent
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
    PrivateGuard,
    PublicGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
