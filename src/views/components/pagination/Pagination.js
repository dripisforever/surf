import Page from './Page';
import React from 'react';

class Pagination extends React.Component{
    render() {
        var pages = [];
        var total = this.props.totalPages;
        for (var i = 1; i <= total; i++) {
            pages.push(<Page key={i} onPageClick={this.props.onPageClick} pageNum={i} active={(this.props.currentPage == i) || false}/>);
        }
        return (
            <div className="pagination">{pages }</div>
        );
    }
}

export default Pagination;
