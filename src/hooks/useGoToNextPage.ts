'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export const useGoToNextPage = () => {
    const router = useRouter()
    const pathname = usePathname()
    const lang = pathname.split('/')[1] || 'uz'

    const goTo = (path?: string) => {
        router.push(`/${lang}/${path ?? ''}`)
    }

    return goTo
}