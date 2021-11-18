import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import Pool from './artifacts/contracts/Pool.sol/Pool.json'
import Token from './artifacts/contracts/Orange.sol/Orange.json'

const poolAddress = '0xF0D41406B27fBA72830270De388352bEC5543a54'
const orangeAddress = '0x52E82Fe129776D7E12d3E8f4f9725Bf675f46c87'

function App() {
  const [showPool, setShowPool] = useState(0)
  const [poolValue, setPoolValue] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const [showToken, setShowToken] = useState(0)
  const [userAccount, setUserAccount] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')

  useEffect(() => {
    const init = async () => {
      getPoolBalance()
      getTokenBalance()
    }
    init()
  }, [])

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function getPoolBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //console.log({ provider })
      const contract = new ethers.Contract(poolAddress, Pool.abi, provider)
      try {
        const data = await contract.getContractBalance()

        const amount = ethers.utils.formatEther(data)
        setShowPool(amount)

        console.log('Pool balance: ', amount)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function addToPool() {
    if (!poolValue) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(poolAddress, Pool.abi, signer)
      const amount = ethers.utils.parseEther(poolValue)
      const transaction = await contract.addBalance(amount)

      await transaction.wait()
      console.log(`${amount} Ethers (in wei) successfully added`)
      setPoolValue('')
      getPoolBalance()
    }
  }

  async function withdrawFromPool() {
    if (!withdrawAmount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(poolAddress, Pool.abi, signer)
      const amount = ethers.utils.parseEther(withdrawAmount)
      const transaction = await contract.withdraw(amount)

      await transaction.wait()
      console.log(`${amount} Ethers (in wei) successfully withdrawn`)
      setWithdrawAmount('')
      getPoolBalance()
    }
  }

  async function getTokenBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(orangeAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account)
      console.log('Orange balance: ', balance.toString())
      setShowToken(balance.toString())
    }
  }

  async function sendToken() {
    if (!userAccount || !tokenAmount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(orangeAddress, Token.abi, signer)
      const transaction = await contract.transfer(userAccount, tokenAmount)

      await transaction.wait()
      console.log(`${tokenAmount} Orange successfully sent to ${userAccount}`)
      setUserAccount('')
      setTokenAmount('')
      getTokenBalance()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Pool balance: {showPool}</p>
        {/* <button onClick={getPool}>Get Pool Balance</button> */}
        <button onClick={getTokenBalance}>Check Balance</button>
        <br />
        <input
          onChange={(e) => setPoolValue(e.target.value)}
          placeholder="Amount of Ethers in wei"
          value={poolValue}
        />
        <button onClick={addToPool}>Add to Pool</button>
        <br />
        <input
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Amount of Ethers in wei"
          value={withdrawAmount}
        />
        <button onClick={withdrawFromPool}>Withdraw</button>
        <p>Orange balance: {showToken}</p>
        <button onClick={getTokenBalance}>Check Orange Balance</button>
        <br />
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="To address"
          value={userAccount}
        />
        <input
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Amount"
          value={tokenAmount}
        />
        <button onClick={sendToken}>Send Oranges</button>
      </header>
    </div>
  )
}

export default App
