import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 10;
  apikey = process.env.REACT_APP_NEWS_API;
  state = {
    searchQuery: "",
  };

  setProgress = (progress) => {
    this.setState({progress: progress})
  };
  
  handleSearch = (query) => {
    this.setState({ searchQuery: query });
    // console.log(query);
  };

  render() {
    return (
      <div>
        <Router>
        <Navbar onSearch={this.handleSearch} />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="us" category="business"/>}/>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}/>
          <Route path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="us" category="general"/>}/>
          <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="us" category="health"/>}/>
          <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="us" category="science"/>}/>
          <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="us" category="sports"/>}/>
          <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="us" category="technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}
