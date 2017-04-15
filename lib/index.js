const request = require('request');
const Address6 = require('ip-address').Address6;
const Address4 = require('ip-address').Address4;
const pkg = require('../package.json');


class AwsIPAddressChecker {
  constructor() {
    this.awsQueryURL = 'https://ip-ranges.amazonaws.com/ip-ranges.json';
    this.userAgent = `${pkg.name} ${pkg.version}`;
  }

  check(addresses, callback) {
    let options = {
      headers: {
        'User-Agent': this.userAgent
      },
      json: true,
      timeout: 3000,
    };
    request.get(this.awsQueryURL, options, (error, response, body) => {
      let err = error;
      if (!err && response.statusCode !== 200) {
        err =  new Error(`amazonaws error ${response.statusCode}: ${response.body.error || response.body}`);
      }

      if (!err && typeof body === 'undefined' || body === null){
        err = new Error('amazonaws error: Empty response');
      }

      if (!err && body.error) {
        err = new Error(body.error);
      }

      if (err) {
        return callback(err, null);
      }

      let ipv4Ranges = body.prefixes;
      let ipv6Ranges = body.ipv6_prefixes;
      if (!Array.isArray(ipv4Ranges)) {
        err = new Error('amazonaws error: Invalid response');
        return callback(err, null);
      }

      let addrs = [];
      if (typeof addresses === 'string') {
        addrs.push(addresses);
      } else {
        addrs = addresses;
      }

      let addrDetails = [];
      addrs.forEach((addr) => {
        let address4 = new Address4(addr);
        let address6 = new Address6(addr);
        if (!err && !address4.isValid() && !address6.isValid()) {
          err = new Error(`Invalid IP address: ${addr}`);
        } else {
          let ipRange;
          if (address4.isValid()) {
            ipRange = ipv4Ranges.find((ipRange) => {
              let subnet = new Address4(ipRange.ip_prefix);
              return address4.isInSubnet(subnet);
            });
          } else {
            ipRange = ipv6Ranges.find((ipRange) => {
              let subnet = new Address6(ipRange.ipv6_prefix);
              return address6.isInSubnet(subnet);
            });
          }
          let details = {
            ipAddress: addr,
            ip_prefix: ipRange && (ipRange.ip_prefix || ipRange.ipv6_prefix) || '',
            region: ipRange && ipRange.region || '',
            service: ipRange && ipRange.service || '',
          };
          addrDetails.push(details);
        }
      });

      if (err) {
        return callback(err, null);
      }

    return callback(null, addrDetails.length === 1 && addrDetails[0] || addrDetails);
    });
  }
}

module.exports = AwsIPAddressChecker;
