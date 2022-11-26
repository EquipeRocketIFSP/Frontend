export default {
    API: window.origin.match("localhost") ? "http://localhost:8080" : "http://certvet-back.us-east-1.elasticbeanstalk.com:8080",
};