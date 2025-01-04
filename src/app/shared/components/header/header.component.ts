import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown, DropdownInterface, DropdownOptions, InstanceOptions } from 'flowbite';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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

  constructor(private authService: AuthService, private router: Router){}

  get currentTheme(): Theme {
    return this.theme.value;
  }

  toggleCollapsed() {
    this.buttonClickToggleCollapsed.emit();
  }

  toggleTheme() {
    this.buttonClickToggleTheme.emit();
  }

  desplegar(){
    // set the dropdown menu element
    const $targetEl: HTMLElement = document.getElementById('dropdown')!;

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = document.getElementById('user-menu-button')!;

    // options with default values
    const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
            console.log('dropdown has been hidden');
        },
        onShow: () => {
            console.log('dropdown has been shown');
        },
        onToggle: () => {
            console.log('dropdown has been toggled');
        },
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'dropdownMenu',
      override: true
    };

    /*
    * targetEl: required
    * triggerEl: required
    * options: optional
    * instanceOptions: optional
    */
    const dropdown: DropdownInterface = new Dropdown(
        $targetEl,
        $triggerEl,
        options,
        instanceOptions
    );

    // show the dropdown
    dropdown.show();
  }

  logout(){
    this.authService.logout();
    return this.router.navigate(['login']);
  }
}
