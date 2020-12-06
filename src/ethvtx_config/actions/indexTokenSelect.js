import { INDEX_TOKEN_ACTIVE } from './types'

const indexTokenSelect = (tokenAddress,indexTokenName) => {
        return {
            type: INDEX_TOKEN_ACTIVE,
            payload: {tokenAddress,indexTokenName}
        }
}

export default indexTokenSelect;