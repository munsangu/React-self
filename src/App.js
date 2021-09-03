
import React, { Component } from 'react';
import Toc from '../src/components/Toc'
import Subject from '../src/components/Subject'
import Content from '../src/components/Content'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      subject: {title: ' WEB', sub:  'World Wide Web'},
      welcome: {title: 'Welcome', desc:'Hello, React!!'},
      contents: [{id: 1, title: 'HTML', desc: 'HTML is Hyper Text Markup Language'},
      {id: 2, title:'CSS', desc:'CSS is Cascaded Style Sheet'},
      {id: 3, title: 'Javascript', desc: 'Javascript is Awesome'},
      ]
    }
  }
  render() {
    let _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage = {function () {
          this.setState({mode: 'welcome'})
        }.bind(this)}
        >
        </Subject>
        <Toc onChangePage = {function () {
          this.setState({mode : 'read'})
        }.bind(this)}data={this.state.contents}></Toc>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
