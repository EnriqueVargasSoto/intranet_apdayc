import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SiderbarComponent } from './components/siderbar/siderbar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent,
    FooterComponent
  ],
})
export class SharedModule { }
