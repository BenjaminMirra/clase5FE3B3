import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Book from '../../features/Book/BookCard'
import BookInfo from '../../features/Book/BookInfo'

type Libro = { name: string, id: string, image: string }

interface Props {
    book: Libro
}

const Product: FC<Props> = ({ book }) => {
    const router = useRouter()
    console.log("router " +router);
    
    const handleBought = async () => {
        await fetch(`http://localhost:3000/api/products/${book.id}`, { method: 'DELETE' })
        alert("Thanks for buying!")
        router.push("/products")
    }

    return (
        <BookInfo book={book} handleBought={handleBought} />
    )
}


export const getStaticProps: GetStaticProps =async ({params}) => {
    const res = await fetch(`http://localhost:3000/api/products/${params?.id}`)
    const book = await res.json()
  
    // Pass data to the page via props
    return { props: { book } }

}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const res = await fetch(`http://localhost:3000/api/products/${params?.id}`)
//     //...
// }

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`http://localhost:3000/api/products`)
    const data: Book[] = await res.json()
    const paths = data.map(book => {
        return { params: { id: book.id } }
    })

    return {
        paths,
        fallback: false
    }

}
export default Product