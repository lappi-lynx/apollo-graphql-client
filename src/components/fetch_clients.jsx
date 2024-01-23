import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";
import FetchClient from "./fetch_client";

function FetchClients() {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const { error, loading, data } = useQuery(GET_CLIENTS);
  const [clients, setClients] = useState([]);
  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
  };

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: { error.message }. API provider is down due to Heroku pricing policy. Please ask the owner to run it first.</p>;

  return (
    <>
      { selectedClientId == null ? (
        <div className='relative rounded-xl overflow-auto'>
          <div className='shadow-sm overflow-hidden my-8'>
            <table className="border-collapse table-auto w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">ID</th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Full Name</th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Email</th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">SSN</th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Locale</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                { clients.map(({ id, fullName, email, ssn, locale }) => (
                  <tr key={ id }>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ id }</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-100 dark:text-slate-400 cursor-pointer hover:underline" onClick={ () => handleClientClick(id) }>{ fullName }</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ email }</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ ssn }</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ locale }</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div>
              <button className="button dark:bg-rose-800" onClick={ () => setSelectedClientId(null) }>Back to Clients List</button>
          </div>
          <FetchClient clientId={selectedClientId} />
        </>
      )}
    </>
  );
}

export default FetchClients;
