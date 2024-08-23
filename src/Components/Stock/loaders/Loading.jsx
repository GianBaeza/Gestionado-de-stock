import 'ldrs/ring'
import { quantum } from 'ldrs'
export default function Loading({ title }) {
    quantum.register()
    return <>
        <l-quantum
            size="45"
            speed="1.75"
            color="black"
        ></l-quantum>

    </>

}


