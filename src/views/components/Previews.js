import React from 'react';
// import history from '../../../core/history';

class Previews extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { snippet } = this.props
    return (
      // <div>
        // {/* {snippet} */}
        // <span className="preVIEWS" dangerouslySetInnerHTML={{ __html: `${this.props.snippet.reduce((prev, curr) => [prev, '...', curr])} \n` }} />
        <span className="preVIEWS" dangerouslySetInnerHTML={{ __html: `${this.props.snippet}` }} />
      // </div>

    );
  }
}
export default Previews;
