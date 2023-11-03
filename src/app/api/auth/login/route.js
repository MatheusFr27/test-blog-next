import executeQuery from '../../../../lib/db'
import bcrypt from 'bcrypt'

export async function POST(request) {

    try {
        const credentials = await request.json()

        const query = {
            query: 'SELECT name, email, password FROM users WHERE email = ? LIMIT 1;',
            values: [credentials.email]
        }

        const user = await executeQuery(query)

        const passwordValid = await bcrypt.compare(credentials.password, user[0].password)

        if (passwordValid) {
            return Response.json({ user: user[0] });
        }

        return Response.json({ message: 'Usuário Invalido' }, { status: 400 });

    } catch (e) {
        return Response.json({ message: 'Houve um erro ao realizar o login' }, { status: 500 });
    }

}