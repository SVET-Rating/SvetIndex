import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractLoaderContainer extends React.Component {

    render() {

        const contract = getContractFromProps(this.props, this.props.contractname, this.props.address);

        return (
            <div>
            {
                contract !== null ? 'Loaded !' : 'Loading ERC contract...'
            }
            </div>
        );
    }
}

const loadContract = (state, props) => {

    if (props.address) {
        return [
            {
                contract: this.props.contractname,
                address: props.address,
                balance: true
            }
        ]
    } else {
        return [];
    }

};

export const ERCContractLoader = withContracts(loadContract, ContractLoaderContainer);