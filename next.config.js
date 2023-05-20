/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "cms.emergingfinsights.co.uk",
      "cms-storage.s3.eu-west-2.amazonaws.com"
    ]
  }
}
