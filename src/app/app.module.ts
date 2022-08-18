import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';

// import { firebaseconfig } from './config/firebase';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AuthService } from './services/auth.service';
// import { Facebook } from '@ionic-native/facebook/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { IonicStorageModule } from '@ionic/storage';

// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
// import { AdMobFree } from '@ionic-native/admob-free/ngx';
// import { AdmobService } from './services/admob.service';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import {TimeAgoPipe} from 'time-ago-pipe';
// import { ComponentsModule } from './components/components.module';
// import { PipesModule } from './pipes/pipes.module';
// import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
// import { Keyboard } from '@ionic-native/keyboard/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
   // IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // AngularFireModule.initializeApp(firebaseconfig.firebase), // imports firebase/app
    // AngularFirestoreModule, // imports firebase/firestore
    // AngularFireAuthModule, // imports firebase/auth
    // AngularFireStorageModule, // imports firebase/storage
    // ComponentsModule,
    // PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
