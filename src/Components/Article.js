import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PageTitle from "./PageTitle";
import BoardList from "./BoardList";
import BoardRead from "./BoardRead";
import BoardCreate from "./BoardCreate";
import BoardUpdate from "./BoardUpdate";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "list",
      selectBoardNo: 0,
    };
    this.setModeAndNo = this.setModeAndNo.bind(this);
  }

  deleteBoard() {
    axios.post("http://localhost:8000/delete", {
      no: this.state.selectBoardNo
    })
      .then(function(response){
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  setModeAndNo(_mode, no=0){
    if(_mode === "delete") {
      Swal.fire({
        title: '삭제하시겠습니까?',
        text: "다시 한 번 생각해주세요.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(249 77 77)',
        cancelButtonColor: '#ccc',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: true,
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteBoard();
          this.setState({
            mode: "list"
          });
          Swal.fire(
            '삭제되었습니다.',
            '삭제 성공~',
            'success',
            
          )
        } else {
          this.setState({
            mode: "read",
            selectBoardNo: no
          });
        }
      })
    } else {
      this.setState({
        mode: _mode,
        selectBoardNo: no
      });
    }
  }

  getContent() {
    let mode = this.state.mode;
    let section = null;

    if(mode === "list") {
      section = <BoardList boards={this.state.test07db} onSelectItem={this.setModeAndNo} />;
    } else if(mode === "read") {
      section = <BoardRead no={this.state.selectBoardNo} onButtonClick={this.setModeAndNo} />;
    } else if(mode == "create") {
      section = <BoardCreate onCreate={this.setModeAndNo}/>
    } else if(mode === "update") {
      section = <BoardUpdate no={this.state.selectBoardNo} onButtonClick={this.setModeAndNo}/>
    }

    return section;
  }

  render() {
    return (
      <article>
        <PageTitle />
        {this.getContent()}
      </article>
    );
  }
}

export default Article;