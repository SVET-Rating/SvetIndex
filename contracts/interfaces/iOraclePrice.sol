pragma solidity =0.6.12;

interface iOraclePrice {

    struct Prices {
        uint256 indexprice;
        uint256 tokenprices;
    }
    function addPrice   (address _addrToken, uint _price ) external;

    function delToken   (address _addrToken) external;
  
    function getLenPrice (address _addrToken) external  view  returns (uint) ;
    
    function getLastPrice (address _addrToken) external view  returns (uint) ;

    function getallTokens () external view  returns (address[] memory ) ;

    function getIndexPrice (address _indexT) external view  returns (uint256 priceIndexTot); //uint256[] memory allPrices) ;
    function getAllActsIndPrices(address _indexT) external view returns (uint256[] memory);

    function getPriceEthforAmount (address _addrToken,  uint256 _amount ) external view returns (uint price);

    function getIndexPriceforAmount (address _indexT, uint256 _amount) external view returns (uint256 priceIndexTot); //uint256[] memory allPrices);
 /* function getIndexPrice (address _indexT) external view  returns (Prices memory); //uint256[] memory allPrices) ;

    function getPriceEthforAmount (address _addrToken,  uint256 _amount ) external view returns (uint price);

    function getIndexPriceforAmount (address _indexT, uint256 _amount) external view returns (Prices memory); //uint256[] memory allPrices); */


}