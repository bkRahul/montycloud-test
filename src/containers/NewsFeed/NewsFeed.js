import React, { Component } from "react";
import { connect } from "react-redux";
import { NewsArticle } from "../../components/NewsArticle/NewsArticle";
import classes from "./NewsFeed.module.css";
import * as newsActions from "../../store/actions/index";

class NewsFeed extends Component {
  componentWillMount() {

    if (this.props.match.params.id) {
      let currentPage;
      let pageLimit;
      this.props.onFetchNews(
        this.props.match.params.id,
        (currentPage = 1),
        (pageLimit = 10)
      );
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.newsData) {
      if (
        this.props.match.params.id &&
        prevProps.match.params.id !== this.props.match.params.id
      ) {
        let currentPage;
        let pageLimit;
        this.props.onFetchNews(
          this.props.match.params.id,
          (currentPage = 1),
          (pageLimit = 10)
        );
      }
    }
  }

  render() {
    return this.props.newsData ? (
      <div className={classes.FeedContainer}>
        {this.props.newsData.results.map((item, index) => {
          return (
            <NewsArticle
              newsData={item}
              click={this.props.onFetchNews}
              key={index}
            />
          );
        })}
      </div>
    ) : (
      "News feed empty please try again"
    );
  }
}

//map state to props
const mapStateToProps = (state) => {
  return {
    newsData: state.newsData,
    isloading: state.loading,
  };
};

//map dispatch actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNews: (query, currentPage, pageLimit) =>
      dispatch(newsActions.fetchNews(query, currentPage, pageLimit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
