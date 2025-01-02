import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light');
  @Input() collapsed: BehaviorSubject<boolean> | undefined;

  @Output() buttonClickToggleCollapsed = new EventEmitter<void>();
  @Output() buttonClickToggleTheme = new EventEmitter<void>();

  toggleCollapsed() {
    this.buttonClickToggleCollapsed.emit();
  }

  toggleTheme() {
    this.buttonClickToggleTheme.emit();
  }
}
