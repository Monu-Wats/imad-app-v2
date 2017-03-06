var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
       'article-One' : {
        title: 'article-one',
        heading: 'Article1',
        date: '5 Sep 2016',
        content:`<p>Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.</p>
                <img  style = "margin-left:400px" src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMll5YEJ0nClij7eyjrn67BTCinSdCcE6ItiahhKpEceEWsMIW" alt = "image of article" class = "width">
                <p>Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding</p>`
        },
        'article-Two' : {
        title: 'article-two',
        heading: 'Article2',
        date:'5 Sep 2016',
        content:`<p>Article Two Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.Article One Is very Popular.</p>
                <img  style = "margin-left:400px" src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMll5YEJ0nClij7eyjrn67BTCinSdCcE6ItiahhKpEceEWsMIW" alt = "image of article" class = "width">
                <p>Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding.Article One Is outstanding</p>`
    },
    'article-Three' : {title: 'article-three',
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
                <div>${data}</div>
                ${content}
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName',function(req,res){
    //articleName = article-one
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
