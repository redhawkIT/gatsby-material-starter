import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Card from 'react-md/lib/Cards';
import CardText from 'react-md/lib/Cards/CardText';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import Disqus from '../components/Disqus/Disqus.jsx';
import './atom-one-dark.css';
import './md.scss';

export default class MarkdownWrapper extends React.Component {
  render() {
    const post = this.props.route.page.data;
    if (!post.id) {
      post.id = this.props.location.pathname;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="md-grid post-page-container">

        <Helmet
          title={`${post.title} | ${config.siteTitle}`}
        />
        <Card className="md-grid md-cell md-cell--12 post">
          <CardText className="post-body">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </CardText>
        </Card>
        <UserInfo className="md-grid md-cell md-cell--12" SiteConfig={config} />
        <Disqus post={post} disqusShortname={config.disqusShortname} />
      </div>
    );
  }
}
