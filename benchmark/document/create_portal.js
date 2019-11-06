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

module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

const createPortal = () => {
    try {
        let fingerPrint = '64:c4:c5:c9:7e:91:91:db:e3:35:ca:de:be:84:2e:b0';
        let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const paramCreatePortal = {
            name: `portal_name_${randomString}`,
            description: `portal_description_${randomString}`,
            email:  `portal_demail_${randomString}@gmail.com`,
            domain: 'https://' + randomString + '.com',
            category: `category_${randomString}`,
            userPortalAssociate: {
                username: 'sysadmin',
                'apiKey': '047b8cd2-02d7-48dc-941e-d8553471fae7',
                'state': 'active'
            },
            identities: [{ fingerPrint, status: true }],
            attributes: [{
                name: 'category_' + randomString,
                value: 'category'
            }]
        };
        let args = {
            chaincodeFunction: 'portal_create',
            chaincodeArguments: [`${JSON.stringify(paramCreatePortal)}`],
            invokerIdentity: 'admin.org1'
        };
        return bc.invokeSmartContract(contx, 'document', 'v0', args, 300);
    }
    catch (err) {
        console.log('==== createPortal err ', err);
    }
};

module.exports.run = function () {
    txIndex++;
    return createPortal();
};

module.exports.end = function () {
    return Promise.resolve();
};
