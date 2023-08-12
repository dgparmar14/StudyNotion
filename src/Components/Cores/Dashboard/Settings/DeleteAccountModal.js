import React from 'react'

function DeleteAccountModal({setDeleteAccountModal, deleteAccountModal}) {
  console.log("Printing delete Modal : ", deleteAccountModal);
  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='max-w-[700px] bg-richblack-800 text-richblack-50 border border-richblack-100 rounded-md px-8 py-4'>
          <div>Are you sure ?</div>
          <div>
              <p>Deleting this account may lead to deletion of all your created cpurces of you may deleted from your purchased cources</p>
          </div>
          <div>
            <button onClick={()=>deleteAccountModal.onDeleteHandler()} className='text-richblack-900 text-[14px] px-4 py-1 rounded-md bg-yellow-200'>Delete</button>
            <button onClick={()=>(setDeleteAccountModal(null))} className='text-richblack-25 bg-richblack-700 px-4 py-1 rounded-md text-[14px]'>Cancel</button>
          </div>

        </div>
        
    </div>
  )
}

export default DeleteAccountModal;