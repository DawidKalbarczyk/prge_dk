import React, {useEffect, useState} from 'react';
import UserCard from "../components/UserCard";

function ListOfItems(props) {
    //https://jsonplaceholder.typicode.com/users
    // UseEffect nasłuchuje jakąś rzecz i w przypadku jej zmiany wywołuje kod
    const [users, setUsers] = useState([]); //Tworzenie hooka, który może przechowywać coś w pamięci

    useEffect(() => {
        fetch('http://localhost:10000/app/get_users')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUsers(res)
            })
        // Pobiera dane ze źródła
    },[])



    return (
        <div>
            ListOfItems
            <div>
                {users.data?.map(user => <UserCard user={user}/>)}
            </div>
        </div>
    );
}

export default ListOfItems;