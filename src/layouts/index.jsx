import React from 'react';
import 'font-awesome/scss/font-awesome.scss';
// import Navigation from '../components/Navigation/Navigation.jsx';
import './index.scss';

export default class MainLayout extends React.Component {

  getLocalTitle() {
    const currentPath = this.props.location.pathname;
    let title = '';
    if (currentPath === ('/')) {
      title = 'Home';
    } else if (currentPath === ('/tags/')) {
      title = 'Tags';
    } else if (currentPath === ('/about/')) {
      title = 'About';
    } else {
      title = 'Article';
    }
    return title;
  }
  render() {
    const { children } = this.props;
    return (
      // <Navigation SiteConfig={null} LocalTitle={this.getLocalTitle()}>
      //   {children()}
      // </Navigation>
      null
    );
  }
}

// TODO: Removal of prefixLink breaks link checks
