import React from 'react';
import Image from 'next/image';

const API = "http://localhost:3000/api/products/offers"

const Offers = ({ books }: any) => {





  return (
    <main>
      {books?.map((offer: any) => {
        return (
          <div key={offer.id} className="card border-light mb-3" style={{ width: "22rem", margin: "0 2rem" }}>
            <div className="card-body">
              <h3 className="card-title">{offer.name}</h3>
              <Image src={offer.image} alt="book-cover" width={200} height={300} />
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Offers;

export async function getServerSideProps(context: any) {

  const res = await fetch(API);
  const books = await res.json();

  return {
    props: { books },
  }
}
