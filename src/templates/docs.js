import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import { Layout, Link } from '../components';
import NextPrevious from '../components/NextPrevious';
import SubHeader from '../components/SubHeader';
import '../components/styles.css';
import config from '../../config';
import gitHub from '../components/images/github.svg';
import { saTrack } from '../utils/segmentAnalytics';

const forcedNavOrder = config.sidebar.forcedNavOrder;

const Edit = styled('div')`
  /* padding: 1rem 1.5rem; */
  .editOnGithub {
    display: flex;
    text-align: right;

    a {
      font-family: "IBM Plex Sans";
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 160%;
      text-decoration: none;
      color: #1B2738;

      /* border: 1px solid rgb(211, 220, 228); */
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.2s ease-out 0s;
      text-decoration: none;
      color: rgb(36, 42, 49);
      /* background-color: rgb(255, 255, 255);
      box-shadow: rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;
      height: 30px;
      padding: 5px 16px; */
      .arrow {
        margin-left: 6px;
        display: flex;
        transition: all .3s ease-in-out;
      }
      &:hover {
        /* background-color: rgb(245, 247, 249); */
        .arrow {
          transform: translateX(5px);
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .alignLeft {
      padding-top: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    padding-top: 0;
  }
  @media(max-width: 767px) {
    .editOnGithub {
      justify-content: center;
      padding-top: 24px;
      .arrow {
        display: inline-block;
      }
    }
    .alignLeft {
      justify-content: flex-start;
    }
  }
`;
const BreadCrumbHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  @media (max-width: 1200px) {
    display: block;
  }
  @media(max-width: 767px) {
    display: block;
  }
`;
const HelpfulGithubWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 14px;
  .helpfulWrapper {
    display: flex;
    align-items: center;
    .desc {
      padding-right: 8px;
      padding-bottom: 0;
    }
    .iconWrapper {
      display: flex;
      align-items: center;
      .satisfied, .dissatisfied {
        margin: 0 8px;
        display: flex;
        cursor: pointer;
        position: relative;
        &:hover {
          svg {
            fill: #0079BD;
          }
        }
        svg {
          fill: #74818A;
        }
        .toolTip {
          background-color: #000;
          border-radius: 4px;
          padding: 4px 10px;
          color: #fff;
          position: absolute;
          min-width: max-content;
          top: -34px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 300;
          font-size: 14px;
        }
      }
      .active {
        svg {
          fill: #0079BD;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1110px) {
    display: block;
    .helpfulWrapper {
      padding-bottom: 12px;
    }
  }
  @media(max-width: 767px) {
    display: block;
    .helpfulWrapper {
      display: block;
      .desc {
        padding-right: 0;
        text-align: center;
      }
      .iconWrapper {
        justify-content: center;
        padding: 16px 0;
      }
    }
  }
`;


const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.63611 11.9698C7.34322 12.2627 7.34322 12.7375 7.63611 13.0304C7.92901 13.3233 8.40388 13.3233 8.69677 13.0304L13.1968 8.53038C13.4897 8.23748 13.4897 7.76261 13.1968 7.46971L8.69677 2.96967C8.40388 2.67678 7.92901 2.67678 7.63611 2.96967C7.34322 3.26256 7.34322 3.73744 7.63611 4.03033L10.8558 7.25L2.99982 7.25C2.5856 7.25 2.24982 7.58579 2.24982 8C2.24982 8.41422 2.5856 8.75 2.99982 8.75L10.8559 8.75L7.63611 11.9698Z" fill="#1B2738"/>
  </svg>
)

const EditGithubBtn = ({docsLocation, parentRelativePath, cNmae}) => (
  <Edit>
    <div className={"editOnGithub" + ((cNmae) ? " alignLeft" : "")}>
      {docsLocation && (
        <Link className="gitBtn" to={`${docsLocation}/${parentRelativePath}`} target="_blank">
          <img src={gitHub} alt='Github logo' /> Edit on GitHub
          <div className="arrow">
            <ArrowRight />
          </div>
        </Link>
      )}
    </div>
  </Edit>
)

export default class MDXRuntimeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSatisfied: null,
      showTooltip: false,
    };
  }

  handlePageHelpfulResponse = (response) => {
    this.setState({
      isSatisfied: response,
      showTooltip: true,
    }, () => {
      saTrack("Responded to Did You Find This Page Helpful", {
        response: response ? 'YES' : 'NO',
        pageUrl: this.props.location.href,
      });
      setTimeout(() => this.setState({showTooltip: false}), 5000)
    }
  )}

  render() {
    const { data, location } = this.props;

    if (!data) {
      return this.props.children;
    }
    const {
      allMdx,
      mdx,
    } = data;

    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter((slug) => slug !== '/')
      .sort()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find((url) => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          let prefix = cur.split('/')[1];

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/';
          }

          if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map((slug) => {
        if (slug) {
          const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.fields.title, url: node.fields.slug };
        }
      });
    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;

    const metaDescription = mdx.frontmatter.metaDescription;

    let canonicalUrl = config.gatsby.siteUrl;

    canonicalUrl =
      config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    // frontmatter canonical takes precedence
    canonicalUrl = mdx.frontmatter.canonicalUrl ? mdx.frontmatter.canonicalUrl : canonicalUrl;

    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? <meta name="description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta property="twitter:description" content={metaDescription} />
          ) : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="titleWrapper">
          <h1 className="title">{mdx.fields.title}</h1>
        </div>
        <div className="mainWrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        <div className="addPaddTopBottom">
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        canonicalUrl
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;
