import React from 'react';
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
    handleClick(e) {
        var pageNum = e.target.innerHTML;
        this.props.onPageClick(pageNum);
    }
    render() {
        return (
            <a href="#" onClick={this.handleClick} className={this.props.active ? 'active' : ''}>{this.props.pageNum}</a>
        )
    }
}

export default Page;
