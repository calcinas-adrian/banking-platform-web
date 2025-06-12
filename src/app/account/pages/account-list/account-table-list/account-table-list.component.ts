import { Component, input } from '@angular/core';
import { Account } from '../../../../models';

@Component({
  selector: 'app-account-table-list',
  imports: [],
  templateUrl: './account-table-list.component.html',
})
export class AccountTableListComponent {
  accountList = input.required<Account[]>();
}
