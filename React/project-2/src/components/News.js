import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        pageSize: 8,
        country: "in",
        category: "general",
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        searchQuery: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsLion `;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17ccfc816a024582aa108b0db9487ac2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    // fetchMoreData = async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: this.state.articles.concat(parsedData.totalResults),
    //         page: this.state.page + 1,
    //     });
    // };

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }
    
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    render() {

        const { searchQuery } = this.props;
        const filteredArticles = this.state.articles?.filter(
            (article) => {
                const title = String(article.title);
                const normalizedSearchQuery = (searchQuery ?? "").toLowerCase();
                return title.toLowerCase().includes(normalizedSearchQuery);
            }
        );

        return (

            <>

                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsLion - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                {/* <div className="row">
                    {!this.state.loading && this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div> */}

                <InfiniteScroll
                    dataLength={this.state.articles?.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles?.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container my-4">
                        <div className="row">
                            {filteredArticles?.length > 0 ? (
                                filteredArticles.map(element => (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 45) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                ))
                            ) : (
                                !this.state.loading && (
                                    <div className="col-12 text-center">
                                        <h3>No news available</h3>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </ >
        );
    }
}

export default News;
