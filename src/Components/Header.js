import React, { Component } from "react";
import Swal from "sweetalert2";

class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          <li><h1>알싸한 밀가루</h1></li>
          <li><div>ICE Americano</div></li>
        </ul>
        <nav>
          <ul>
            <li onClick={function(e) {
              Swal.fire('아이스 아메리카노를\n들리는 대로 발음하면?\n\n알싸한 밀가루');              
            }}>Information</li>
            <li onClick={function(e) {
              Swal.fire('가진건 단돈 사딸라!');
            }}>Notice</li>
          </ul>
        </nav>
    </header>
    );
  }
}

export default Header;