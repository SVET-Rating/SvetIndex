import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractLoaderContainer extends React.Component {

    render() {

        const contract = getContractFromProps(this.props, "IndexToken", this.props.address);

        return (
            <div>
            {
                contracts !== null ? <ContractIndexMethodCall /> : 'Loading ...'
            }
            </div>
        );
    }
}

const loadContract = (state, props) => {

    if (props.address) {
        return [
            {
                contract: "IndexToken",
                address: props.address,
                balance: true
            }
        ]
    } else {
        return [];
    }

};

export const IndexContractLoader = withContracts(loadContract, ContractLoaderContainer);