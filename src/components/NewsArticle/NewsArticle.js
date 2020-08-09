import React from "react";
import classes from "./NewsArticle.module.css";
import { Link } from "react-router-dom";

export const NewsArticle = (props) => {
  console.log(props);
  return (
    <>
      <article className={classes.Card}>
        <div className={classes.ArticleImg}>
          <a href={props.newsData.webUrl}>
            <img
              src={props.newsData.fields.thumbnail}
              alt={props.newsData.fields.headline}
            />
          </a>
        </div>
        <div className={classes.ArticleInfo}>
          <a href={props.newsData.webUrl}>
            <h2>{props.newsData.fields.headline}</h2>
          </a>
          <div>
            {props.newsData.tags.map((tag, index) => {
              return (
                <Link to={`/feed/${tag.webTitle}`} key={index}>
                  <span
                    className={classes.ArticleTag}
                    onClick={() => props.click(tag.webTitle, 1, 10)}
                  >
                    {tag.webTitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </article>

      <hr />
    </>
  );
};
