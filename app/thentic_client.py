import httpx
from typing import Optional, Dict, Union
from const import THENTIC_HOST


class Response:
    request_id: str
    status: str
    transaction_pixel: str
    transaction_url: str

    def __init__(self, request_id: str, status: str, transaction_pixel: str, transaction_url: str):
        self.request_id = request_id
        self.status = status
        self.transaction_pixel = transaction_pixel
        self.transaction_url = transaction_url


class Client:
    """ A wrapper for thentic api """

    chain_id: int
    key: str
    client: httpx.Client
    global_webhook_url: Optional[str]
    global_redirect_url: Optional[str]

    def __init__(
            self,
            key: str,
            chain_id: int,
            webhook_url: Optional[str] = None,
            redirect_url: Optional[str] = None
    ) -> None:
        self.chain_id = chain_id
        self.key = key
        self.client = httpx.Client()
        self.global_redirect_url = redirect_url
        self.global_webhook_url = webhook_url

    def create_invoice(
            self,
            chain_id: int,
            amount: float,
            to: str,
            webhook_url: Optional[str] = None,
            redirect_url: Optional[str] = None
    ) -> Response:
        params = {
            'chain_id': chain_id,
            'amount': amount,
            'to': to
        }
        self._add_extra_params(params, webhook_url, redirect_url)
        res = self.client.post(f'{THENTIC_HOST}/api/invoices/new', headers=self._headers, json=params)
        assert res.status_code == 200, res.json()
        return Response(**res.json())

    def mint_nft(
            self,
            contract: str,
            nft_id: int,
            nft_data: Union[str, Dict],
            to: str,
            webhook_url: Optional[str] = None,
            redirect_url: Optional[str] = None
    ) -> Dict:
        params = {
            'contract': contract,
            'nft_id': nft_id,
            'nft_data': nft_data,
            'to': to
        }
        self._add_extra_params(params, webhook_url, redirect_url)
        res = self.client.post(f'{THENTIC_HOST}/api/nfts/mint', headers=self._headers, json=params)
        assert res.status_code == 200, res.json()
        return res.json()

    def show_nft_contracts(self):
        params = dict()
        self._add_extra_params(params)
        res = self.client.get(f'{THENTIC_HOST}/api/contracts', headers=self._headers, params=params)
        assert res.status_code == 200, res.json()
        return res.json()

    def new_contract(
            self, name: str,
            short_name: str,
            webhook_url: Optional[str] = None,
            redirect_url: Optional[str] = None
    ) -> Response:
        contract_params = {
            'name': name,
            'short_name': short_name
        }
        self._add_extra_params(contract_params, webhook_url, redirect_url)
        res = self.client.post(f'{THENTIC_HOST}/api/nfts/contract', headers=self._headers, json=contract_params)
        assert res.status_code == 200, res.json()
        return Response(**res.json())

    @property
    def _headers(self) -> Dict:
        return {'Content-Type': 'application/json'}

    def _add_extra_params(
            self,
            params: Dict,
            webhook_url: Optional[str] = None,
            redirect_url: Optional[str] = None
    ) -> None:
        params.update({
            'key': self.key,
            'chain_id': self.chain_id
        })

        p_webhook_url = webhook_url or self.global_webhook_url
        p_redirect_url = redirect_url or self.global_redirect_url

        if p_redirect_url:
            params.update({
                'redirect_url': p_redirect_url
            })
        if p_webhook_url:
            params.update({
                'webhook_url': p_webhook_url
            })
