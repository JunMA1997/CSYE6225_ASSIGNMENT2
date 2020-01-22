var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index");
let should = chai.should();
chai.use(chaiHttp);
describe ("CRUD OPERATIONS", function(){
    var users = [
        {"first_name":"jun",
        "last_name":"ma",
        "email_address":"52909794@qqqqqqqq.com",
        "password":"maju97MAjun!"},//success
        {"first_name":"jun",
        "last_name":"ma",
        "email_address":"52909794@qq.com",
        "password":"maju97MAjun!"},//due to dul email
        {"first_name":"jun",
        "last_name":"ma",
        "email_address":"52909794@qqqqq.com",
        "password":"maju97MAjun"}//due to password
    ]
    // it("Should add Users in DB", (done) => {
        
    //     chai.request(server)
    //         .post("/")
    //         .send(users[0])
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             console.log("Response Body:", res.body);   
    //             done()             
    //         })       
    // })
    it("Shouldn't add Users in DB since dul email", (done) => {
        
        chai.request(server)
            .post("/")
            .send(users[1])
            .end((err, res) => {
                res.should.have.status(400);
                console.log("Response Body:", res.body);   
                done()             
            })       
    })
    it("Shouldn't add Users in DB since password is too weak", (done) => {        
        chai.request(server)
            .post("/")
            .send(users[2])
            .end((err, res) => {
                res.should.have.status(400);
                console.log("Response Body:", res.body);   
                done()             
            })       
    })
    it("Should get User in DB", (done) => {        
        chai.request(server)
            .get("/")
            .auth('529097947@qq.com', 'majun97MAjun!')
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", res.body);   
                done()             
            })       
    })
    it("Should update User in DB", (done) => {        
        chai.request(server)
            .put("/")
            .auth('529097947@qq.com', 'majun97MAjun!')
            .send({"first_name":"jun1",
                "last_name":"ma1",
                "password":"majun97MAjun!"
            })
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", res.body);   
                done()             
            })       
    })
})
