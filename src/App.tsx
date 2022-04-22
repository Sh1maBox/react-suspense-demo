import logo from './logo.svg'
import './App.css'
import { Suspense } from 'react'

const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

const delayedHello = (seconds: number): Promise<string> => {
  return new Promise(async (resolve) => {
    await sleep(1)
    return resolve('Hello!')
  })
}

const AppLogoPlaceHolder = () => {
  return <div>Loading...</div>
}

let greeting: string | undefined

const DelayedAppLogo = () => {
  if (!greeting) {
    throw delayedHello(2).then((hello) => {
      greeting = hello
    })
  }
  return <img src={logo} className='App-logo' alt='logo' />
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Suspense fallback={<AppLogoPlaceHolder />}>
          <DelayedAppLogo />
        </Suspense>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
