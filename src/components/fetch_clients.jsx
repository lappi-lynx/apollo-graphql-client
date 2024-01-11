import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries";

function FetchClients() {
  const { error, loading, data } = useQuery(GET_CLIENTS);
  const [clients, setClients] = useState([]);
  console.log(data);

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;

  return (
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
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-100 dark:text-slate-400">{ fullName }</td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ email }</td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ ssn }</td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-100 dark:text-slate-400">{ locale }</td>
              </tr>
            )) }
          </tbody>
          </table>
        </div>
      </div>
  );
}

export default FetchClients;
