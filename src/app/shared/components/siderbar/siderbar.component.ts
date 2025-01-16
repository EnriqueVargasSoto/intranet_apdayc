import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements OnInit {

  @Input() collapsed: BehaviorSubject<boolean> | undefined;

  token: string = '';

  ngOnInit(): void {
      this.token = localStorage.getItem('token') || '';
  }
}
