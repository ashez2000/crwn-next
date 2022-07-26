import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  googleLoginWithPopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../lib/firebase/firebase.lib'
import MainLayout from '../layouts/MainLayout'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const googleLogin = async () => {
    await googleLoginWithPopup()
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
    } catch (err) {
      alert(err.message)
    }

    setDisplayName('')
    setEmail('')
    setPassword('')

    router.push('/')
  }

  return (
    <MainLayout className="max-w-lg mx-auto flex flex-col px-3 mb-3">
      <h3 className="text-3xl text-yellow-500 font-semibold mb-3">Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 px-3 py-2 outline-none rounded-md bg-gray-200"
          type="text"
          placeholder="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          className="w-full mb-3 px-3 py-2 outline-none rounded-md bg-gray-200"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-3 px-3 py-2 outline-none rounded-md bg-gray-200"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full text-center px-3 py-2 rounded-md bg-yellow-200 font-semibold mb-3 cursor-pointer"
          type="submit"
          value="Signup"
        />
        <hr />
        <button
          className="w-full text-center px-3 py-2 rounded-md bg-gray-300 font-semibold mb-3 cursor-pointer"
          type="button"
          onClick={googleLogin}
        >
          Signup With Google
        </button>
      </form>
      <p className="text-center text-gray-500 mt-3">
        Already have an account?{` `}
        <Link href="/login">
          <a className="text-yellow-500">Login</a>
        </Link>
      </p>
    </MainLayout>
  )
}

export default SignUpPage
