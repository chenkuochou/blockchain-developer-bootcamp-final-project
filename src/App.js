import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import Pool from './artifacts/contracts/Pool.sol/Pool.json'
import Token from './artifacts/contracts/Orange.sol/Orange.json'

const poolAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function App() {
  const [showPool, setShowPool] = useState(0)
  const [poolValue, setPoolValue] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const [showToken, setShowToken] = useState(0)
  const [userAccount, setUserAccount] = useState('')
  const [TokenAmount, setTokenAmount] = useState(0)

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
      console.log(`${amount} Ethers successfully withdraw`)
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
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account)
      console.log('Token balance: ', balance.toString())
      setShowToken(balance.toString())
    }
  }

  async function sendToken() {
    if (!userAccount || !TokenAmount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.transfer(userAccount, TokenAmount)
      await transaction.wait()
      console.log(`${TokenAmount} Tokens successfully sent to ${userAccount}`)
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
          placeholder="Amount"
          value={poolValue}
        />
        <button onClick={addToPool}>Add to Pool</button>
        <br />
        <input
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Amount"
          value={withdrawAmount}
        />
        <button onClick={withdrawFromPool}>Withdraw</button>
        <p>Token balance: {showToken}</p>
        <button onClick={getTokenBalance}>Check Token Balance</button>
        <br />
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="To address"
        />
        <input
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={sendToken}>Send Tokens</button>
      </header>
    </div>
  )
}

export default App
