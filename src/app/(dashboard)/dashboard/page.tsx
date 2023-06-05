import Button from '@/components/ui/Button'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { FC } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface pageProps {}

export default async function Home(props: FC<pageProps>) {
  // function test() {
  //   console.log("how many times");
  //   return { one: "one", two: "two" };
  // }

  // console.log(test().one, test().two);
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 cursor-progress">
      <Button className="bg-blue-400" size="lg">
        Hi
      </Button>
      {JSON.stringify(session)}
    </main>
  )
}
