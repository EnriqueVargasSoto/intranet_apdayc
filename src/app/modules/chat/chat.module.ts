import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,

    FormsModule,
    HttpClientModule
  ]
})
export class ChatModule { }
