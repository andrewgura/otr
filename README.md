App.js uses `express` and `body-parser` to help create the API in a simple fashion,
so a `npm install` is required to run it.


## (1)

To run the file parse from command line, navigate to the folder it is in and make sure
the text file is also in that same directory.

To run each type of sort, run them as

```
node parseFile.js textfile.txt gender
node parseFile.js textfile.txt birthdate
node parseFile.js textfile.txt name
```
`textfile.txt` can be changed to what ever textfile you want to run

## (2)

To access the API routes, first make sure you did a `npm install` then
in the command line, run `node app.js`

The routes are

```
http://localhost:3000/records/birthdate
http://localhost:3000/records/gender
http://localhost:3000/records/name
```

To use the post request, I used postman and under the Body tab, used `x-www-form-urlencoded`
The request keys are:
lastName
firstName
gender
color
dob

For the API, the text file you are reading/writing to assumes is called `textfile.txt` unless you change it manually
