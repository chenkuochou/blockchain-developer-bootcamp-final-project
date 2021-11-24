import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import bg from './bg01.jpg'
import Pool from './artifacts/contracts/Pool.sol/Pool.json'
import Token from './artifacts/contracts/Orange.sol/Orange.json'

// Ropsten
const orangeAddress = '0xA99cAc3717b6a19D55cf331B9ebF455daf1aa09B'
const poolAddress = '0x91e288939E219A2cD72D6570b7Bcc6AC52d3Fc8A'
// Localhost
// const orangeAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
// const poolAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function App() {
  // const [showPool, setShowPool] = useState(0)
  const [poolValue, setPoolValue] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const [showToken, setShowToken] = useState(0)
  const [userAccount, setUserAccount] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')

  const [buyAmount, setBuyAmount] = useState('')

  useEffect(() => {
    const init = async () => {
      // getPoolBalance()
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
      const contract = new ethers.Contract(poolAddress, Pool.abi, provider)
      const data = await contract.getBalance()
      // const amount = ethers.utils.formatEther(data)

      console.log('Pool balance: ', data.toString())
      // setShowPool(data.toString())
    }
  }

  async function addToPool() {
    if (!poolValue) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(poolAddress, Pool.abi, signer)
      // const amount = ethers.utils.parseEther(poolValue)
      const transaction = await contract.addBalance(poolValue, {
        value: ethers.utils.parseUnits(poolValue, 'wei'),
      })

      await transaction.wait()
      console.log(`${poolValue} Ethers (in wei) are successfully added.`)
      setPoolValue('')
      // getPoolBalance()
    }
  }

  async function withdrawFromPool() {
    if (!withdrawAmount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(poolAddress, Pool.abi, signer)
      // const amount = ethers.utils.parseEther(withdrawAmount)
      const transaction = await contract.withdraw(withdrawAmount, {
        value: ethers.utils.parseUnits(withdrawAmount, 'wei'),
      })

      await transaction.wait()
      console.log(
        `${withdrawAmount} Ethers (in wei) are successfully withdrawn.`,
      )
      setWithdrawAmount('')
      // getPoolBalance()
    }
  }

  async function buyOrange() {
    if (!buyAmount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(poolAddress, Pool.abi, signer)
      const transaction = await contract.buyOrange(buyAmount)

      await transaction.wait()
      console.log(`${buyAmount} orange(s) are successfully bought.`)
      setBuyAmount('')
      getPoolBalance()
      getTokenBalance()
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

      // console.log('Orange balance: ', balance.toString())
      // setShowToken(balance.toString())
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
      console.log(
        `${tokenAmount} orange(s) are successfully sent to ${userAccount}`,
      )
      setUserAccount('')
      setTokenAmount('')
      getTokenBalance()
    }
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
        }}
      >
        <h2>Welcome to Orange Village!</h2>
        {/* <p>Your Pool ETH Balance: {showPool}</p> */}
        {/* <button onClick={getPoolBalance}>Your Pool Balance</button> */}
        <input
          onChange={(e) => setPoolValue(e.target.value)}
          placeholder="Ethers in wei"
          value={poolValue}
        />
        <button onClick={addToPool}>Deposit</button>
        <br />
        <input
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Ethers in wei"
          value={withdrawAmount}
        />
        <button onClick={withdrawFromPool}>Withdraw</button>
        <br />
        <small>Buy Oranges from Your Pool (1 wei ETH to 1 Orange)</small>
        <br />
        <input
          onChange={(e) => setBuyAmount(e.target.value)}
          placeholder="Ethers in wei"
          value={buyAmount}
        />
        <button onClick={buyOrange}>Buy Oranges</button>
        <p>Your Oranges: {showToken}</p>
        {/* <button onClick={getTokenBalance}>Your Oranges</button> */}
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
