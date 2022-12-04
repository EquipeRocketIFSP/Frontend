export default {
    API: window.origin.match("localhost") ? "https://localhost:8443" : "https://certvet-back.us-east-1.elasticbeanstalk.com:8443",
};