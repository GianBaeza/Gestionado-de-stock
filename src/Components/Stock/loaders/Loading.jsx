import "../loaders/loading.css"
export default function Loading({ title }) {
    return (
        <div className='loader'>
            {title ? title : ''}
        </div>
    )
}
