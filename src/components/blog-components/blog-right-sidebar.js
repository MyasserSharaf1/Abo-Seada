import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Function to load Google Maps script
const loadScript = (url) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
};

const BlogList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news data from the API
    axios.get(`https://newsapi.org/v2/everything?q=real+estate&apiKey=470a3260743546f5a041a5fa4a79b3b5`)
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.error("There was an error fetching the news!", error);
      });

    // Load Google Maps script
    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAUiJE6e5OnFUXcHLr9EbZB0Wh5UvQ-i-E&callback=initMap`);
    window.initMap = initMap;
  }, []);

  const initMap = () => {
    new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  };

  let publicUrl = process.env.PUBLIC_URL + '/';
  return (
    <div className="ltn__blog-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12"> {/* Make this column full width */}
            <div className="ltn__blog-list-wrap">
              {news.map((article, index) => (
                <div className="ltn__blog-item ltn__blog-item-5 go-top" key={index}>
                  <div className="ltn__blog-img">
                    <a href={article.url} rel="noopener noreferrer">
                      <img src={article.urlToImage || publicUrl + "assets/img/blog/default.jpg"} alt="Image" />
                    </a>
                  </div>
                  <div className="ltn__blog-brief">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-category">
                          <Link to="/blog-grid">Real Estate</Link>
                        </li>
                      </ul>
                    </div>
                    <h3 className="ltn__blog-title">
                      <a href={article.url} rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>
                    <div className="ltn__blog-meta">
                      <ul>
                        <li>
                          <a href={article.url} rel="noopener noreferrer">
                            <i className="far fa-eye" /> {article.source.name}
                          </a>
                        </li>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt" /> {new Date(article.publishedAt).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                    <p>{article.description}</p>
                    <div className="ltn__blog-meta-btn">
                      <div className="ltn__blog-btn">
                        <a href={article.url} rel="noopener noreferrer">
                          <i className="fas fa-arrow-right" /> Read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="ltn__blog-item ltn__blog-item-5 go-top">
                <div id="map" style={{ height: '400px', width: '100%' }}></div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__pagination-area text-center">
                  <div className="ltn__pagination">
                    <ul>
                      <li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
                      <li><Link to="#">1</Link></li>
                      <li className="active"><Link to="#">2</Link></li>
                      <li><Link to="#">3</Link></li>
                      <li><Link to="#">...</Link></li>
                      <li><Link to="#">10</Link></li>
                      <li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar component removed */}
        </div>
      </div>
    </div>
  );
};

export default BlogList;