import React from 'react';

class MovieBox extends React.Component  {
    render () {
        var m = this.props.movie;
        return (
           <div className="movieBox">
                <div>{m.original_title} ({m.release_date})</div>
           </div>
        );
    }
}

export default MovieBox;
