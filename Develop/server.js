// these functions should adapt the original file to a redux connection

// var path = require('path')
// var Express = require('express')
// var React = require('react')
// var { createStore } = require('redux')
// var { Provider } = require('react-redux')
// var counterApp = require('./reducers')
// var App = require('./containers/App')
// var {renderToString} = require('react-dom/server')
import qs from 'qs'
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers'
import App from './containers/App'

const app = Express()
const port = 4000

app.use('/static', Express.static('static'))

app.use(handleRender)

function handleRender(req, res) {
    const store = createStore(counterApp)

    const html = renderToString(
        // store={store}
        <Provider store={store}>
            <App />
        </Provider>
    )
    const preloadedState = store.getState()

    res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WeatherForecast</title>
        <link rel="stylesheet" href=".\assets\css\Weather.css">
    </head>
    <body>
        <header class="header">{${html}}</header>
        
        <div class="content">
            <div class="search">
                <h2>Enter a city</h2>
                <input type="text" id="searchBar" class="searchBar">
                <button id="searchBTN" class="searchBTN">Search</button>
                <div id="citySearch" class="citySearch"></div>
            </div>

            <div class="citySelect">
                <img class="cityPhoto" src="">
                <select id="citiesChoice" class="cities">
                    <option value="Nashville">Nashville</option>
                    <option value="Knoxville">Knoxville</option>
                    <option value="Memphis">Memphis</option>
                    <option value="Chattanooga">Chattanooga</option>
                    <option value="Murfreesboro">Murfreesboro</option>
                    <option value="Clarksville">Clarksville</option>
                </select>
                <button id="searchBTN" class="searchBTN">Search</button>
            </div>

            <div class="weather">
                <div id="cityData" class="cityData" >City Data</div>
                <div class="fiveDays">
                    <div id="dayOne" class="day"></div>
                    <div id="dayTwo" class="day"></div>
                    <div id="dayThree" class="day"></div>
                    <div id="dayFour" class="day"></div>
                    <div id="dayFive" class="day"></div>
                </div>
            </div>
        </div>   
    </body>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace}</script>
    `
}

app.listen(port)

// this link helped me out https://redux.js.org/usage/server-rendering