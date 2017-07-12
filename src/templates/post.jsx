import React from 'react';
import Helmet from 'react-helmet';
import Card from 'react-md/lib/Cards';
import CardText from 'react-md/lib/Cards/CardText';
import Snackbar from 'react-md/lib/Snackbars';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import Disqus from '../components/Disqus/Disqus.jsx';
import PostTags from '../components/PostTags/PostTags.jsx';
import PostCover from '../components/PostCover/PostCover.jsx';
import PostInfo from '../components/PostInfo/PostInfo.jsx';
import SocialLinks from '../components/SocialLinks/SocialLinks.jsx';
import config from '../../data/SiteConfig';
import './atom-one-dark.css';
import './post.scss';

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true,
      toasts: [],
    };
    this.handleResize = this.handleResize.bind(this);
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'New comment available!' });
    this.setState({ toasts });
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const expanded = !mobile;
    const postOverlapClass = mobile ? 'post-overlap-mobile' : 'post-overlap';
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = this.props.location.pathname;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="post-page md-grid md-grid--no-spacing">
        <Helmet
          title={`${post.title} | ${config.siteTitle}`}
        />

        <PostCover postNode={postNode} mobile={mobile} />
        <div className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}>

          <Card className="md-grid md-cell md-cell--12 post">
            <CardText className="post-body">
              <h1 className="md-display-2 post-header">{post.title}</h1>
              <PostInfo postNode={postNode} />
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </CardText>
            <div className="post-meta">
              <PostTags tags={post.tags} />
              <SocialLinks postNode={postNode} mobile={this.state.mobile} />
            </div>
          </Card>
          <UserInfo className="md-grid md-cell md-cell--12" config={config} expanded={expanded} />
          <Disqus post={post} expanded={expanded} onDisqusComment={this.notifyAboutComment} />
          <Snackbar toasts={this.state.toasts} onDismiss={this.onSnackbarDismiss} />
        </div>
      </div>

    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug }}) {
    html
    timeToRead
    frontmatter {
      title
      cover
      date
      category
      tags
    }
  }
}
`;
