import Hero from '@/components/sections/home/Hero'
import Restaurantmenu from '@/components/sections/home/Restaurantmenu'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="restaurant-menu">
        <Restaurantmenu />
      </section>
    </>
  )
}