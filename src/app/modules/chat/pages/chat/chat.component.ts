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
    { name: 'Conversación 2', messages: [{ sender: 'bot', text: '¿Tienes alguna consulta?' }] },
  ];
  selectedConversation: Conversation | null = null;
  messageText: string = '';

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
    this.messageText = '';

    // Simulate bot response
    setTimeout(() => {
      this.selectedConversation?.messages.push({
        sender: 'bot',
        text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.',
      });
    }, 1000);
  }
}
