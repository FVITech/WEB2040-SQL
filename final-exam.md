# WEB2040 Final Exam

1. Which of the following is a valid insert statement in mongodb? (5 pts)  
    1. db.test.insert({x:2,y:"apple"})  
    2. db.test.push({x:2,y:"apple"})  
    3. db.test.insert({"x":2} {"y":"apple"})  
    4. db.test.insert({"x":2}, {"y":"apple"})  

2. Given a collection named books within a database named library, write the statement you would use to query all the contents of the collection in such a way that the results are displayed in JSON format with one property-value pair per line. (5 pts)   

    Dada una coleccion llamada books dentro de una base de datos llamada library, escriba el comando que usted utilizaria para extraer todos los contenidos de la coleccion de tal manera que los resultados salgan en formato JSON con una propiedad por linea (resultados impresos de forma bonita).  


3. A query may include a ___________ that specifies the fields from the matching documents to return. (5 pts)  
    a. selection  
    b. projection  
    c. union  
    d. None of the mentioned  

4. MongoDB stores all documents in: (5 pts)   
    a. tables  
    b. collections  
    c. rows  
    d. All of the mentioned  

5. If you want to **change** an existing collection in mongodb, you must use the following command: (5 pts)  
    a. insert  
    b. delete then insert  
    c. update  
    d. None of the above  

6. Given a collection named students, where the documents have first_name and last_name properties, how would you write a mondogb query that looks up all students with the last name "Castro"? (5 pts)  

    Dada una coleccion llamada students, donde los documentos tienen campos de nombre first_name y last_name, como escribiria un query en mongodb para encontrar a todos los estudiantes que tengan el apellido "Castro"?

8. Do all the problems in this page: http://sqlzoo.net/wiki/Guest_House_Assessment_Easy (40 pts)

9. Do any two of the problems on this page: http://sqlzoo.net/wiki/Guest_House_Assessment_Medium (20pts)

10. Create a node project named notes-backend. This project should meet the following criteria:
    1. There should be a **Note** model that has the following attributes:
        1. Decription
        2. Created Date
        3. Author
    2. The server should connect to mongodb using mongoose
    3. There should be a route capable of displaying all the contents of a database called notes-app and a collection called notes. The results should be sent back to the client in json format. The route should be called "showallnotes"
    4. Put the answers to the text questions and the screenshots to the results of the SQL problems in this repo, then submit to Canvas.
