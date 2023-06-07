const express= require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hello wordl')
})

//test 입니당.
module.exports = app;