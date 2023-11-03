'use client'

import Link from "next/link"
import FormLoginComponent from './_components/formLogin'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Login() {
    const { data: session } = useSession()

    if (session) {
        redirect('/posts')
    }

    return (
        <section className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <main className="bg-white shadow-md p-2.5 rounded">
                <FormLoginComponent />
                <div>
                    <span>Não possuí uma conta?</span> <Link prefetch={false} className="text-sky-600" href="/auth/register">Criar conta</Link>
                </div>
            </main>
        </section>
    )
}