import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input,  FormBtn } from "../../components/Form";


class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    title: "",
    startyear: "",
    endyear: ""
  };

  componentDidMount() {

     this.loadArticles();
  }


  loadArticles = () => {
    API.getArticle()
    
      .then(res  => this.setState({saved: res.data }))
      .then(res => console.log (res))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
  event.preventDefault();
  let searchTerm = this.state.title
  API.runQuery(searchTerm, (data) => {
    this.setState({articles: data.data.response.docs})
   
        })
};
saveArticle = article => {
  //event.preventDefault();
  let chosen = {title: article.headline.main,
    date:article.pub_date,
    url:article.web_url}
  //let searchTerm = this.state.title
  API.saveArticle(chosen)
  .then(res => this.loadArticles())
  .catch(err => console.log(err));
};

  render() {
    return (
      <Container >
        <Row  >
          <Col size="md-3">
            <Jumbotron>
              <p>search New york Times</p>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search here (required)"
              />
           
              <FormBtn
                // disabled={!(this.state.startyear && this.state.title && this.state.endyear)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
         
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>results</h1>
            </Jumbotron>
             {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article,i) => (
                  <ListItem key={i}
                  title={article.headline.main }
                    date={article.pub_date}
                    url={article.web_url}>
                    <Link to={article.web_url}>
                      <strong>
                        {article.headline.main} 
                      
                      </strong>
                         </Link>
                         <p>
                         {article.pub_date}
                         {article.web_url}
                         </p>
                  
        
                    <SaveBtn name="save" onClick={()=>this.saveArticle(article)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} 
          </Col>
        </Row>
        <Row>
          <Col size="lg-12" className="m-auto">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map((save,i) => (
                  <ListItem key={i}>
                    
                      <strong>
                        {save.title} 
                        </strong>
                        <p>
                        {save.date}
                        <br/>
                     {save.url}</p>
                    
                    <DeleteBtn onClick={() => this.deleteBook(save._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display 22</h3>
            )} 
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
