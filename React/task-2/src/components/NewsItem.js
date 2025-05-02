import React, {Component} from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
       <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'
          }}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
            <img src={!imageUrl ? "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=17ccfc816a024582aa108b0db9487ac2": imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author? "Unknown": author} on {new Date(date).toGMTString()} 3 mins ago</small></p>
                <a rel="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
    </div>
    );
  }
  }

export default NewsItem;
