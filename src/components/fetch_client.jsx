import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../graphql/queries";
import PropTypes from 'prop-types';

function FetchClient({ clientId }) {
  const [client, setClient] = useState({});
  const [currency, setCurrency] = useState('CHF');
  const { error, loading, data } = useQuery(GET_CLIENT, {
    skip: !clientId,
    variables: { clientId, currency },
  });

  useEffect(() => {
    if (data) {
      setClient(data.client);
    }
  }, [data, clientId]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;

  return (
    <div className="p-6 shadow-md rounded-lg text-left">
      <h2 className="text-2xl font-bold mb-4">{ client.fullName }</h2>
      <div className="mb-6">
        <p><strong>Email:</strong> { client.email }</p>
        <p><strong>SSN:</strong> { client.ssn }</p>
        { client.locale &&
          <p><strong>Locale:</strong> { client.locale }</p>
        }
        <div className="bg-clip-padding p-2 bg-sky-800 border-4 border-sky-300 border-dashed flex">
          <div><strong>Total equity: </strong>
            { client.totalEquity }
            <select className="ml-2" id="currency-select" value={ currency } onChange={ handleCurrencyChange }>
              <option value="CHF">CHF</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Investing Accounts</h3>
        { client.accounts && client.accounts.map((account) => (
          <div key={ account.id } className="mb-8 p-4 border-dashed border-2 border-sky-500">
            <h4 className="font-semibold mb-2">{ account.name }</h4>
            <p>Type: { account.type }</p>
            <div className="mt-4">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b-2 p-4 text-left">Ticker</th>
                    <th className="border-b-2 p-4 text-left">Quantity</th>
                    <th className="border-b-2 p-4 text-left">Latest Price, { account.currency }</th>
                    <th className="border-b-2 p-4 text-left">Market</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  { account.assets.map((asset) => (
                    <tr key={ asset.ticker }>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ asset.ticker }</td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ asset.quantity }</td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ asset.latestPrice / 100 }</td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ asset.marketIsoCode }</td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}

FetchClient.propTypes = {
  clientId: PropTypes.string.isRequired,
};

export default FetchClient;
