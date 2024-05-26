import React, { useEffect } from "react";
import { useState, useRef } from "react";
import imgpng from "../assets/copyb.png";
import editpng from "../assets/editb.png";
import deletepng from "../assets/deleteb.png";
import { v4 as uuidv4 } from "uuid";

function Main() {
  document.title = "PassWood";

  const [form, setForm] = useState({ site: "", user: "", password: "" });
  // const {refUser,refSite,refPassword} = useRef(null);
  const ref = useRef();
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    console.log("1");
    let passwords = localStorage.getItem("passwordsArray");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
      console.log("local", passwords);
    }
  }, []);
  const savePassword = () => {
    console.log("2");
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwordsArray",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log(["heyyy", ...passwordArray, { ...form, id: uuidv4() }]);
  };
  const handleChange = (e) => {
    console.log("3");
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };
  const deleteAll = () => {
    let conf = confirm("Delete all the Passwords?");
    if(conf){
      
      while(passwordArray.length>0){
        passwordArray.pop();
        console.log("pop")
      }
      setPasswordArray(passwordArray.filter(item => item))
      localStorage.setItem(
        "passwordsArray",
        JSON.stringify([...passwordArray.filter(item => item)])
      );
    }
    
  };
  const deletePassword = (id) => {
    let conf = confirm("Delete selected Password?")
    if(conf){
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwordsArray",JSON.stringify([...passwordArray.filter(item => item.id !== id)]))
    }
  }
  const editPassword = (val) => {
    console.log("editing",val)
    setPasswordArray(passwordArray.splice(0, passwordArray.length))
    
  }
  
  return (
    <>
      <div className="flex flex-col items-center mt-8 align-middle justify-center ">
        {/* <div class="absolute inset-0 -z-10 h-[4000vh] w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}
        <div className="container">
          <div className="roboto-bold text-[35px] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] cursor-pointer">
            PassWood
          </div>
          <p className="roboto-light text-xl hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] cursor-pointer">
            Your own Safe Password Manager
          </p>
        </div>
        <div onKeyDown={(e)=>{if(e.key === "Enter")savePassword()}} className="grid grid-flow-row-dense justify-center items-center mt-[40px] px-[100px] py-[40px] rounded-lg border-[#9d44e7] border-2 w-[500px]">
          <input
            type="url"
            value={form.site}
            name="site"
            onChange={handleChange}
            className="border-2 border-[#9d44e7] px-3 py-1 rounded-[18px]"
            placeholder="Enter Your URL"
          />
          <div className="flex flex-row mt-5 gap-6 ">
            <input
              className="border-2 border-[#9d44e7] px-3 py-1 rounded-[18px]"
              value={form.user}
              name="user"
              onChange={handleChange}
              type="text"
              id=""
              placeholder="User Name"
            />
            <input
              className="border-2 border-[#9d44e7] px-3 py-1 rounded-[18px]"
              value={form.password}
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              id="submit-button"
              className="px-3 py-1 rounded-[18px] bg-[#ce47c3] active:bg-[#8247c4] hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)] text-white text-xl"
              onClick={savePassword}
            >
              Submit
            </button>
          </div>
        </div>
        <div id="savePassword" className="mt-12 w-[800px] bg-white">
          {passwordArray.length === 0 && <div>No password</div>}
          {passwordArray.length != 0 && (
            <table>
              <thead>
                <tr className=" flex bg-[#ce47c3] w-[800px] justify-between py-1 text-white px-6 border-2 mt-12">
                  <td>Site</td>
                  <td>UserName</td>
                  <td>Password</td>
                  <td>Action</td>
                </tr>
              </thead>
              {passwordArray.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className=" flex w-[800px] justify-between px-6 border-2 bg-[#ddd5f1] cursor-pointer">
                      <td className="flex">
                        {item.site}
                        <img
                          onClick={() => {
                            copyText(item.site);
                          }}
                          className="w-5 flex h-5"
                          src={imgpng}
                        ></img>
                      </td>
                      <td className="flex">
                        {item.user}
                        <img
                          onClick={() => {
                            copyText(item.user);
                          }}
                          className="w-5 flex"
                          src={imgpng}
                        ></img>
                      </td>
                      <td className="flex">
                        {item.password}
                        <img
                          onClick={() => {
                            copyText(item.password);
                          }}
                          className="w-5 flex"
                          src={imgpng}
                        ></img>
                      </td>
                      <td className="flex">
                        <img src={editpng} onClick={()=>{editPassword(item.id)}} className="w-5" alt="" />
                        <img src={deletepng} onClick={()=>{deletePassword(item.id)}} className="w-5" />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
        <delete
          className="bg-red-600 text-white p-2 rounded-lg mt-3 cursor-pointer active:bg-red-800 hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)] "
          onClick={() => {
            deleteAll();
          }}
        >
          Delete All
        </delete>
      </div>
    </>
  );
}

export default Main;
