const contentfulManagement = require("contentful-management");

module.exports = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "Qq2W7gszgekIU5nrAcdZG6iAmNVNSd5S9FkREFgQtLw",
  });

  return contentfulClient
    .getSpace("sqsq3ermbgu4")
    .then((space) => space.getEnvironment("master"));
};
