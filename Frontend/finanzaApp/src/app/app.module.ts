import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/services/http-interceptor';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
          LoginModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: CustomHttpInterceptor,
                  multi: true
                },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
