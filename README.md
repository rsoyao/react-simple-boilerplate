Chatty App using React
=====================

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Express

### Screenshots

![Screenshot of one user](https://github.com/rsoyao/react-simple-boilerplate/blob/cbcfc6cf35f9540fcd5fb775425200666b36cc91/docs/oneUser.png)
![Screenshot of a new user with a different username](https://github.com/rsoyao/react-simple-boilerplate/blob/cbcfc6cf35f9540fcd5fb775425200666b36cc91/docs/oneUser.png)