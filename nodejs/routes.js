const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');

const productModel = mongoose.model('product');

router.route('/product').get((req, res, next) => {
    productModel.find({}, (err, products) => {
        if(err) return res.status(500).send('DB hiba!');
        res.status(200).send(products);
    })
}).post((req, res, next) => {
    if(req.body.id && req.body.name && req.body.price) {
        productModel.findOne({id: req.body.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba!');
            if(product) {
                return res.status(400).send('Hiba, már létezik ilyen termék!');
            }
            const prdct = new productModel({id: req.body.id, name: req.body.name, 
                price: req.body.price});
                prdct.save((error) => {
                if(error) return res.status(500).send('A mentés során hiba történt!');
                return res.status(200).send(prdct);
            })
        })
    } else {
        return res.status(400).send('Hibás kérés, id, name és price kell!');
    }
}).put((req, res, next) => {
    if(req.body.id && req.body.name && req.body.price) {
        productModel.findOne({id: req.body.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba!');
            if(product) {
                product.name = req.body.name;
                product.price = req.body.price;
                product.save((error) => {
                    if(error) return res.status(500).send('A módosítás során hiba történt!');
                    return res.status(200).send('Sikeres módosítás történt!');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban!');
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy name vagy price!');
    }
})

router.route('/product/:id').get((req,res) => {
    if(req.params.id) {
        productModel.findOne({id: req.params.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba!');
            res.status(200).send(product);
        })
    }
})

router.route('/product/:id').put((req,res) => {
    if(req.params.id && req.body.id && req.body.name && req.body.price) {
        productModel.findOne({id: req.params.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba!');
            if(product) {
                product.id = req.body.id;
                product.name = req.body.name;
                product.price = req.body.price;
                product.save((error) => {
                    if(error) return res.status(500).send('A módosítás során hiba történt!');
                    return res.status(200).send(product);
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban!');
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy name vagy price!');
    }
})

router.route('/product/:id').delete((req, res)=>{
    if(req.params.id) {
        productModel.findOne({id: req.params.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba!');
            if(product) {
                product.delete((error) => {
                    if(error) return res.status(500).send('A törlés során hiba történt!');
                    return res.status(200).send('Sikeres törlés történt!');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban!');
            }
        })
    } else {
        return res.status(400).send('Nem volt id!');
    }
  }
);

module.exports = router;