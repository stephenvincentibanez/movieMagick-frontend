import './App.css';
import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Browse from  './components/Browse'
import EditUser from './components/EditUser';
import MyReviews from './components/MyReviews'
import Watchlist from './components/Watchlist'
import NavBar from './components/NavBar'
import Movie from './components/Movie'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {reviews: []},
      movies: [],
      selectedMovie: {},
      // watchlists: [],
      reviews: []
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  checkLoginStatus(){
    axios.get('http://localhost:3001/logged_in', { withCredentials: true }).then(response => {
      console.log('logged in?', response.data.user)
      // debugger
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
    // fetch('http://localhost:3001/watchlists')
    // .then(r => r.json())
    // .then(watchlists => this.setState({
    //   watchlists
    // }))
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
    })
  }

  handleAddToWatchlist = (movie) => {
    axios.post('http://localhost:3001/watchlists', {
            watchlist: {user_id: this.state.user.id, movie_id: movie.id}
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created'){
                // this.props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log('add watchlist error', error)
        })

    // this.setState({
    //   watchlist: [...this.state.watchlist, movie]
    // })
  }

  handleRemoveFromWatchlist = (movie) => {
    this.setState({
      watchlist: [...this.state.watchlist.filter(movie => movie !== movie)]
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedInStatus === "LOGGED_IN" ? <NavBar loggedInStatus={this.state.loggedInStatus}/> : null}
        <BrowserRouter>
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
                handleMovieClick={this.handleMovieClick}/>)}/>
            <Route exact path={'/edit_user'} render={props => (
              <EditUser {...props} 
                user={this.state.user} 
                loggedInStatus={this.state.loggedInStatus} 
                handleLogout={this.handleLogout}/>)}/>
            <Route exact path={'/myreviews'} render={props => (
              <MyReviews {...props} 
                user={this.state.user}/>)}/>
            <Route exact path={'/watchlist'} render={props => (
              <Watchlist {...props}
                user={this.state.user}/>)}/>
            <Route path={`/movies`} render={props => (
              <Movie {...props} 
                movie={this.state.selectedMovie} 
                user={this.state.user} 
                reviews={this.state.reviews} 
                handleAddToWatchlist={this.handleAddToWatchlist}
                handleRemoveFromWatchlist={this.handleRemoveFromWatchlist}
                watchlist={this.state.watchlist}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
