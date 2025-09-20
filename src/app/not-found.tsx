import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-4 text-gray-800">
      <h1 className="text-5xl lg:text-8xl">404</h1>
      <h3 className="text-3xl lg:text-4xl">Page not found.</h3>
      <p className="text-sm lg:text-base">Oops! Could not find requested resource.</p>
      <Link href="/" className="text-blue-400 underline text-sm lg:text-base">Return to Home</Link>
    </div>
  )
}