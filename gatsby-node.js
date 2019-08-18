const path = require("path");
const { CreateFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  console.log("Creating Talks");
  const { createPage } = actions;
  const talkPage = path.resolve("./src/pages/talk.js");

  const talksResult = await graphql(
    `
      {
        allTalksJson {
          edges {
            node {
              title
              conference
              slug
              description
              imageUrl
              date
              id
              slidesLink
            }
          }
        }
      }
    `
  );

  if (talksResult.errors) {
    throw talksResult.errors;
  }

  const talks = talksResult.data.allTalksJson.edges;

  talks.forEach((talk, index) => {
    const {
      slug,
      date,
      description,
      imageUrl,
      title,
      conference,
      id,
      slidesLink,
    } = talk.node;
    createPage({
      path: slug,
      component: talkPage,
      context: {
        slug,
        date,
        title,
        conference,
        imageUrl,
        description,
        id,
        slidesLink,
      },
    });
  });

  const postPage = path.resolve("./src/pages/post.js");

  const postsResult = await graphql(
    `
      query PostsQuery {
        allMarkdownRemark {
          edges {
            node {
              id
              html
              excerpt
              frontmatter {
                title
                publishDate
                tags
                coverImage
                slug
              }
            }
          }
        }
      }
    `
  );

  if (postsResult.errors) {
    throw postsResult.errors;
  }

  const rawPosts = postsResult.data.allMarkdownRemark.edges;
  const posts = rawPosts.map(post => ({
    id: post.node.id,
    html: post.node.html,
    ...post.node.frontmatter,
  }));

  posts.forEach((post, index) => {
    createPage({
      path: post.slug,
      component: postPage,
      context: post,
    });
  });
};
