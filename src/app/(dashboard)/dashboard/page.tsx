import Button from '@/components/ui/Button'
import { Inter } from 'next/font/google'
import { FC } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface pageProps {}

export default function Home(props: FC<pageProps>) {
  // function test() {
  //   console.log("how many times");
  //   return { one: "one", two: "two" };
  // }

  // console.log(test().one, test().two);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button className="bg-blue-400" size="lg">
        Hi
      </Button>
    </main>
  )
}
