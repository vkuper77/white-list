import Link from 'next/link'

const NavBar = () => {
    return <div>
    <Link href='/'>
      petition
    </Link>
    <Link href='/cash-machine'>
      cash machine
    </Link>
    <Link href='/connect-wallet'>
      connect wallet
    </Link>
    <Link href='/safe'>
      safe
    </Link>
    <Link href='/description'>
      description
    </Link>
  </div>
}
export default NavBar