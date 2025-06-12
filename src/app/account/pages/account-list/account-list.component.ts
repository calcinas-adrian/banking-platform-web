import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountTableListComponent } from './account-table-list/account-table-list.component';
import { Account } from '../../../models';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-account-list',
  imports: [AccountTableListComponent, CreateAccountComponent],
  templateUrl: './account-list.component.html',
})
export default class AccountListComponent implements OnInit {
  accountList = signal<Account[]>([]);

  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService
      .getAll()
      .pipe(tap((accounts) => this.accountList.set(accounts)))
      .subscribe();
  }
}
