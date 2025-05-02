import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        pageSize: 8,
        country: "us",
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

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Apinews `;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/everything?q=tesla=${this.props.category}&from=2024-10-28&sortBy=publishedAt&apiKey=17ccfc816a024582aa108b0db9487ac2&page=1&pagesize=${this.props.pageSize}`;
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
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsApi - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles?.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles?.length !== this.state.totalResults}
                    loader={<Spinner />}>

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

            </ >
        );
    }
}

export default News;
