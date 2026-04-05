// import React, { useRef, useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';


// const Manager = () => {
//     const ref = useRef();
//     const passwordRef = useRef();
//     const [form, setform] = useState({ site: "", username: "", password: "" });
//     const [passwordarray, setpasswordarray] = useState([]);

//     useEffect(() => {
//         let passwords = localStorage.getItem("passwords");
//         if (passwords) {
//             setpasswordarray(JSON.parse(passwords));
//         }
//     }, []);

//     const copyText = (text) => {
//         toast('Copied to ClipBoard', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//         navigator.clipboard.writeText(text)
//     }

//     const showPassword = () => {
//         if (ref.current.src.includes("icon/eyecross.png")) {
//             ref.current.src = "icon/eye.png";
//             passwordRef.current.type = "password";
//         } else {
//             ref.current.src = "icon/eyecross.png";
//             passwordRef.current.type = "text";
//         }
//     };

//     const handleChange = (e) => {
//         setform({ ...form, [e.target.name]: e.target.value });
//     };

//     const savePassword = () => {
//         const newPasswords = [...passwordarray, { ...form, id: uuidv4() }];
//         setpasswordarray(newPasswords);
//         localStorage.setItem("passwords", JSON.stringify(newPasswords));
//         console.log(newPasswords);
//     };

//     const DeletePassword = (id) => {
//         console.log("Deleting password with id ", id)
//         let c = confirm("Do you really want to delete this password?")
//         if (c) {
//             setpasswordarray(passwordarray.filter(item => item.id !== id))
//             localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id !== id)))
//             toast('Password Deleted!', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//         }
//     };

//       const editPassword = (id) => {
//         console.log("Editing password with id ", id)
//         setform(passwordarray.filter(i=>i.id===id)[0]) 
//         setpasswordarray(passwordarray.filter(item=>item.id!==id)) 
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//                 <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
//             </div>

//             <div className="mx-auto mycontainer text-black">
//                 <h1 className="text-4xl font-bold text-center">
//                     <span className="text-green-700">&lt;</span>
//                     Pass
//                     <span className="text-green-700">OP &gt;</span>
//                 </h1>
//                 <p className="text-center text-green-600 text-lg">Your Own Password Manager</p>

//                 <div className="flex flex-col p-4 gap-8 items-center">
//                     <input
//                         value={form.site}
//                         onChange={handleChange}
//                         className="rounded-full border border-green-500 w-full p-4 py-1"
//                         type="text"
//                         name="site"
//                         placeholder="Enter Website Url"
//                     />

//                     <div className="flex flex-col md:flex-row w-full gap-4">
//                         <input
//                             className="rounded-full border border-green-500 w-full p-4 py-1"
//                             type="text"
//                             value={form.username}
//                             onChange={handleChange}
//                             name="username"
//                             placeholder="Enter User Name"
//                         />

//                         <div className="relative w-full">
//                             <input
//                                 autoComplete="new-password"
//                                 ref={passwordRef}
//                                 className="rounded-full border border-green-500 w-full p-4 py-1"
//                                 type="password"
//                                 value={form.password}
//                                 onChange={handleChange}
//                                 name="password"
//                                 placeholder="Enter Password"
//                                 style={{ fontSize: "16px", paddingLeft: "12px" }}
//                             />
//                             <span className="absolute right-[4px] top-[5px] cursor-pointer" onClick={showPassword}>
//                                 <img ref={ref} className="p-1" width={25} src="/icon/eye.png" alt="" />
//                             </span>
//                         </div>
//                     </div>

//                     <button
//                         onClick={savePassword}
//                         className="text-black flex justify-center items-center rounded-full bg-green-400 px-8 py-2 w-fit hover:bg-green-300 border-1 border-green-900"
//                     >
//                         <lord-icon
//                             src="https://cdn.lordicon.com/jgnvfzqg.json"
//                             trigger="hover"
//                             style={{ width: "20px", height: "20px" }}
//                         ></lord-icon>
//                         Save
//                     </button>
//                 </div>

//                 <div className="passwords">
//                     <h2 className="py-4 font-bold text-3xl">Your Passwords</h2>
//                     {passwordarray.length === 0 && <div>No Passwords To Show</div>}

//                     {passwordarray.length !== 0 && (
//                         <table className="table-auto w-full rounded-md overflow-hidden">
//                             <thead className="bg-green-800 text-white">
//                                 <tr>
//                                     <th className="py-2">Site</th>
//                                     <th className="py-2">Username</th>
//                                     <th className="py-2">Password</th>
//                                     <th className="py-2">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='bg-green-100'>
//                                 {passwordarray.map((item, index) => {
//                                     return <tr key={index}>
//                                         <td className='py-2 border border-white text-center'>
//                                             <div className='flex items-center justify-center '>
//                                                 <a href={item.site} target='_blank'>{item.site}</a>
//                                                 <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
//                                                     <lord-icon
//                                                         style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                         src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                         trigger="hover" >
//                                                     </lord-icon>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className='py-2 border border-white text-center'>
//                                             <div className='flex items-center justify-center '>
//                                                 <span>{item.username}</span>
//                                                 <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
//                                                     <lord-icon
//                                                         style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                         src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                         trigger="hover" >
//                                                     </lord-icon>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className='py-2 border border-white text-center'>
//                                             <div className='flex items-center justify-center '>
//                                                 <span>{item.password}</span>
//                                                 <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
//                                                     <lord-icon
//                                                         style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                         src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                         trigger="hover" >
//                                                     </lord-icon>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className='justify-center py-2 border border-white text-center'>
//                                             <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
//                                                 <lord-icon
//                                                     src="https://cdn.lordicon.com/gwlusjdu.json"
//                                                     trigger="hover"
//                                                     style={{ "width": "25px", "height": "25px" }}>
//                                                 </lord-icon>
//                                             </span>

//                                             <span className='cursor-pointer mx-1' onClick={() => { DeletePassword(item.id) }}>
//                                                 <lord-icon
//                                                     src="https://cdn.lordicon.com/skkahier.json"
//                                                     trigger="hover"
//                                                     style={{ "width": "25px", "height": "25px" }}>
//                                                 </lord-icon>
//                                             </span>
//                                         </td>
//                                     </tr>

//                                 })}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Manager;
import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordarray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.info('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    const showPassword = () => {
        if (ref.current.src.includes("icon/eyecross.png")) {
            ref.current.src = "icon/eye.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "icon/eyecross.png";
            passwordRef.current.type = "text";
        }
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };




    const savePassword = () => {
        // Validation check
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
            return; // Exit the function if validation fails
        }

        if (editingId) {
            // Update existing password
            const updatedPasswords = passwordarray.map(item =>
                item.id === editingId ? { ...form, id: editingId } : item
            );
            setpasswordarray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast.success('Password updated successfully');
        } else {
            // Add new password
            const newPasswords = [...passwordarray, { ...form, id: uuidv4() }];
            setpasswordarray(newPasswords);
            localStorage.setItem("passwords", JSON.stringify(newPasswords));
            toast.success('Password saved successfully');
        }

        // Reset form
        setform({ site: "", username: "", password: "" });
        setEditingId(null);
    };
    const editPassword = (id) => {
        const passwordToEdit = passwordarray.find(item => item.id === id);
        if (passwordToEdit) {
            setform(passwordToEdit);
            setEditingId(id);
            // Scroll to form for better UX
            document.getElementById('password-form')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const deletePassword = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {
            const updatedPasswords = passwordarray.filter(item => item.id !== id);
            setpasswordarray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast.error('Password deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
            });

            // If deleting the item being edited, reset form
            if (editingId === id) {
                setform({ site: "", username: "", password: "" });
                setEditingId(null);
            }
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-8 text-black">
                <h1 className="text-4xl font-bold text-center mb-2">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP &gt;</span>
                </h1>
                <p className="text-center text-green-600 text-lg mb-8">Your Secure Password Manager</p>

                <div id="password-form" className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <div className="flex flex-col gap-6">
                        <input
                            value={form.site}
                            onChange={handleChange}
                            className="w-full p-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            type="text"
                            name="site"
                            placeholder="https://example.com"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                className="w-full p-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                name="username"
                                placeholder="Your username"
                            />

                            <div className="relative">
                                <input
                                    ref={passwordRef}
                                    className="w-full p-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    name="password"
                                    placeholder="Create password"
                                />
                                <button
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                    onClick={showPassword}
                                    type="button"
                                >
                                    <img
                                        ref={ref}
                                        width={20}
                                        src="/icon/eye.png"
                                        alt="Toggle password visibility"
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={savePassword}
                            className={`${editingId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
                        >
                            {editingId ? (
                                <>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hbvgknxo.json"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}
                                    ></lord-icon>
                                    Update Password
                                </>
                            ) : (
                                <>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}
                                    ></lord-icon>
                                    Save Password
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="passwords bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Passwords</h2>

                    {passwordarray.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No passwords saved yet. Add your first password above.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left rounded-tl-lg">Website</th>
                                        <th className="py-3 px-4 text-left">Username</th>
                                        <th className="py-3 px-4 text-left">Password</th>
                                        <th className="py-3 px-4 text-left rounded-tr-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordarray.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b border-gray-200 ${editingId === item.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={item.site}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <button
                                                        onClick={() => copyText(item.site)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                        title="Copy URL"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span>{item.username}</span>
                                                    <button
                                                        onClick={() => copyText(item.username)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                        title="Copy username"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span>••••••••</span>
                                                    <button
                                                        onClick={() => copyText(item.password)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                        title="Copy password"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => editPassword(item.id)}
                                                        className={`p-1 rounded-md ${editingId === item.id ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:bg-gray-100'}`}
                                                        title="Edit"
                                                    >
                                                        <lord-icon
                                                            src={editingId === item.id ?
                                                                "https://cdn.lordicon.com/wloilxuq.json" :
                                                                "https://cdn.lordicon.com/gwlusjdu.json"}
                                                            trigger="hover"
                                                            colors={editingId === item.id ? "primary:#2563eb" : ""}
                                                            style={{ width: "24px", height: "24px" }}
                                                        ></lord-icon>
                                                    </button>
                                                    <button
                                                        onClick={() => deletePassword(item.id)}
                                                        className="p-1 rounded-md text-red-600 hover:bg-red-100"
                                                        title="Delete"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "24px", height: "24px" }}
                                                        ></lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;