var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
let {jwtToken} = require('./autherizationToken');

describe('Event Registraion Controller', function(){

    it('GET Event Registraion',function(done){
        agent.get('/event_registrations').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body.data.length > 0).to.equal(true);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})