# Biswap Common Library

#### Prerequisites
> - Node v14 and above.
> - Environment variables **must be specified** in the project where Common library is used

### Content
1. [Constants](#constants)
2. [Enums](#enums)
3. [Helpers](#helpers)
4. [Services](#services)
5. [Types](#types)

### Constants
1. Addresses
2. Tokens

### Enums
1. Balance types
2. Blockchain
   - Chain IDs
   - Contract types
     - default - Contract ABI is used for many contracts, for example - pair contract, ERC20
     - single - Contract in a single instance (address + ABI)
     - double-pool - Double pool contract in a single instance that requires a staked token addresses
3. Log levels
4. Project names

### Helpers
1. Common functions
2. Big Number

### Services
1. Request API - Requests to BS backend
2. Blockchain
   - exchanges
   - DB contracts
   - ETH contracts
   - pairs
   - token addresses
3. Log - Prints the string you pass to it to the console

### Types
1. Balance
2. Blockchain
3. Pair# common-library
