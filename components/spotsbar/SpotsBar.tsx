import { fetchFavoritesAction } from '@/utils/actions';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

async function SpotsBar() {
    const spots = await fetchFavoritesAction();
  return (
<Carousel className='h-12  w-[90%] m-auto'>
  <CarouselContent>
    {spots.length > 0 ? (
  spots?.map((s) => 
    <CarouselItem key={s.id}  className="basis-1/4 border rounded p-2 mx-10 min-w-52">
        <div className="flex flex-row gap-5 w-full h-full justify-between px-2">
        <div className="rounded-full text-red-500 h-4 w-4 my-auto bg-red-400">
        </div>
        <p>{s.spot.name}</p>
        <p>12 kt</p>
        <p>2-3 ft</p>
        </div>
        </CarouselItem>
    )) : (
      <CarouselItem key={1}  className="basis-1/4 border rounded p-2 mx-10 min-w-52">
        <p> No Favorites Yet. </p> 
      </CarouselItem>
    )}
  

  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  )
}

export default SpotsBar