import { INDEX_TOKEN_ACTIVE } from './types'

const indexTokenSelect = (tokenAddress) => {
        return {
            type: INDEX_TOKEN_ACTIVE,
            payload: tokenAddress
        }
}

export default indexTokenSelect;