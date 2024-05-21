# Backend

Extracted from a larger project -- intended to receive a value and secret key to submit a transaction.

## Approach

The contract itself lacks a specific domain language I could discern, so I chose to call the number being stored the "Counter". Therefore, most naming is along the lines of "readCounter", "updateCounter", "counterConfig", and so one.

In my first pass, I had treated the Private Key as a credential, placing in the headers to be parsed by middleware. However, I pivoted toward treating it as its own entity due to it being more core to the functionality of the application then a traditional access token. My reasoning is it's more in line with a credit card number than an access token. Consequently, it can be found in the /domain directory. I'm not 100% set on this decision, however.

Error responses follow RFC 7807.

## Instructions

- read (GET):
  http://localhost:80/api/v1/read

  - Request Body: none
  - Response:
    - value: string

- write (POST):
  http://localhost:80/api/v1/write

  - Request Body:
    - value: 'string' | 'number' representing a numeric value >= 1e15
    - privateKey: 'string' private key for a live account on the Ropsten network.
  - Response:
    - value: string
    - transactionHash: string
