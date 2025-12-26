import React from 'react'
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const Logout = () => {

     const [authUser,SetAuthUser] = useAuth();
   
     const handelLogout = () =>
     {
        try{
            SetAuthUser({
                ...authUser,
                user:null
            })
    
            toast.success("Logout Successfully")
            localStorage.removeItem("Users")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        catch(err)
        {
            toast.error(err)
        }
     }

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handelLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Logout