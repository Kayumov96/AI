import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { toast } from 'react-toastify';

export const Card = () => {

   const [mainCard, setmainCard]= useState([]);
   const [card, setCard]= useState([]);
   const [isModal, setIsModal] = useState(false);


   const addCardHandler = (value)=>{
       setCard(prev=>{
           return [...prev, value ]
       });
       toast.success('Product added successfully!')
   };

   const modalHandler = ()=>{
       setIsModal(!isModal)
   };

    useEffect(()=>{
            alanBtn({
                key: '872630b5abe75b0e19757f5358faf6442e956eca572e1d8b807a3e2338fdd0dc/stage',
                onCommand: (commandData) => {
                  if (commandData.command === 'getMenu') {
                    setmainCard(commandData.data)
                  }
                }
            });
    }, []);

 console.log(card)
  return (
    <div className='album py-5 bg-light'> 
         <div className='container'>
           <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
               {mainCard.map((value)=>(
                   <div key={value.id} className='col'>
                       <div className='card shadow-sm p-3' style={{minHeight:'550px'}}>
                           <div className='card-title'>
                               <h4 className='text-muted text-center'>Product # {value.id}</h4>
                           </div>
                        <img src={value.image} alt={value.title} 
                        className='bg-placeholder card-image-top' width='100%' height='400px'/>
                        <div className='card-body'>
                            <p className='card-text'>{value.title.slice(0, 20)}</p>
                            <p className='card-text fw-lighter'>
                                {value.description.slice(0, 100)}
                            </p>
                        </div>
                         <div className='card-footer d-flex justify-content-between align-items-center'>
                             <div>
                                 <span>{value.category}</span>
                             </div>
                             <span className='text-muted'>{value.price}</span>
                         </div>
                          <button className='mt-3 btn btn-outline-primary' onClick={()=>addCardHandler(value)}>Add to Card</button>
                       </div>
                   </div>
               ))}
           </div> 
        </div>
        <div className='fixed-top m-3'>
            <button onClick={modalHandler} type="button" className="btn btn-primary position-relative">
              Card
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    {card.length}
                    <span className="visually-hidden">Card</span>
                </span>
          </button> 
        </div>
        {isModal && (
          <div className="modal" style={{display:'block', background:'0, 0, 0, .8'}}>
           <div className="modal-dialog">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Modal title</h5>
                 <button onClick={modalHandler} type="button" className="btn-close" 
                    data-bs-dismiss="modal" aria-label="Close">
                 </button>
               </div>
               <div className="modal-body">
                  {card.map((item)=>(
                      <div key={item.id} className='card mb-3'>
                          <div className='row g-0'>
                              <div className='col-md-4'>
                                 <img src={item.image} alt={item.title} className='img-fluid rounded-start'/>
                              </div>
                              <div  className='col-md-8'>
                                  <div className='card-body'>
                                    <h5 className='card-title'>{item.title}</h5>
                                    <p className='card-text text-muted'>
                                        {item.description.slice(0, 100)}
                                    </p>
                                    <p className='card-text'>
                                        <small className='text-muted'>${item.price}</small>
                                    </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
               </div>
               <div className="modal-footer">
                 <button onClick={modalHandler} type="button" className="btn btn-primary">Close</button>
               </div>
             </div>
           </div>
          </div>
        )}
    </div>
  )
}
export default Card;