import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
            <span className='position-absolute top-0 translate-middle badge rounded-pill bg-dark'
            style={{left: "90%",zIndez: '1'}}
            >
              {!source?"Unknown":source}
            </span>
            <img src={!imageUrl?"https://images.indianexpress.com/2022/05/Google-IO-2022.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'>By {!author? "unknown" : author} on {new Date(date).toGMTString()} </small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more </a>
            </div>
        </div>
      </div>
    )
  }
}
