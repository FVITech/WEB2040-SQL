#WEB2040: Databases

This course emphasizes what developers need to know about SQL. Students go through ample practice with nested selects and joins, loading pre-existing datasets into a sql database using the shell, locating and fixing errors in a table, understanding foreign keys and relationships between entities, and creating tables of appropriate data types. An intro to noSQL is also given, with some basic exercises. This course also serves as a Node.JS introduction and AJAX refresher, as students develop CRUD APIs on nodeJS working on a SQL database as well as on noSQL.

##Summary
1. Intro and mariaDB shell, database terms, creating tables and inserting data
2. Select intro, nesting selects intro
3. Nesting Selects, Select Distinct, computed columns, intro to joins
4. Build CRUD application
5. Exam 1
6. DB Theory - normalization, entities, etc
7. Joins Review and unions
8. Joins Practice and exam 2
9. Intro to Mongo
10. Mongo part 2, introducing mongoose
11. Mongoose Crud application
12. Unit Final Exam



##Homework for the Unit
1. Complete the Codecademy SQL course.
2. Complete the TeamTreehouse SQL basics course.
3. Complete the TeamTreehouse "Modifying Data with SQL" course

##Day 1
We do an intro to database concepts and the mariadb shell based on [this presentation](https://docs.google.com/presentation/d/1SKhE9PII6utJ8Wnd6ujx2WRZYdo09y__E72CWBNsFwo/edit?usp=sharing)

##Day 2
1. Write a query which returns the number of housing units for sale in each region on every month of January since 1983:  
  Solution: select * from tutorial.us_housing_units WHERE year >= 1983 AND month = 1SELECT * FROM tutorial.us_housing_units WHERE month = <current> AND year = <one prior>
2. Select all the month data starting on january of last year.  
  Solution: SELECT * FROM tutorial.us_housing_units WHERE year >= 2014
3. Select the sum of all available housing units every month through the financial crisis (2008 and onward)
  Solution: SELECT year, month, south+west+midwest+northeast FROM tutorial.us_housing_units WHERE year >= 2008
4. Look up the total national housing units in years of crisis: 1979, 1987, 2001, 2008
  Solution: SELECT year, month, south+west+midwest+northeast AS "Total Units" FROM tutorial.us_housing_units WHERE year IN (1979, 1987, 2001, 2008)
5. Unguided: Find the total housing units available in the last quarter (per month) of every year since 2003
  Solution: SELECT year, month, south+west+midwest+northeast AS "Total Units" FROM tutorial.us_housing_units WHERE year >= 2003 AND month >= 10
6. Refactor above query to restrict fields and relabel to year, month (month name) and each region:
  Solution: SELECT month_name, year, south+west+midwest+northeast AS "Total Units" FROM tutorial.us_housing_units WHERE year >= 2003 AND month >= 10
7. Get the YEARLY sums of each region since 1987. Display the following columns: year, sum-midwest, sum-northeast, sum-south, sum-west. Make sure results are sorted.
  Solution:
  SELECT year, SUM(south), SUM(west), SUM(midwest), SUM(northeast)
  FROM tutorial.us_housing_units
  WHERE year >= 1987
   GROUP BY year
  ORDER BY year
8. Now modify that query from above so you get the yearly AVERAGE rather than sum. Round to the nearest hundredth.
  Solution:
  SELECT year, ROUND(CAST(AVG(south) AS numeric),2) AS "South",
  ROUND(CAST(AVG(west) AS numeric) ,2) as "West",
  ROUND(CAST(AVG(midwest) AS numeric),2) as "Midwest",
  ROUND(CAST(AVG(northeast) AS numeric),2) AS "Northeast"
  FROM tutorial.us_housing_units
  WHERE year >= 1987
  GROUP BY year
  ORDER BY year

9. Unguided: Get the companies from crunchbase.companies which are located in the los angeles region. Show all columns.
  Solution: SELECT * FROM crunchbase.companies WHERE city = 'Los Angeles'
10. Unguided: Create a table where you show the name and total funding raised (value of funding_total_usd column) for all Miami based companies.
  Solution: SELECT name, funding_total_usd FROM crunchbase.companies WHERE city = 'Miami'
11. Order by intro, guided: Now take the above query and sort it from greatest fund raising to lowest.
  Solution: SELECT name, funding_total_usd FROM crunchbase.companies WHERE city = 'Miami' order by funding_total_usd desc
12. Guided: Get the miami companies and their funding, sorted from most funded to least.
  SELECT name, funding_total_usd AS funding
  FROM tutorial.crunchbase_companies
  WHERE region = 'Miami'
  order by funding desc
13. In the tutorial.crunchbase_investments table, find all angel investor
activity in Miami. The type of investor is in the funding_round_type column. Show the company name, investor name, and raised amount. Sort it by the raised amount (desc).
  SELECT company_name, investor_name, raised_amount_usd
  FROM tutorial.crunchbase_investments
  WHERE investor_region = 'Miami' AND raised_amount_usd > 0 AND funding_round_type = 'angel'
  order by raised_amount_usd desc
14. (Unguided) Use the tutorial.crunchbase_investments table to find the total amount raised by each company in Miami. In your results, show the company name, and the total amount raised. Sort by amount raised (greater to smaller)
  SELECT company_name, SUM(raised_amount_usd) AS raised_amount
  FROM tutorial.crunchbase_investments
  WHERE company_region = 'Miami' AND raised_amount_usd > 0
  group by company_name
  order by raised_amount desc
15. (Unguided) Use the tutorial.crunchbase_investments table to find the total amount raised in Miami per company category. In your results, show each company category and the amount of money that has been invested into it.
  SELECT company_category_code, SUM(raised_amount_usd) AS raised_amount
  FROM tutorial.crunchbase_investments
  WHERE company_region = 'Miami' AND raised_amount_usd > 0
  group by company_category_code
  order by raised_amount desc
16. Cover the concept of nesting Selects.
17. Use the tutorial.crunchbase_investments table to find all the companies nationwide which have raised more money than brightstar

  SELECT company_name, SUM(raised_amount_usd) AS raised_amount
  FROM tutorial.crunchbase_investments
  group by company_name
  having SUM(raised_amount_usd) > (SELECT SUM(raised_amount_usd)
                                  from tutorial.crunchbase_investments
                                  WHERE company_name = 'Brightstar'
                                  group by company_name)
  order by raised_amount desc
18. Use the tutorial.crunchbase_investments table to find the 10 investors with the most money invested:
SELECT * from (SELECT investor_name, SUM(raised_amount_usd) AS "investment" from tutorial.crunchbase_investments
          group by investor_name order by investment desc) AS foo
          WHERE foo.investment > 0



## Day 9: [Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/)


1. CRUD in the [mongoshell](https://docs.mongodb.com/manual/reference/operator/query)

2. Find, field selection, gt, lt, exist, querying inside of arrays, in, all, dot notation, where

3. Unguided: Do Mongo Shell exercises on MongoU

## Day 10: Mongoose and Schema Design

1. [Design User Model](scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

  1. Prototype refresher on codeschool
  2. Explain the concepts of Schemas and Models
  >In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document. It's a way to express expected properties and values as well as constraints and indexes. A model defines a programming interface for interacting with the database (read, insert, update, etc). So a schema answers "what will the data in this collection look like?" and a model provides functionality like "Are there any records matching this query?" or "Add a new document to the collection".

  3. Review objects and how mongoose has keywords
  4. Setup a Project
  5. Develop Schemas and check the mongo shell

2. [Design Book Schemas](https://www.udemy.com/mongoosejs-essentials)

3. Unguided: [Kitten Schemas ](http://mongoosejs.com/docs/)

## Day 11: [Designing Mongoose REST API](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/):
>>>>>>> c40be08020a104946531d74736d0a0c77ad76ecc
