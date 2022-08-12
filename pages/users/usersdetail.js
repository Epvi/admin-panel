import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { border, fontFamily, fontSize, fontWeight } from "@mui/system";

function Usersdetail(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [pop, setPop] = useState(false);

  function popUp() {
    setPop((pValue) => {
      return !pValue;
    });
  }

  function changeTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }

  function changeBody(e) {
    const body = e.target.value;
    setBody(body);
  }

  function handleClick(e) {
    e.preventDefault();
    const token = router.query.token;
    const name = router.query.name;
    console.log(title);
    console.log(body);
    console.log(token[length - 1]);
    console.log(name);
  }

  const router = useRouter();
  useEffect(() => {
    console.log(router.query.name);
    console.log(router.query.email);
    console.log(router.query.smifis);
    console.log(router.query.subscribed);
  }, [router.query]);
  return (
    <>
      {pop && (
        <>
          <div
            onClick={popUp}
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: "1",
              display: "flex",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: "2",
                marginTop: "30px",
                marginRight: "50px",
                height: "200px",
                border: "none",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                width: "400px",
                borderRadius: "10px",
                backgroundColor: "white",
                Transition: "all 4s ease-out",
                TransitionProperty: "color,background-color",
              }}
            >
              <form>
                <TextField
                  type="text"
                  label="Title"
                  onChange={changeTitle}
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <TextField
                  type="text"
                  onChange={changeBody}
                  label="Body"
                  style={{
                    display: "block",
                    margin: "auto",
                  }}
                />
                <button
                  onClick={handleClick}
                  style={{
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginTop: "5px",
                    marginLeft: "10px",
                    border: "none",
                    boxShadow: "1px 3px 9px 5px rgba(0,0,0.2,0.2)",

                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    backgroundColor: "#556cd6",
                    height: "25px",
                    width: "70px",
                    display: "block",
                    color: "white",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <div style={{display:'flex', alignItems:'center'}} className="shadow">
        
       
        
            <div style={{width:'20%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:"280px",borderRight:"0.1px solid #D3D3D3",boxSizing:"border-box"}}>
            <div
              style={{
                height: "80px",
                borderRadius: "50%",
                width: "80px",
                border: "1px solid grey",       
                padding:"5px",
                boxSizing:"border-box"
              }}
            ></div>
        
            <p
              style={{
              padding:"8px",
            
                fontWeight: "bold",
                fontFamily: "sans-serif",
                fontSize: "15px",
                color:"#454545"
              }}
            >
              
              {router.query.name}

            
            </p>
          </div>
          <div style={{ display: "flex",justifyContent:'space-around',borderBottom:"1px solid #D3D3D3",width:'100%',height:"100px",alignItems:"centers"}}>



          <p style={{ padding: "15px",color:"grey" }}>
          
            Email : <span style={{fontWeight:"800",color:"#454545"}}>{router.query.email}</span>
          </p>
          <p style={{  padding: "15px",color:"grey" }}>
        
            Smifis : <span style={{fontWeight:"800",color:"#454545"}}>{router.query.smifis}</span>
          </p>
          <p style={{ padding: "15px" ,color:"grey"}}>
        
            Subscribed : <span style={{fontWeight:"800",color:"#454545"}}>{router.query.subscribed}</span>
          </p>
          <button
            style={{
              display: "flex",
              cursor: "pointer",
              borderRadius: "4px",
              marginTop: "10px",
              border: "none",
              boxShadow: "1px 3px 9px 5px rgba(0,0,0.2,0.2)",
              alignItems: "center",
              backgroundColor: "#556cd6",
              height: "35px",
              width: "120px",
              display: "block",
              color: "white",
              fontSize: "12px",
              padding:"2px"
        
  
            }}
            onClick={popUp}
          >
            Send notification
          </button>
        </div>
      </div>
    </>
  );
}

const userRole = "admin";
Usersdetail.getLayout = function getLayout(page) {
  return <Layout userRole={userRole}>{page}</Layout>;
};

export default Usersdetail;
