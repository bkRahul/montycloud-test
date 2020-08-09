import React, { Component } from "react";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import { connect } from "react-redux";
import { checkValidity } from "../../utility/utility";
import * as newsActions from "../../store/actions/index";

class NewsSearch extends Component {
  state = {
    searchNews: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Search for News",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
  };

  fetchNewsHandler = (e) => {
    e.preventDefault();
    const query = this.state.searchNews.name.value;
    let currentPage;
    let pageLimit;

    this.props.onFetchNews(query, (currentPage = 1), (pageLimit = 10));
    this.props.history.push({
      pathname: "/feed/"+ query,
    });
  };

  inputChangeHandler = (e, id) => {
    const updatedSearchNews = {
      //  copies this.state.searchNews as a new object
      ...this.state.searchNews,
      //  update the single control [email]
      [id]: {
        //  copies this.state.searchNews[email]
        ...this.state.searchNews[id],
        //  updates the properties
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.searchNews[id].validation
        ),
        touched: true,
      },
    };
    //  updates searchNews state with updated updatedSearchNews
    this.setState({
      searchNews: updatedSearchNews,
    });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.searchNews) {
      if (this.state.searchNews.hasOwnProperty(key)) {
        //get the name and element config part of object
        formElementsArray.push({ id: key, config: this.state.searchNews[key] });
      }
    }
    console.log(formElementsArray);
    return (
      <div className="d-flex df-col">
        <h1>NEWS LISTER</h1>
        <form onSubmit={this.fetchNewsHandler} className="form">
          <div className="d-flex df-row">
            {formElementsArray.map((formElement) => {
              return (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  touched={formElement.config.touched}
                  shouldValidate={formElement.config.validation}
                  changed={(e) => {
                    this.inputChangeHandler(e, formElement.id);
                  }}
                />
              );
            })}
            <Button>Search</Button>
          </div>
        </form>
      </div>
    );
  }
}


//map dispatch actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNews: (query, currentPage, pageLimit) =>
      dispatch(newsActions.fetchNews(query, currentPage, pageLimit)),
  };
};

export default connect(null, mapDispatchToProps)(NewsSearch);
