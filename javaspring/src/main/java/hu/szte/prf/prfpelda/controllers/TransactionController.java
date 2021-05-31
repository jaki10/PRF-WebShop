package hu.szte.prf.prfpelda.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.prf.prfpelda.models.Transaction;
import hu.szte.prf.prfpelda.models.TransactionService;

@RestController
@RequestMapping
public class TransactionController {
    
    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    
    @PostMapping(path="/transaction", consumes = "application/json")
    public Transaction newTransaction(@RequestBody Transaction transaction) {
        try {
            this.transactionService.addTransaction(transaction);;
            return transaction;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransaction() {
        try {
            return this.transactionService.getAllTransactions();
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/transaction")
    public Transaction getTransactionById(@RequestParam int id) {
        try {
            return this.transactionService.getTransactionById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/transaction")
    public String deleteTransactionById(@RequestParam int id) {
        try {
            this.transactionService.deleteTransactionById(id);;
            return "Delete Successful";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during deletion";
        }
    }
}
