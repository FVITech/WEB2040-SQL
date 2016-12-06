#1:
`db.movieDetails.find({rated: 'PG-13', year:2013, 'awards.wins':0},{title:1})`

#2:
``

#3
`db.movieDetails.find({'countries.1':'Sweden'}).count()`

#4
`db.movieDetails.find({'genres':{$in:['Comedy', 'Crime']}}).count()`

#5
`db.movieDetails.find({'genres':{$all:['Comedy', 'Crime']}}).count()`

# Challege 1
``

#Challenge 2
``
