"use client"
import toast from 'react-hot-toast';

export default function NewRoutineSubmit(){
    const notify = () => toast('Button clicked');
    return <button onClick={notify}>Submit</button>
}