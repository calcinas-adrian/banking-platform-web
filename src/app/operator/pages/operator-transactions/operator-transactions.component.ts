import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-operator-transactions',
  imports: [TopBarComponent],
  templateUrl: './operator-transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OperatorTransactionsComponent {
  mainLinks = [
    { name: 'Cuentas', url: '/operator/accounts', icon: 'account_circle' },
    {
      name: 'Transacciones',
      url: '/operator/transactions',
      icon: 'monetization_on',
    },
  ];
}
