import { INDEX_TOKEN_ACTIVE } from './types'

const indexTokenSelect = (tokenAddress,indexTokenName,indexTokenBalance) => {
        return {
            type: INDEX_TOKEN_ACTIVE,
            payload: {tokenAddress,indexTokenName,indexTokenBalance}
        }
}

export default indexTokenSelect;