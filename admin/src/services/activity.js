export class activity {
    async feedback() {
        try {
            const res = await fetch('http://localhost:8000/admin/userfeedback', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async userfeedback({id}) {
        try {
            const res = await fetch('http://localhost:8000/admin/user/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
            const data = await res.json()
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const useractivity = new activity()