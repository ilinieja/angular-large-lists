import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
