import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-popover',
  templateUrl: './custom-popover.component.html',
  styleUrls: ['./custom-popover.component.scss'],
})
export class CustomPopoverComponent implements OnInit {

  @Input() triggerId: string = '';
  constructor() { }

  ngOnInit() { }

}
