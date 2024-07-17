export class auth {
    emailID;
    password;

    async login({ emailID, password }) {
        try {
            const res = await fetch("http://localhost:8000/admin/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailID, password
                })
            })

            const data = await res.json()
            return data

        } catch (e) {
            console.log(e)
        }
    }
}

export const admin = new auth()