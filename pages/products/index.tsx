import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import BookCard from '../../features/Book/BookCard'
import styles from "../../styles/Products.module.css"

export type Book = {name: string, id: string, image: string}
export type Books = Book[]

const Products: NextPage = ({data} : any) => {

  return (
    <main>
        {data?.map((libro : any)=>{
          return (
            <div key={libro.id}>
            <BookCard data={libro}/>
            </div>
          )
        })}
        
    </main>

  )
}

//Tienen predefinido styles.booksGrid para los libros 


export default Products;

export async function getServerSideProps(context : any) {

  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return {
    props: { data }, 
  }
}

