const express = require('express');
const auth = require('./middleware/auth');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use(auth)

app.use('/api/accounts', require('./api/accounts'))
app.use('/api/employees', require('./api/employees'))


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
