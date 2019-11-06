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

module.exports.info = 'Creating dataset.';
let bc, contx;
let txIndex = 0;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const createDataset = (txIndex) => {
    try {
        let randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let id = `dataset_id_${txIndex}` // uuidv4()
        const paramCreateDatset = {
            name: `dataset_${randomString}`,
            state: 'active',
            id,
            license_id: 'cc_by',
            type: 'dataset',
            creator_user_id: 'd12cacae-6d5e-4360-a0a7-8234172cd7c0',
            title: `title ${randomString}`,
            resources: [
                {
                    url_type: 'upload',
                    last_modified: '1557308930774',
                    lastModifiedDate: '2019-05-08T09:48:50.774Z',
                    name: 'resourceName',
                    size: 642321,
                    minetype: 'application/pdf',
                    format: 'application/pdf',
                    file_hash:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    description: '',
                    package_id: id,
                    url: '33333',
                    id: uuidv4()
                }
            ]
        };
        let args = {
            chaincodeFunction: 'dataset_create',
            chaincodeArguments: [`${JSON.stringify(paramCreateDatset)}`],
            invokerIdentity: 'ckan.user.org1'
        };
        return bc.invokeSmartContract(contx, 'document', 'v0', args, 300);
    }
    catch (err) {
        console.log('==== createDataset err ', err);
    }
};

module.exports.run = function () {
    txIndex++;
    return createDataset(txIndex);
};

module.exports.end = function () {
    return Promise.resolve();
};
