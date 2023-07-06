export const userColumns=[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user',headerName: 'User',width: 230,
      renderCell:(params)=>{
          return(
              <div className="cellwithimg">
                <img className="cellimg" src={params.row.img} alt="avatar"/>
                {params.row.username}
              </div>
          )
      }
    },
    { field: 'age', headerName: 'Age', width: 70 },
    { field: 'email', headerName: 'Email', width: 70 },
    { field: 'status', headerName: 'Status', width: 70,
    renderCell:(params)=>{
        return(
            <div className={`cellwithstatus ${params.row.status}`}>
              {params.row.status}
            </div>
        )
    }
 }
];



// temp data 
export const userRows=[
    {
        id:1,
        username:"chirag",
        img:"https://m.media-amazon.com/images/M/MV5BZDk1ZmU0NGYtMzQ2Yi00N2NjLTkyNWEtZWE2NTU4NTJiZGUzXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg",
        email:"chirag@gmail.com",
    },
    {
        id:2,
        username:"chirag2",
        img:"https://m.media-amazon.com/images/M/MV5BZDk1ZmU0NGYtMzQ2Yi00N2NjLTkyNWEtZWE2NTU4NTJiZGUzXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg",
        email:"chirag2@gmail.com",
    },
      
]