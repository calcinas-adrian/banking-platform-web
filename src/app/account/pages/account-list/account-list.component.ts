import { Component, inject, OnInit, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountTableListComponent } from './account-table-list/account-table-list.component';
import { Account, AccountTableResponse } from '../../../models';
import { AccountService } from '../../../service/account.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-list',
  imports: [AccountTableListComponent, CreateAccountComponent],
  templateUrl: './account-list.component.html',
})
export default class AccountListComponent implements OnInit {
  id = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => +params['userId']))
  );

  accountList = signal<AccountTableResponse[]>([]);

  private accountService = inject(AccountService);

  ngOnInit(): void {
    const userId = this.id();
    if (!userId || isNaN(userId)) {
      return;
    }
    this.accountService
      .getByUser(userId)
      .pipe(tap((accounts) => this.accountList.set(accounts)))
      .subscribe();
  }
}
