import React, { Component } from 'react';

class Toc extends Component {
  render() {
    let list = [];
    let data = this.props.data;
    let i = 0;
    while(i < data.length) {
      list.push(
      <li key={data[i].id}>
        <a href={"/content/"+data[i].id}
        onClick={function (e) {
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}>
          {data[i].title}
        </a>
      </li>)
      i++
    }
    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    );
  }
}

export default Toc;