// 'use client'
// import * as React from 'react'
// import { useState, useEffect } from 'react'
// import { useWalletClient } from "wagmi"
// import { collection, query, where, getDocs } from 'firebase/firestore'
// import { db } from '@/lib/firebase'
// import { OnboardingDialog } from './onboarding-dialog'

// export function OnboardingProvider({ children }: { children: React.ReactNode }) {
//   const [showOnboarding, setShowOnboarding] = useState(false)
//   const { data: wallet } = useWalletClient()

//   useEffect(() => {
//     const checkUserProfile = async () => {
//       if (!wallet?.account?.address) return

//       try {
//         const usersRef = collection(db, "Users")
//         const q = query(usersRef, where("wallet_address", "==", wallet.account.address))
//         const querySnapshot = await getDocs(q)

//         if (querySnapshot.empty) {
//           setShowOnboarding(true)
//         }
//       } catch (error) {
//         console.error('Error checking user profile:', error)
//       }
//     }

//     checkUserProfile()
//   }, [wallet?.account?.address])

//   return (
//     <>
//       {children}
//       <OnboardingDialog 
//         isOpen={showOnboarding} 
//         onClose={() => setShowOnboarding(false)} 
//       />
//     </>
//   )
// } 