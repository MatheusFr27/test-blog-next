'use client'

import FormRegisterComponent from './_components/formRegister'
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Register() {
    const { data: session } = useSession()

    if (session) {
        redirect('/posts')
    }

    return (
        <section className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <main className="bg-white shadow-md p-2.5 rounded">
                <FormRegisterComponent />
                <div>
                    <span>Já possui uma conta?</span> <Link prefetch={false} className="text-sky-600" href="/auth/login">Acessar conta</Link>
                </div>
            </main>
        </section>
    )
}