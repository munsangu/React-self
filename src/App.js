
import React, { Component } from 'react';
import Toc from '../src/components/Toc'
import Subject from '../src/components/Subject'
import ReadContent from './components/Readcontent'
import CreateContent from './components/CreateContent';
import UpdateContent from './components/Update';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id:2,
      subject: {title: ' WEB', sub:  'World Wide Web'},
      welcome: {title: 'Welcome', desc:'Hello, React!!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is Hyper Text Markup Language'},
        {id: 2, title:'CSS', desc:'CSS is Cascaded Style Sheet'},
        {id: 3, title: 'Javascript', desc: 'Javascript is Awesome'},
      ]
    }
  }

  getReadContent() {
    let i = 0;
    while(i < this.state.contents.length){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }

  getContent() {
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id += 1;
        // this.state.contents.push({id: this.max_content_id, title:_title, desc:_desc }); 원본 손상 초래
        let _contents = this.state.contents.concat({id: this.max_content_id, title:_title, desc:_desc }) // 원본 유지
        this.setState(
          {contents: _contents, mode: 'read', selected_content_id: this.max_content_id}
        )
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          let _contents = Array.from(this.state.contents);
          let i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id : _id, title : _title, desc : _desc};
              break;
            }
            i++;
          }
          this.setState(
            {contents: _contents, mode: 'read'}
          )
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
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
        <Toc onChangePage = {function (id) {
          this.setState({mode : 'read', selected_content_id: Number(id)})
        }.bind(this)}data={this.state.contents}></Toc>
        <Control onChangeMode={function (mode) {
          if(mode === 'delete') {
            if(window.confirm('Really??')) {
              let _contents = Array.from(this.state.contents)
              let i = 0;
              while(i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, i);
                  break;
                }
                i++;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('Delete completed')
            }
          } else {
            this.setState({
              mode : mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
