import React from 'react';
import NewPostButton from '../../components/NewPostButton';
import NewPostModal from '../../components/NewPostModal';

import '../../styles/Home.css';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostModalIsOpen: false,
    }

    this.openModal = () => this.setState({ newPostModalIsOpen: true });
    this.closeModal = () => this.setState({ newPostModalIsOpen: false });
  }

  render() {
    return (
      <div className="Home__root container">
      
        <NewPostButton onClick={this.openModal}/>
        <NewPostModal
          isOpen={this.state.newPostModalIsOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}



export default FeedPage;
