import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'

import Card from '../components/card'
import Loading from '../components/loading'
import NoSuggestions from '../components/nosuggestions'

import { AiOutlinePlus } from 'react-icons/ai'

export default function Home() {
  // suggestion handling 
  const [suggestions, setSuggestions] = useState(null)
  const [selected, setSelected] = useState(null)

  // loading states
  const [loading, setLoading] = useState(false)
  const [spinning, setSpinning] = useState(false)

  // submit suggestions
  const [showAddSuggestions, setShowAddSuggestions] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // fetch suggestions from server on load
    setLoading(true)
    fetch("https://1acf44cf-bcc0-4651-92a6-bf355b9cd24c.mock.pstmn.io/suggestions")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // selects a random item from the suggestion list
  async function getRandomSuggestion(e) {
    e.preventDefault()
    setSpinning(true)

    // fake a spinning load time to make it more fun
    await new Promise(r => setTimeout(r, 1000))
    let randomElement = suggestions[Math.floor(Math.random() * suggestions.length)]
    setSelected(randomElement)

    // filter out suggestions that have already been shown
    let newSuggestions = suggestions.filter(item => item.id !== randomElement.id)
    setSuggestions(newSuggestions)

    setSpinning(false)
  }

  // form handling for new suggestions
  async function addSuggestion(e) {
    e.preventDefault()
    setLoading(true)

    let newSuggestion = {
      name: e.target.name.value, 
      address: e.target.address.value,
      url: e.target.url.value
    }

    fetch("https://1acf44cf-bcc0-4651-92a6-bf355b9cd24c.mock.pstmn.io/suggestions", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSuggestion)
    })
      .then((res) => res.json())
      .then((data) => {
        setSuggestions([...suggestions, data])
      })
      .catch(error => {
        console.log(error)
      })
    
    setSelected(null)
    setSubmitted(true)
    setLoading(false)
  }


  return (
    <div>
      <Head>
        <title>Spicing up lunch hour.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center pt-12 pb-20 h-full min-h-screen ">
        <div className="w-full max-w-xl mx-5">
          <div className="mb-5">
            <h1 className="font-bold text-xl mb-1">🍔 &nbsp;It&apos;s lunch time!</h1>
            <p className="text-sm text-gray-500 mb-3">Get a random lunch spot suggestion to keep things spicy.</p>
          </div>

          <div className="border border-gray-200 rounded-xl px-3 sm:px-8 py-5 mb-5">
            { spinning 
              ? <Loading /> : selected
              ? <div>
                  <p className="text-sm text-gray-500 mb-3">Your suggestion is...</p>
                  <Card selected={selected} />
                  <div className="flex justify-center mt-3">
                    <button onClick={getRandomSuggestion} className="border border-primary text-primary hover:bg-indigo-50 text-sm rounded-lg p-3">Spin again</button>
                  </div>
                </div>
              : suggestions?.length === 0 ? <NoSuggestions /> : 
                <div className="flex justify-center py-20">
                  <button onClick={getRandomSuggestion} disabled={loading} className="bg-primary text-white rounded-lg p-3">Let&apos;s get lunch!</button>
                </div>
            }
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <div className="flex justify-center">
                <button onClick={() => setShowAddSuggestions(!showAddSuggestions)} className="w-8 h-8 bg-primary mb-2 rounded-full flex justify-center items-center">
                  <AiOutlinePlus color={"#fff"} />
                </button>
              </div>
              <p className="text-center text-xs text-gray-500">add another</p>
              <p className="text-center text-xs text-gray-500">spot to the list</p>
              
              { showAddSuggestions &&
                <div className="w-full border border-gray-200 rounded-xl px-8 py-5 mt-5">
                  { submitted 
                  ? <div className="py-12">
                      <p className=""> Thanks for adding your lunch spot!</p>
                      <button onClick={() => setSubmitted(false)} className="text-sm text-primary underline hover:text-indigo-400 inline"> Add another </button>
                      <p className="inline text-sm">, or spin again with your new spot in the mix.</p>
                    </div>
                  : <form onSubmit={addSuggestion} className="w-full">
                      <h3 className="font-bold text-lg mb-3">🍽 &nbsp;New suggestion</h3>
                      <input name="name" type="text" className="border border-gray-200 rounded-lg text-sm px-5 py-2 w-full mb-3" placeholder='Restaurant name' />
                      <input name="address" type="text" className="border border-gray-200 rounded-lg text-sm px-5 py-2 w-full mb-3" placeholder='Street address' />
                      <input name="url" type="text" className="border border-gray-200 rounded-lg text-sm px-5 py-2 w-full mb-3" placeholder='Website URL' />

                      <button type="submit" disabled={loading}className="border border-primary text-primary hover:bg-indigo-50 disabled:text-indigo-300 rounded-lg text-sm px-3 py-2">Submit suggestion</button>
                    </form> }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
