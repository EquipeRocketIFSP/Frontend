export default {
    API: window.origin.match("localhost") ? "http://localhost:8080" : "https://certvet-back.us-east-1.elasticbeanstalk.com:8443",
};