import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

const useInfiniteScroll = ( action, maxItemsNotReached, itemsLoading) => {

   
    // valor que persiste despues de cada renderizado
    const observer = useRef();

    // cada vez que el elemento es creado la funcion dentro del useCallback va a correr
    const lastElement = useCallback(lastItem => {
       // si los elementos estan cargando que no se ejecute el scroll infinito 
       if (itemsLoading) return;
       // se desconecta la referecia del ultimo elemento anterior para que el proximo ultimo elemento se ponga en lugar correctamente
       observer.current && observer.current.disconnect();
       observer.current = new IntersectionObserver(entries => {
       // si el ultimo elemento es visible en la pagina se ejecuta el dispatch y todavia hay items para traer
       if (entries[0].isIntersecting &&  maxItemsNotReached)
        dispatch(action());
       })
       // si hay un ultimo elemento que el observer lo observe
       if(lastItem) observer.current.observe(lastItem)
        console.log(`veo el ultimo item: ${lastItem}`)
    },[itemsLoading])

    const dispatch = useDispatch(); 




    return { lastElement }
}

export default useInfiniteScroll