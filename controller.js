const url = require('url');
const helpers = require('./helpers.js');

exports.firstIndexSequence = function(req,res){
    const queryString = require('query-string');
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    if(myUrl.search == ""){
        this.badRequest(req,res);
        return;
    }
    const parsed = queryString.parse(myUrl.search);

    let response = null;
    let s = parsed['s'];
    let n = parsed['n'];
    let nbParams = Object.keys(parsed).length

    if(nbParams != 2 || s == null || helpers.validateNumber(n)){
        this.badRequest(req, res);
        return;
    }

    if(n !== ""){
        let currentSequence = 0;
        let currentStart = 0;
        let currentChar = s.charAt(0);
        for(let i = 0; i != s.length; i++){
            if(s.charAt(i) === currentChar){
                currentSequence++;
                if(s.charAt(i + 1) !== currentChar && currentSequence == n) {
                    response = [{"result": currentStart}];
                    break;
                }
            } else {
                currentSequence = 1;
                currentStart = i;
                currentChar = s.charAt(i);
            }
        }
        if(currentSequence == n){
            response = [{"result": currentStart}];
        }
        if(response == null){
            response = [{"result": -1}];
        }
    } else {
        response = [{"result": -1}];
    }
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}

exports.longestSequenceIndex  = function(req,res){
    const queryString = require('query-string');
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    if(myUrl.search == ""){
        this.badRequest(req,res);
        return;
    }
    const parsed = queryString.parse(myUrl.search);

    let response = null;
    let s = parsed['s'];
    let nbParams = Object.keys(parsed).length

    if(nbParams != 1 || s == null){
        this.badRequest(req, res);
        return;
    }
    if(s !== ""){
        let currentChar = s.charAt(0);
        let currentSequence = 0;
        let currentStart = 0;
        let currentEnd = 0;

        let longestChar;
        let longestSequence;
        let longestStart;
        let longestEnd;
    
        for(let i = 0; i != s.length; i++){
            if(s.charAt(i) === currentChar){
                currentSequence++;
            } else {
                if(longestChar == null){
                    longestChar = currentChar;
                    longestStart = currentStart;
                    longestEnd = i;
                    longestSequence = longestEnd - longestStart;
                } else if(currentSequence > longestSequence){
                    longestChar = currentChar;
                    longestStart = currentStart;
                    longestEnd = i;
                    longestSequence = longestEnd - longestStart;
                }
                currentSequence = 1;
                currentStart = i;
                currentEnd = i;
                currentChar = s.charAt(i);
            }
        }
        response = {"start": longestStart, "end": longestEnd};
    } else {
        response = {"start": 0, "end": 0};
    }
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response));
}

exports.invalidUrl = function(req, res) {
    var response = [
        {
        "message": "The page you are trying to access does not exist",
        "status_code": 404
        }
    ]
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}

exports.badRequest = function(req, res){
    var response = [
      {
        "message": "Bad Request. One or more parameters are invalid or missing",
        "status_code": 400
      }
    ]
    res.statusCode = 400;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
  }