import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { ViewAccountsAndBalancesComponent } from '../../components/view-accounts-and-balances/view-accounts-and-balances.component';

@Component({
  selector: 'app-operator-accounts',
  imports: [TopBarComponent, ViewAccountsAndBalancesComponent],
  templateUrl: './operator-accounts.component.html',
})
export default class OperatorAccountsComponent {
  mainLinks = [
    { name: 'Cuentas', url: '/operator/accounts', icon: 'account_circle' },
    {
      name: 'Transacciones',
      url: '/operator/transactions',
      icon: 'monetization_on',
    },
  ];
}
