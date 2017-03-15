var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user : 'monu-wats',
    database : 'monu-wats',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password :  'db-monu-wats-31710'//process.env.DB_PASSWORD 
    
};
var app = express();
app.use(morgan('combined'));
var articles = {
       'article-one' : {
        title: 'article-one',
        heading: 'Article1',
        date: '5 Sep 2016',
        content:`<p>Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.</p>
                <img  style = "margin-left:400px" src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMll5YEJ0nClij7eyjrn67BTCinSdCcE6ItiahhKpEceEWsMIW" alt = "image of article" class = "width">
                <p>Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding</p>`
        },
        'article-two' : {
        title: 'article-two',
        heading: 'Article2',
        date:'5 Sep 2016',
        content:`<p>Article Two Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.</p>
                <img  style = "margin-left:400px" src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMll5YEJ0nClij7eyjrn67BTCinSdCcE6ItiahhKpEceEWsMIW" alt = "image of article" class = "width">
                <p>Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding</p>`
    },
    'article-three' : {
        title: 'article-three',
        heading: 'Article3',
        date:'5 Sep 2016',
        content:`<p>Article three Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.</p>
                <img  style = "margin-left:400px" src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMll5YEJ0nClij7eyjrn67BTCinSdCcE6ItiahhKpEceEWsMIW" alt = "image of article" class = "width">
                <p>Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding</p>`
    }
};
function createTemplate(data)
{
    title = data.title;
    heading = data.heading;
    date = data.date;
    content = data.content;
    var htmlTemplate = `
        <html>
        <head>
            <link href="/ui/style.css" rel="stylesheet" type = "text/css"/>
            <title>${title}</title>
            <style type="text/css">
            .width{
                width : 500px;
                padding : 10px; 
            }
            <meta name = "viewport" content="width=device-width,inital-scale=1" />
            </style>
        </head>
        <body style = "background-color: silver">
            <div class="decorate">
                <a href = "/" style = "color:green">Home</a>
                <hr/>
                <h3>${heading}</h3>
                <div>${data.toDateString()}</div>
                ${content}
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
var counter = 0;
app.get('/counter',function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
   //make a select request 
   //return response with the results
   pool.query('SELECT * FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
   });
});
app.get('/resume',function(req,res){
    res.sendFile(path.join(__dirname,'ui','resume.html'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/article/:articleName',function(req,res){
    //articleName = article-one
    pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'",function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            }
            else{
                var articleData = result.row[0];
                res.send(createTemplate(articleData));
            }
        }
    });
   
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
