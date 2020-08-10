import  {  keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const scale = keyframes`
  50% {
    transform: scale(0.7);
  }
`

export const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`


export const slideDown = keyframes`
	0% {
    transform: translateY(-100%);
    clip-path: polygon(0 0, 100% 0, 100% 7%, 0 6%);
	}
	50%{
    transform: translateY(8%);
    clip-path: polygon(0 0, 100% 0, 100% 7%, 0 6%);

	}
	65%{
    transform: translateY(-4%);
	}
	80%{
    transform: translateY(4%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}
	95%{
		transform: translateY(-2%);
	}			
	100% {
    transform: translateY(0%);    
	}		
`

export const slideRight = keyframes`
	0% {
    transform: translateX(-100%);
	}
	100% {
    transform: translateX(0%);
	}		
`
export const slideLeft = keyframes`
	0% {
    transform: translateX(100%);
	}
	100% {
    transform: translateX(0%);
	}		
`

