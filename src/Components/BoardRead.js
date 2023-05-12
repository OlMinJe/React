import React, { Component } from "react";
import axios from "axios";

class BoardRead extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: {}
    }
  }
  
  getBoard() {
    axios.post("http://localhost:8000/read", {no: this.props.no})
      .then(function(response){
        let [_board] = response.data;
        this.setState({board: _board});
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  componentDidMount() {
    this.getBoard();
  }

  render() {
    const board = this.state.board;
    let cre_date = "";
    if (board.cre_date != undefined) {
      cre_date = board.cre_date.substring(0,10);
    }

    return (
      <>
        <div className="container">
          <article id="boardRead">
           <table className="borderHeader">
              <thead>
                <tr>
                  <td><span>이름</span>{board.author}</td>
                  <td><span>날짜</span>{cre_date}</td>
                </tr>
                <tr><td className="txtTitle" colSpan={2}><span>제목</span>{board.title}</td></tr>
              </thead>
              <tbody>
                <tr><td className="boardContent" colSpan={2}>{board.content}</td></tr>
              </tbody>
            </table>
            <div className="control">
              <div className="left">
                <button type="button" onClick={function(){
                  this.props.onButtonClick("list");
                }.bind(this)}>목록</button>
              </div>
              <div className="right">
                <button type="button" onClick={function(){
                  this.props.onButtonClick("update", board.no);
                }.bind(this)}>수정</button>
                <button type="button" onClick={function(){
                  this.props.onButtonClick("delete", board.no);
                }.bind(this)}>삭제</button>
              </div>
            </div>
          </article>
        </div>
      </>
    );
  }
}

export default BoardRead;