import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider as ReduxProvider } from 'react-redux';
import store from './store/store.js';
import FetchClients from './components/fetch_clients'
import reactLogo from './assets/react.svg'
import rubyLogo from './assets/ruby-nobg.png'
import apolloLogo from './assets/apollo.png'
import './App.css'

const client = new ApolloClient({
  uri: import.meta.env.ENV_GQL_API_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={ client }>
        <>
          <div className='font-mono'>
            <h1>GraphQL Client sandbox for Rails server</h1>
            <div className='flex flex-row w-full md:w-auto'>
              <div className='flex justify-center items-center basis-1/3'><a href="https://react.dev"><img src={ reactLogo } className="logo react transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-150 duration-300" alt="React logo" /></a></div>
              <div className='flex justify-center items-center basis-1/3'><a href="https://www.apollographql.com/"><img src={ apolloLogo } className="logo apollo transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-150 duration-300" alt="Apollo logo" /></a></div>
              <div className='flex justify-center items-center basis-1/3'><a href="https://rubyonrails.org/"><img src={ rubyLogo } className="logo ruby transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-150 duration-300" alt="Ruby logo" /></a></div>
            </div>
            <FetchClients />
          </div>
        </>
      </ApolloProvider>
    </ReduxProvider>
  )
}

export default App
