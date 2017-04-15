const AwsIPAddressChecker = require('../lib/index.js');
const Address6 = require('ip-address').Address6;

const chai = require('chai');
const expect = chai.expect;
let awsIPAddressChecker = new AwsIPAddressChecker();

describe('Unit Test', function () {
  describe("Constructor", function () {
    it('should create a new instance', function () {
      expect(awsIPAddressChecker).to.be.an.instanceOf(AwsIPAddressChecker);
    });
  });

  describe("Method 'check'", function () {
    it('should accept IP address parameters as a string', function (done) {
      let ipAddress = '127.0.0.1';
      awsIPAddressChecker.check(ipAddress, (error, details) => {
        expect(error).not.to.be.an.instanceOf(Error);
        expect(details).to.have.all.keys('ipAddress', 'ip_prefix', 'region', 'service');
        expect(details.ipAddress).to.be.eq(ipAddress);
        done();
      });
    });
    it('should accept IP address parameter as an array of strings', function (done) {
      let ipAddresses = ['192.168.0.1', '127.0.0.1'];
      awsIPAddressChecker.check(ipAddresses, (error, details) => {
        expect(error).not.to.be.an.instanceOf(Error);
        expect(Array.isArray(details)).to.be.true;
        details.forEach((detail) => {
          expect(detail).to.have.all.keys('ipAddress', 'ip_prefix', 'region', 'service');
          expect(ipAddresses).to.include(detail.ipAddress);
        });
        ipAddresses.forEach((ipAddress) => {
          let index = details.findIndex((detail) => {
            return detail.ipAddress === ipAddress;
          });
          expect(index).to.be.at.least(0);
        });
        done();
      });
    });
  });
});

describe('Function Test', function () {
  describe("Invalid address", function () {
    it('should return an error for single invalid address', function (done) {
      awsIPAddressChecker.check('256.0.0.1', (error, details) => {
        expect(error).to.be.an.instanceOf(Error);
        done();
      });
    });
    it('should return an error for invalid address in array', function (done) {
      awsIPAddressChecker.check(['192.168.0.1', '256.0.0.1'], (error, details) => {
        expect(error).to.be.an.instanceOf(Error);
        done();
      });
    });
    it('should return no details for non-AWS IPv4 address', function (done) {
      let ipAddress = '127.0.0.1';
      awsIPAddressChecker.check(ipAddress, (error, detail) => {
        expect(error).to.be.null;
        expect(detail).to.deep.equal({ ipAddress: ipAddress, ip_prefix: '', region: '', service: '' });
        done();
      });
    });
    it('should return no details for non-AWS IPv6 address', function (done) {
      let ipAddress = '2001:4860:4860::8888';
      awsIPAddressChecker.check(ipAddress, (error, detail) => {
        expect(error).to.be.null;
        expect(detail).to.deep.equal({ ipAddress: ipAddress, ip_prefix: '', region: '', service: '' });
        done();
      });
    });
    it('should return correct details for AWS IPv4 address', function (done) {
      let ipAddress = '54.255.183.252';
      let expectedResult = {
        ipAddress: ipAddress,
        ip_prefix: '54.255.0.0/16',
        region: 'ap-southeast-1',
        service: 'AMAZON'
      };
      awsIPAddressChecker.check(ipAddress, (error, detail) => {
        expect(error).to.be.null;
        expect(detail).to.deep.equal(expectedResult);
        done();
      });
    });
    it('should return correct details for AWS IPv6 address', function (done) {
      let ipAddress = '2620:0107:300f:0000:0000:0000:0000:0000';
      let expectedResult = {
        ipAddress: ipAddress,
        ip_prefix: '2620:107:300f::/64',
        region: 'us-west-1',
        service: 'AMAZON'
      };
      expectedResult.ipAddress = ipAddress;
      awsIPAddressChecker.check(ipAddress, (error, detail) => {
        expect(error).to.be.null;
        expect(detail).to.deep.equal(expectedResult);
        done();
      });
    });
  });

});

