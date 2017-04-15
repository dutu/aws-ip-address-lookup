aws-ip-address-checker
=======
[![Build Status](https://travis-ci.org/dutu/cryptox.svg)](https://travis-ci.org/dutu/cryptox/) ![Dependencies Status](https://david-dm.org/dutu/cryptox.svg)


**aws-ip-address-checker** is a node.js wrapper for REST API for multiple crypto currency exchanges.

**aws-ip-address-checker** manages API communication with different exchanges and  provides common methods for all exchanges. Differences between the different API's are abstracted away.


### Contents
* [Install](#install)
* [Use](#use)
* [ChangeLog](#changelog)
* [License](#license) 



# Install #

    npm install aws-ip-address-checker



# Use #

```js
const Aws-ip-address-checker = require("aws-ip-address-checker");
var aws-ip-address-checker = new Aws-ip-address-checker();
	
aws-ip-address-checker.check('54.255.183.252', function (err, details) {
  if (!err) {
    console.log(details);
  }
});
```

Example result:
```js
{
  "ipAddress": "54.255.183.252",
  "ip_prefix": "54.255.0.0/16",
  "region": "ap-southeast-1",
  "service": "AMAZON"
}
```



# ChangeLog

> cryptox module adheres to [Semantic Versioning] (http://semver.org/) for versioning: MAJOR.MINOR.PATCH.  
> 1. MAJOR version increments when non-backwards compatible API changes are introduced  
> 2. MINOR version increments when functionality in a backwards-compatible manner are introduced  
> 3. PATCH version increments when backwards-compatible bug fixes are made  


# License #

[MIT](LICENSE)