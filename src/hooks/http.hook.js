import { useState, useCallback } from "react";

export const useHttp = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        
        setLoading(true)

        try {
            const res = await fetch(url, {method, body, headers})
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            setLoading(false)
            return await res.json()
        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}