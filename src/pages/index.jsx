import React from 'react';
import Helmet from 'react-helmet';
import PostPreview from '../components/PostPreview/PostPreview.jsx';

class Index extends React.Component {
  getPostList() {
    const postList = [];
    this.props.data.allMarkdownRemark.edges.forEach((edge) => {
      postList.push({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        cover: edge.node.frontmatter.cover,
        title: edge.node.frontmatter.title,
        date: edge.node.frontmatter.date,
      });
    });
    return postList;
  }
  render() {
    console.log(this.props);
    const config = this.props.data.site.siteMetadata;
    const postList = this.getPostList();
    return (
      <div className="md-grid">
        <Helmet title={config.siteTitle} />
        {
           postList.map(post => (<PostPreview key={post.title} postInfo={post} />))
        }
      </div>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site{
      siteMetadata {
        siteTitle
        linkPrefix
        googleAnalyticsID
        disqusShortname
        postDefaultCategoryID
        userName
        userLocation
        userAvatar
        userDescription
        copyright
    }
  }
  allMarkdownRemark(
      limit: 2000,
      sort: { fields: [frontmatter___date], order: DESC },
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
}
`;
