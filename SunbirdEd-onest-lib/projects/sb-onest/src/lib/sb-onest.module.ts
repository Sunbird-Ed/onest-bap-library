import { NgModule } from '@angular/core';
import { SbOnestComponent } from './componnets/sb-onest/sb-onest.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerComponent } from './componnets/player/player.component';
import { PageLoaderComponent } from './componnets/page-loader/page-loader.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SbOnestComponent,
    PlayerComponent,
    PageLoaderComponent,
  ],
  imports: [
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule
    

  ],
  exports: [
    SbOnestComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SbOnestModule { }
