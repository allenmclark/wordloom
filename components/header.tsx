import Link from "next/link"

const Header = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Spanish-English', href: '/spanish-english' },
  ];

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href\
