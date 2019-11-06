/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

module.exports.info = 'Creating marbles.';
let bc, contx;
let txIndex = 0;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const createUser = () => {
    try {
        let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const paramCreateUser = {
            name: `user_name_${randomString}`,
            email:  `user_email_${randomString}@gmail.com`,
            created: '2019-11-01T14:23:38.289758',
            sysadmin: false,
            activity_streams_email_notifications: 'false',
            state: 'active',
            fullname: `user_name_${randomString} fullname`,
            password: '$pbkdf2-sha512$25000$SSklJASAkHLuPScEwHhvDQ$Ke5hIkRmTyP17ZBiBODpP3Hp0widoG29lyj0PmN3cMMFMo1d2HnpYmfwfOy71LZBf0d479nzxXYfDTIhMR/P9A',
            id: `${uuidv4()}`,
            source: 'http://localhost:5000'
        };
        let args = {
            chaincodeFunction: 'user_create',
            chaincodeArguments: [`${JSON.stringify(paramCreateUser)}`],
            invokerIdentity: 'caliper.org1'
        };
        return bc.invokeSmartContract(contx, 'document', 'v0', args, 300);
    }
    catch (err) {
        console.log('==== createUser err ', err);
    }
};

module.exports.run = function () {
    txIndex++;
    return createUser();
};

module.exports.end = function () {
    return Promise.resolve();
};
