import WhiteBoard from "./components/canvas"

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-6xl text-red-500">Hello</h1>
      <WhiteBoard />
    </main>
  )
}

export default page