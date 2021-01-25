import './App.css';
import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { withRouter } from "react-router";
import axios from 'axios'
import Home from './components/Home'
import Browse from  './components/Browse'
import EditUser from './components/EditUser';
import MyReviews from './components/MyReviews'
import Watchlist from './components/Watchlist'
import NavBar from './components/NavBar'
import Movie from './components/Movie'
import NotFound from './components/NotFound'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {reviews: [], watchlists: []},
      movies: [],
      selectedMovie: {reviews: []},
      reviews: []
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  checkLoginStatus(){
    axios.get('http://localhost:3001/logged_in', { withCredentials: true }).then(response => {
      console.log('logged in?', response.data.user)
      if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN'){
        this.setState({
          loggedInStatus: 'LOGGED_IN',
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN'){
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {}
        })
      }
    }).catch(error => {
      console.log('check login error', error)
    })
  }

  componentDidMount(){
    this.checkLoginStatus()
    fetch('http://localhost:3001/movies')
    .then(r => r.json())
    .then(movies => this.setState({
      movies
    }))
    fetch('http://localhost:3001/reviews')
    .then(r => r.json())
    .then(reviews => this.setState({
      reviews
    }))
  }

  handleLogout(){
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  handleMovieClick = (movie) => {
    this.setState({
      selectedMovie: movie
    },localStorage.setItem('selectedMovie', JSON.stringify(movie)))
  }

  handleAddToWatchlist = (movie) => {
    console.log(movie)
    this.setState(prevState => ({
      user: {...prevState.user, watchlists: [...prevState.user.watchlists, movie]}
    }))
  }

  handleRemoveFromWatchlist = (movie) => {
    // console.log(movie)
    this.setState(prevState => ({
      user: {...prevState.user, watchlists: prevState.user.watchlists.filter(m => m.movie.id !== movie.id)}
    }))
  }

  handleRemoveFromWatchlistFromWatchlist = (movie) => {
    this.setState(prevState => ({
      user: {...prevState.user, watchlists: prevState.user.watchlists.filter(m => m.id !== movie.id)}
    }))
  }

  handleAddReview = (review) => {
    this.setState(prevState => ({
      user: {...prevState.user, reviews: prevState.user.reviews, review}
    }))
    fetch('http://localhost:3001/reviews')
        .then(r => r.json())
        .then(reviews => this.setState({
        reviews
      }))
  }

  handleRemoveReview = (review) => {
    this.setState(prevState => ({
      user: {...prevState.user, reviews: prevState.user.reviews.filter(r => r.id !== review.id)}
    }))
  }

  getMovie = () => {
    if(Object.keys(this.state.selectedMovie).length > 1){
      return this.state.selectedMovie
    }
    else{
      return JSON.parse(localStorage.getItem('selectedMovie'))
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App">
        {this.state.loggedInStatus === "LOGGED_IN" ? <NavBar loggedInStatus={this.state.loggedInStatus}/> : null}
        {/* <BrowserRouter> */}
          <Switch>
            <Route exact path={'/'} render={props => ( 
              <Home {...props} 
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                loggedInStatus={this.state.loggedInStatus} 
                user={this.state.user}/>)} />
            <Route exact path={'/browse'} render={props => ( 
              <Browse {...props} 
                user={this.state.user} 
                loggedInStatus={this.state.loggedInStatus} 
                movies={this.state.movies} 
                handleMovieClick={this.handleMovieClick}
                handleRemoveFromWatchlist={this.handleRemoveFromWatchlist}/>)}/>
            <Route exact path={'/edit_user'} render={props => (
              <EditUser {...props} 
                user={this.state.user} 
                loggedInStatus={this.state.loggedInStatus} 
                handleLogout={this.handleLogout}/>)}/>
            <Route exact path={'/myreviews'} render={props => (
              <MyReviews {...props}
                handleRemoveReview={this.handleRemoveReview}
                handleMovieClick={this.handleMovieClick}
                user={this.state.user}/>)}/>
            <Route exact path={'/watchlist'} render={props => (
              <Watchlist {...props}
                handleMovieClick={this.handleMovieClick}
                handleRemoveFromWatchlist={this.handleRemoveFromWatchlistFromWatchlist}
                user={this.state.user}/>)}/>
            <Route path={`/movies/:id`} render={props => (
              <Movie {...props} 
                movie={this.getMovie()}
                user={this.state.user} 
                reviews={this.state.reviews} 
                handleAddReview={this.handleAddReview}
                handleAddToWatchlist={this.handleAddToWatchlist}
                handleRemoveFromWatchlist={this.handleRemoveFromWatchlist}
                />)}/>
            <Route component={NotFound}/>
          </Switch>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}

export default withRouter(App);
