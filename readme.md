# Web Page Archiver

## Prerequisite
---
- NodeJS Version 12 or grater.

## Steps to run the application
---
- Clone repository using git command or download as zip.
- Open command line and go to root folder of the repository
- Run command ```npm install```
- After this command you can start using the application by ```node dist/app.js [--metadata] <website-links...>``` 
- for example 
    - ```node dist/app.js https://google.com```
    -  ```node dist/app.js --metadata https://google.com```

---
## Run using docker by following way
---
#### Docker build command 
```docker build . --rm -t webpage-archiver-image```

#### Docker run command 
```docker run --name webpage-container -it -d --rm webpage-archiver-image```

#### Get inside docker bash using following command
```docker exec -it webpage-container bash```

#### To experiment with the application you use following commands inside docker bash
- ```ls```
- ```node dist/app.js https://google.com https://autify.com```
- ```node dist/app.js --metadata https://google.com https://autify.com```
- ```exit```

