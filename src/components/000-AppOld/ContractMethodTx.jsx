import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    FormInput,
} from 'shards-react';
import { connect } from 'react-redux';

export class ContractMethodTxRaw extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }


    handleValueInput = (e) => {
        this.setState({value: e.target.value});
    }

    handleButtonClick = () => {
        this.props.simplestorage_set(this.state.value);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>Tx Calls</CardHeader>
                    <CardBody>
                        <p>Tx Calls are made by the store, and the transactions are automatically followed</p>
                        <Form>
                            <FormGroup>
                                <label htmlFor="#to">New Value</label>
                                <FormInput id="#to" placeholder="value" type="number" onChange={this.handleValueInput}/>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.handleButtonClick} outline theme="dark">
                                    Set Value
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    simplestorage_set: getContract(state, 'SimpleStorage', '@simplestorage').fn.set
});

export const ContractMethodTx = connect(mapStateToProps)(ContractMethodTxRaw);
