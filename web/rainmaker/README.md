## Rainmaker
Below are the steps to run project in dev and production, first time user should install lerna as global dependency, below is the command.

Note : Node should be above version 8. 

```
$ npm install --global lerna

```


### Steps for development
+ Step 1 - lerna bootstrap will link dependencies in the repo together

```
$ lerna bootstrap

```

+ Step 2 - Compile all the apps

```
$ npm run go

```

+ Step 3 - if you want to run citizen

```
$ npm run dev:citizen

```

or

+ Step 2 - if you want to run employee

```
$ npm run dev:employee

```

### Steps for production
+ Step 1 - lerna bootstrap will link dependencies in the repo together

```
$ lerna bootstrap

```

+ Step 2 - if you want to build citizen

```
$ npm run prod:citizen

```

or

+ Step 2 - if you want to build employee

```
$ npm run prod:employee

```

### by
Murali M
