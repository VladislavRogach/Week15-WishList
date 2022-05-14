const express = require('express');
const Wish = require('./model/wish');

const app = express();

app.set('view engine', 'ejs');
app.unsubscribe(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    Wish.fetchAllWishes(WishesFromFile => {
        console.log(WishesFromFile);
        res.render('index', {myWishes: WishesFromFile});
    });

});

app.post('/wish', (req, res) => {
    let userData = req.body.userWish;

    let newWish = new Wish(userData);
    newWish.saveWish();
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});