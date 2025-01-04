import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface Conversation {
  name: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  conversations: Conversation[] = [
    { name: 'Conversación 1', messages: [{ sender: 'bot', text: 'Hola, ¿cómo puedo ayudarte?' }] },
    { name: 'Conversación', messages: [{ sender: 'bot', text: '¿Tienes alguna consulta?' }] },
  ];
  selectedConversation: Conversation | null = null;
  messageText: string = '';

  URL_CHAT: string = 'https://ieyy73j919.execute-api.us-east-2.amazonaws.com/chatbot-api';

  constructor(private http: HttpClient){
    this.selectConversation({ name: 'Conversación', messages: [{ sender: 'bot', text: '¿Tienes alguna consulta?' }] })
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
  }

  createNewConversation() {
    const newConversation: Conversation = {
      name: `Conversación ${this.conversations.length + 1}`,
      messages: [],
    };
    this.conversations.push(newConversation);
    this.selectedConversation = newConversation;
  }

  sendMessage() {
    if (!this.messageText.trim() || !this.selectedConversation) return;

    this.selectedConversation.messages.push({ sender: 'user', text: this.messageText });
    const body = {
      prompt: this.messageText
    };

    this.messageText = '';

    this.http.post(this.URL_CHAT, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      })}).subscribe((resp: any) => {
      this.selectedConversation?.messages.push({
        sender: 'bot',
        text: resp.response//'Gracias por tu mensaje. Estoy aquí para ayudarte.',
      });
    });



    // Simulate bot response
    /* setTimeout(() => {
      this.selectedConversation?.messages.push({
        sender: 'bot',
        text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.',
      });
    }, 1000); */
  }
}
