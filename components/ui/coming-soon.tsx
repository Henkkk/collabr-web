import { Button } from "./button"
import { Input } from "./input"
import { useState } from "react"

export function ComingSoon() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email subscription logic
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-[0.1em]">
          Coming Soon
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 px-4 py-8">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>

        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              Notify Me
            </Button>
          </form>
        </div>

        {/* <div className="pt-8">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">00</div>
              <div className="text-sm text-gray-500">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">00</div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">00</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">00</div>
              <div className="text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
} 