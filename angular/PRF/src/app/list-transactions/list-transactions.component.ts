import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Itransaction } from '../interfaces/itransaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  adminEmail: String = "admin@gmail.com";
  transactions: Itransaction[] = [];
  loading = true;

  constructor(private _transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
        this._transactionService.getTransactions()
          .subscribe(transactions => {
            this.loading = false;
            this.transactions = transactions;
          });
  }

}
