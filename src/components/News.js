import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(){
        super();
        console.log("This is constructor of news component");
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=da8a69033e81444fa4ca4a2909d0db5a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData); 
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResult,
            loading: false
        })
    }

    handlePreviousClick = async () => {
        console.log("previous");

        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=da8a69033e81444fa4ca4a2909d0db5a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData); 
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("next");

        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=da8a69033e81444fa4ca4a2909d0db5a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }
  render() {
    return (
      <div className='container my-3'>
          <h1 className='text-center'>NewsBuddy- Top headlines</h1>
          {this.state.loading && <Spinner />}
          <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>  
          })}          
          </div> 
          <div className='container d-flex justify-content-between'>
              <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    ) 
  }
}
