import { useEffect, useRef, useState } from 'react';
import './Shop.css';
import axios from 'axios';
function Item(props){
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id} <br/>
        name: {props.name}<br/>
        price: {props.price}<br/>
        <button onClick={onDelete.bind(this,props.id)}>delete</button>
    </div>);
}
export default function Shop(){
    const name_ref = useRef(null)
    const price_ref = useRef(null)
    const img_ref = useRef(null)
    const [products,setProducts]=useState([]);
    const URL="https://ideal-winner-g4q54jrjg67rfw9jj-3001.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
    }
    ,[]);
    const [cart,setCart] = useState([]);
    function addCart(item){
        setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}])
    }
    function resetCart(){
        setCart([]);
    }
    function addProduct(){
        const data={
            name : name_ref.current.value,
            price : price_ref.current.value,
            img : img_ref.current.value
        }
        axios.post(URL+'/api/addproduct',data)
        .then(response=>{
            setProducts(response.data.products)
        })
        name_ref=null
        price_ref=null
        img_ref=null
    }

    function onDelete(id){
        axios.delete(URL+"/api/product/"+id)
        .then((response) => {
            setProducts(response.data)
        })
    }

    const productsList=products.map(item=><Item {...item} callback={addCart}/>)
    const cartList=cart.map((item,index)=><li>{item.id} {item.name} {item.price}
        <button onClick={()=>{
            console.log(index)
            setCart(cart.filter((i,_index)=>index!=_index))
        }}>delete</button>
    </li>)    
    let total=0;
    for(let i=0;i<cart.length;i++) total+=cart[i].price;    
    return (
        <>
            name : <input type="text" ref={name_ref} /><br />
            price : <input type="text" ref={price_ref}/><br />
            img : <input type="text" ref={img_ref}/><br />
            <button onClick={addProduct}>add</button>

            <div className="grid-container">
                {productsList}
            </div>
            <h1>Cart</h1>
            <ol>{cartList}</ol>
            <button onClick={resetCart}>RESET</button>
            <h1>Total = {total}</h1>
        </>
    );
}